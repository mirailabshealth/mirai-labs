#!/usr/bin/env python3
"""Selective PubMed screening. Queues human review; never edits website evidence."""
import argparse
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta, timezone
import html
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
CONFIG = Path(__file__).with_name('config.json')
STATE_MARKER = '<!-- mirai-evidence-checkpoint:v1 -->'
PMID_RE = re.compile(r'<!-- mirai-pubmed:(\d+) -->')
PROFILE_RE = re.compile(r'<!-- mirai-profiles:(\[[^\n]*\]) -->')
NOTICE_TYPES = {'Published Erratum', 'Retraction of Publication', 'Expression of Concern'}
NOTICE_LINKS = {'ErratumIn', 'RetractionIn', 'ExpressionOfConcernIn'}
TRIAL_TYPES = {'Randomized Controlled Trial', 'Controlled Clinical Trial',
               'Clinical Trial', 'Clinical Trial, Phase I', 'Clinical Trial, Phase II',
               'Clinical Trial, Phase III', 'Clinical Trial, Phase IV', 'Pragmatic Clinical Trial'}
EXCLUDED_TYPES = {'Review', 'Systematic Review', 'Meta-Analysis', 'Editorial', 'Comment',
                  'Clinical Trial Protocol', 'Preprint', 'Retracted Publication'}


class MonitorError(RuntimeError):
    pass


def text_of(node):
    return ' '.join(''.join(node.itertext()).split()) if node is not None else ''


def xml_date(node):
    if node is None:
        return 'Not supplied'
    return node.findtext('MedlineDate') or '-'.join(
        node.findtext(k) for k in ('Year', 'Month', 'Day') if node.findtext(k)) or 'Not supplied'


def parse_articles(xml):
    root = ET.fromstring(xml)
    if root.find('.//ERROR') is not None:
        raise MonitorError('PubMed returned an XML error; scan incomplete.')
    records = {}
    for item in root.findall('PubmedArticle'):
        citation = item.find('MedlineCitation')
        article = citation.find('Article')
        pmid = citation.findtext('PMID')
        if not pmid or not pmid.isdigit() or pmid in records:
            raise MonitorError('Missing or duplicate PMID in EFetch response.')
        history = {d.get('PubStatus'): xml_date(d) for d in item.findall('.//History/PubMedPubDate')}
        records[pmid] = {
            'pmid': pmid, 'title': text_of(article.find('ArticleTitle')),
            'abstract': ' '.join((n.get('Label', '') + ': ' if n.get('Label') else '') + text_of(n)
                                 for n in article.findall('Abstract/AbstractText')),
            'types': [text_of(n) for n in article.findall('PublicationTypeList/PublicationType')],
            'mesh': [text_of(n) for n in citation.findall('MeshHeadingList/MeshHeading/DescriptorName')],
            'journal': text_of(article.find('Journal/Title')),
            'doi': next((text_of(n) for n in item.findall('.//ArticleIdList/ArticleId')
                         if n.get('IdType') == 'doi'), ''),
            'publication_date': xml_date(article.find('Journal/JournalIssue/PubDate')),
            'electronic_date': xml_date(article.find("ArticleDate[@DateType='Electronic']")),
            'pubmed_date': history.get('pubmed', 'Not supplied'),
            'indexed_date': history.get('medline', 'Not supplied'),
            'revised_date': xml_date(citation.find('DateRevised')),
            'links': [{'type': n.get('RefType'), 'pmid': n.findtext('PMID')}
                      for n in citation.findall('CommentsCorrectionsList/CommentsCorrections')
                      if (n.findtext('PMID') or '').isdigit()],
        }
        if not records[pmid]['title']:
            raise MonitorError(f'PubMed record {pmid} has no title.')
    return records


class HTTP:
    """Serial requests; bounded read retries; never blindly retries a mutation."""
    def __init__(self, interval=0.4):
        self.interval, self.last = interval, 0.0

    def request(self, url, *, headers=None, body=None, method='GET'):
        for attempt in range(4):
            time.sleep(max(0, self.interval - (time.monotonic() - self.last)))
            req = Request(url, data=json.dumps(body).encode() if body is not None else None,
                          headers={'User-Agent': 'MiraiEvidenceMonitor/1.0', **(headers or {})},
                          method=method)
            self.last = time.monotonic()
            try:
                with urlopen(req, timeout=45) as response:
                    return response.read()
            except HTTPError as exc:
                # A failed POST may already have created an issue. Stop; the next run
                # reloads the durable PMID ledger before attempting any creation.
                if method != 'GET' or exc.code not in (429, 500, 502, 503, 504) or attempt == 3:
                    raise MonitorError(f'{method} HTTP {exc.code}; scan/checkpoint not completed.') from None
                delay = exc.headers.get('Retry-After', '')
                if delay and not delay.isdigit():
                    raise MonitorError('Rate-limited; retry in a later run.') from None
                wait = max(float(delay or 0), 2 ** (attempt + 1))
                if wait > 60:
                    raise MonitorError('Long rate-limit pause; retry in a later run.') from None
                time.sleep(wait)
            except (URLError, TimeoutError) as exc:
                if method != 'GET' or attempt == 3:
                    raise MonitorError(f'{method} network failure; retry the workflow after checking Actions.') from None
                time.sleep(2 ** (attempt + 1))


class PubMed:
    def __init__(self):
        self.http = HTTP()

    def get(self, endpoint, params):
        params = {'db': 'pubmed', 'tool': 'mirai-evidence-monitor', **params}
        if os.getenv('NCBI_EMAIL'):
            params['email'] = os.environ['NCBI_EMAIL']
        return self.http.request('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
                                 + endpoint + '.fcgi?' + urlencode(params))

    def search(self, query, cap):
        # One complete result set avoids offset drift while PubMed is changing.
        # At most 2,000 IDs/query by default, well below PubMed's 10,000 ceiling.
        result = json.loads(self.get('esearch', {'term': query, 'retmode': 'json', 'retmax': cap}))
        found = result.get('esearchresult', {})
        warnings = found.get('warninglist', {})
        if result.get('error') or found.get('errorlist') or warnings.get('phrasesignored'):
            raise MonitorError('PubMed rejected or changed a search term; inspect the query.')
        count = int(found['count'])
        ids = found['idlist']
        if count > cap or len(ids) != count or len(set(ids)) != count:
            raise MonitorError(f'Incomplete PubMed search ({count} matches, {len(ids)} returned, cap {cap}); '
                               'use smaller date windows. No checkpoint advancement.')
        if any(not x.isdigit() for x in ids):
            raise MonitorError('Invalid PMID in search response.')
        return ids

    def fetch(self, ids):
        ids = sorted(set(ids), key=int)
        records = {}
        for start in range(0, len(ids), 100):
            batch = ids[start:start + 100]
            got = parse_articles(self.get('efetch', {'id': ','.join(batch), 'retmode': 'xml'}))
            if set(got) != set(batch):
                raise MonitorError('EFetch did not return every requested record; scan incomplete.')
            records.update(got)
        return records


class GitHub:
    def __init__(self, repository, token=''):
        if not re.fullmatch(r'[\w.-]+/[\w.-]+', repository):
            raise MonitorError('Invalid repository.')
        self.base = f'https://api.github.com/repos/{repository}/issues'
        self.http = HTTP(interval=1.1)
        self.headers = {'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json'}
        if token:
            self.headers['Authorization'] = f'Bearer {token}'

    def request(self, suffix='', **kwargs):
        return json.loads(self.http.request(self.base + suffix, headers=self.headers, **kwargs))

    def issues(self):
        # No Search API indexing delay, label dependency, or open-only filter.
        result = []
        for page in range(1, 1001):
            batch = self.request(f'?state=all&sort=created&direction=asc&per_page=100&page={page}')
            if not isinstance(batch, list):
                raise MonitorError('Could not load the issue ledger.')
            result.extend(i for i in batch if 'pull_request' not in i)
            if len(batch) < 100:
                return result
        raise MonitorError('Issue ledger pagination limit reached; no writes allowed.')

    def create(self, title, body):
        return self.request(method='POST', body={'title': title, 'body': body})

    def checkpoint(self, issue, body):
        if issue is None:
            issue = self.create('[Evidence monitor] Successful scan checkpoint', body)
        return self.request('/' + str(issue['number']), method='PATCH',
                            body={'body': body, 'state': 'closed'})


def load_config(path=CONFIG):
    config = json.loads(path.read_text())
    record = json.loads((ROOT / config['review_record']).read_text())
    if config['schema_version'] != 1 or not 1 <= config['max_results_per_query'] <= 9999:
        raise MonitorError('Unsupported configuration or search cap.')
    if not 1 <= config['max_new_issues'] <= 100 or not 7 <= config['overlap_days'] <= 180:
        raise MonitorError('Unsafe issue cap or overlap window.')
    ids = [p['id'] for p in config['profiles']]
    if not ids or len(ids) != len(set(ids)):
        raise MonitorError('Missing or duplicate profile identifiers.')
    baseline = set(record['publication_metadata']) | set(config.get('additional_reviewed', {}))
    for profile in config['profiles']:
        source = record['followup_queries'][profile['id']]['query']
        # Reuse the audited name/alias expression; replace the historical date
        # and publication-type restrictions with current, explicit screening.
        parts = source.split(' AND (', 1)
        if len(parts) != 2 or not re.match(r'\d{4}/\d{2}/\d{2}:', parts[1]):
            raise MonitorError('Unexpected audit search format; inspect rather than guessing.')
        profile['query'] = parts[0]
        if profile.get('additional_query'):
            profile['query'] = f"({profile['query']} OR {profile['additional_query']})"
        baseline.update(profile['reference_pmids'])
    return config, baseline


def read_ledger(issues, valid_profiles):
    seen, watched, checkpoint = set(), defaultdict(set), None
    for issue in issues:
        body = issue.get('body') or ''
        if STATE_MARKER in body:
            if checkpoint is not None:
                raise MonitorError('Multiple checkpoint issues; reconcile them before continuing.')
            match = re.search(r'<!-- through:(\d{4}-\d{2}-\d{2}) -->', body)
            if not match:
                raise MonitorError('Checkpoint marker has no valid through date.')
            checkpoint = {**issue, 'through': date.fromisoformat(match[1])}
        pmids = PMID_RE.findall(body)
        if pmids:
            match = PROFILE_RE.search(body)
            if not match:
                raise MonitorError('A PMID review issue lost its profile marker; restore it.')
            profiles = json.loads(match[1])
            if not isinstance(profiles, list) or not set(profiles) <= valid_profiles:
                raise MonitorError('Invalid profile marker in review issue.')
            seen.update(pmids)
            for pmid in pmids:
                watched[pmid].update(profiles)
    return seen, watched, checkpoint


def search_window(config, checkpoint, today, since=None, until=None):
    baseline = date.fromisoformat(config['baseline_date'])
    last = checkpoint['through'] if checkpoint else baseline
    if last > today:
        raise MonitorError('Checkpoint is in the future; inspect it before proceeding.')
    expected = max(baseline, last - timedelta(days=config['overlap_days']))
    start, end = date.fromisoformat(since) if since else expected, date.fromisoformat(until) if until else today
    if start > end or end > today:
        raise MonitorError('Invalid or future search dates.')
    # A narrow manual run must never skip an unscanned gap in the main checkpoint.
    advance = start <= expected and end >= last
    return start, end, advance


def classify(record, linked_notice=False):
    types, mesh = set(record['types']), set(record['mesh'])
    title, abstract = record['title'].lower(), record['abstract'].lower()
    if linked_notice or types & NOTICE_TYPES or re.match(r'^(correction|erratum|retraction|expression of concern)\b', title):
        return ('notice', 'A correction, retraction or concern notice may change interpretation of a cited study. '
                'Check the original and the notice; this is not new efficacy evidence.')
    if types & EXCLUDED_TYPES or re.search(r'\b(protocol|review|meta-analysis)\b', title):
        return None, 'excluded publication type, protocol or review'
    if 'Animals' in mesh and 'Humans' not in mesh:
        return None, 'animal-only indexing'
    human_words = re.search(r'\b(patients?|participants?|adults?|volunteers?|people|women|men|children|adolescents?)\b', abstract)
    human = 'Humans' in mesh or bool(human_words)
    preclinical = re.search(r'\b(mice|murine|rats?|rodents?|in vitro|cell lines?|cell cultures?|zebrafish)\b', title)
    if preclinical and not re.search(r'\b(patients?|participants?|adults?|human)\b', title):
        return None, 'preclinical title without a human study signal'
    if not human:
        return None, 'no explicit human-study signal'
    if types & TRIAL_TYPES:
        return ('trial', 'PubMed labels this a clinical trial and supplies a human-study signal. '
                'Verify design, completed results, population, endpoints, harms and relevance before changing any claim.')
    safety = re.search(r'\b(safety|adverse|pancreatitis|suicid\w*|mortality|hospitali[sz]\w*|optic neuropathy|harm\w*)\b', title)
    observational = types & {'Observational Study', 'Case Reports', 'Comparative Study'} or re.search(
        r'\b(cohort|case[- ]control|pharmacovigilance|case report|case series)\b', title + ' ' + abstract)
    if safety and observational:
        return ('safety-signal', 'A human observational or case report may concern safety. '
                'It cannot establish causality, incidence or treatment benefit; assess confounding and corroboration.')
    if observational:
        return None, 'non-safety observational or case report'
    completed_trial = (re.search(r'\b(randomi[sz]ed|randomly assigned|randomly allocated)\b', abstract)
                       and re.search(r'\b(results?|findings|we found)\b', abstract)
                       and not re.search(r'\b(will be randomi[sz]ed|will be assigned|trial protocol)\b', abstract))
    if completed_trial:
        return ('possible-trial', 'The abstract contains human, randomization and results language, but trial indexing '
                'is absent. This is a provisional match: confirm that it reports completed original clinical research.')
    return None, 'outside the initial clinical-trial / human-safety / notice screen'


def md(value):
    # External titles are data, never instructions, HTML, workflow commands or mentions.
    value = html.escape(' '.join(str(value).split())).replace('@', '&#64;')
    return re.sub(r'([\\`*\[\]_|])', r'\\\1', value)


def issue_content(record, profiles, kind, reason, start, end, related):
    pmid = record['pmid']
    identifiers = sorted(p['id'] for p in profiles)
    title = f"[Evidence review: {kind}] PMID {pmid}: {record['title']}"
    title = ' '.join(title.replace('@', '＠').split())[:240]
    links = ', '.join(f"[{md(p['name'])}](https://mirailabshealth.github.io/mirai-labs/peptide.html?id={quote(p['id'])})" for p in profiles)
    doi = f"[Publisher / DOI](https://doi.org/{quote(record['doi'], safe='/')})" if record['doi'] else 'Not supplied'
    originals = ', '.join(f'[{p}](https://pubmed.ncbi.nlm.nih.gov/{p}/)' for p in sorted(related, key=int)) or 'None identified'
    body = f'''<!-- mirai-pubmed:{pmid} -->
<!-- mirai-profiles:{json.dumps(identifiers)} -->
## Candidate for human review — not an approved website update

**{md(record['title'])}**

- PMID: [{pmid}](https://pubmed.ncbi.nlm.nih.gov/{pmid}/)
- DOI: {doi}
- Journal: {md(record['journal'])}
- Publication date (journal): {md(record['publication_date'])}; electronic: {md(record['electronic_date'])}
- PubMed history date: {md(record['pubmed_date'])}; MEDLINE indexing date: {md(record['indexed_date'])}; record revised: {md(record['revised_date'])}
- Detected: {datetime.now(timezone.utc).date().isoformat()} UTC. Search window: {start} through {end}, PubMed Create Date [crdt]. Linked notices are checked independently of this window.
- Publication types: {md(', '.join(record['types']) or 'Not yet supplied')}
- Potentially affected profiles: {links}
- Related original publications: {originals}

**Why examine this:** {reason}

A keyword match does not establish that a compound was actually tested. A combination or comparator mention does not validate each component alone. PubMed inclusion is not a quality rating, FDA approval, or evidence of clinical benefit. Negative and inconclusive results matter too.

### Reviewer checklist
- [ ] Confirm exact molecule, formulation, route, population and affected profiles.
- [ ] Read the primary source and linked notices; record abstract-only or full-text access.
- [ ] Identify study design, sample size, controls, endpoints, uncertainty, missing data, harms, funding and conflicts. Separate exploratory/subgroup results and overlapping trial populations.
- [ ] Check whether this changes the existing summary, including null findings and limitations. Review official regulatory status separately.
- [ ] Comment with decision (update needed / no change / irrelevant / already reviewed), reviewer, date and reasoning. If needed, link a separately reviewed content PR and run education checks before closing.

Keep the hidden PMID/profile markers when editing. Closed issues remain in the deduplication ledger. Reopen this issue to revisit the same publication; do not delete it.
'''
    return title, body


def run(config, baseline, pubmed, github, *, today, since=None, until=None, dry_run=True):
    profiles = {p['id']: p for p in config['profiles']}
    seen, watched, checkpoint = read_ledger(github.issues(), set(profiles))
    start, end, advance = search_window(config, checkpoint, today, since, until)
    for profile in profiles.values():
        for pmid in profile['reference_pmids']:
            watched[pmid].add(profile['id'])
    matched, searches = defaultdict(set), []
    for profile in profiles.values():
        query = f"({profile['query']}) AND ({start:%Y/%m/%d}:{end:%Y/%m/%d}[crdt])"
        ids = pubmed.search(query, config['max_results_per_query'])
        searches.append({'profile': profile['id'], 'query': query, 'count': len(ids)})
        for pmid in ids:
            matched[pmid].add(profile['id'])
    # Read existing citations too: a new linked notice may not mention a compound.
    records = pubmed.fetch(set(matched) | set(watched))
    related = defaultdict(set)
    for original, record in list(records.items()):
        for link in record['links']:
            if link['type'] in NOTICE_LINKS:
                notice = link['pmid']
                matched[notice].update(matched[original] | watched[original])
                related[notice].add(original)
    records.update(pubmed.fetch(set(matched) - set(records)))
    candidates, skipped = [], Counter()
    for pmid in sorted(matched, key=int):
        if not matched[pmid]:
            continue
        if pmid in baseline or pmid in seen:
            skipped['already recorded or queued'] += 1
            continue
        record = records[pmid]
        kind, reason = classify(record, bool(related[pmid]))
        if not kind:
            skipped[reason] += 1
            continue
        title, body = issue_content(record, [profiles[p] for p in sorted(matched[pmid])],
                                    kind, reason, start, end, related[pmid])
        candidates.append({'pmid': pmid, 'profiles': sorted(matched[pmid]), 'kind': kind,
                           'title': title, 'body': body})
    report = {'dry_run': dry_run, 'from': str(start), 'through': str(end), 'searches': searches,
              'records_fetched': len(records), 'skipped': dict(skipped), 'candidates': candidates,
              'checkpoint_eligible': advance, 'created': []}
    if len(candidates) > config['max_new_issues']:
        # A dry run still returns all candidates for a useful, reviewable preview.
        if not dry_run:
            raise MonitorError(f"{len(candidates)} candidates exceed the {config['max_new_issues']} issue cap. "
                               'Nothing written. Dry-run and catch up in smaller date windows.')
        report['issue_cap_exceeded'] = True
    if dry_run:
        return report
    for candidate in candidates:
        issue = github.create(candidate['title'], candidate['body'])
        report['created'].append({'pmid': candidate['pmid'], 'url': issue['html_url']})
    if advance:
        body = f'''{STATE_MARKER}
<!-- through:{end} -->
Last complete PubMed scan: **{end} UTC**. Window: {start} through {end}.

This closed operational issue is the durable scan checkpoint, not a scientific review or an approval of claims. Do not delete it or edit the hidden markers. All matching records were retrieved and screened; {len(candidates)} new review issue(s) were created. Unflagged results are not necessarily irrelevant or safe.

The next run overlaps {config['overlap_days']} days and catches up from this date after an outage. Failed or dry runs do not advance it. Review the Actions run summary for queries and exclusions. Check that the weekly workflow is active, and perform the separate official regulatory review described in [the runbook](https://github.com/{config['repository']}/blob/main/scripts/evidence-monitor/README.md).
'''
        github.checkpoint(checkpoint, body)
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--create-issues', action='store_true', help='Explicitly enable GitHub writes (default: dry run).')
    parser.add_argument('--since', default=os.getenv('MONITOR_SINCE') or None)
    parser.add_argument('--until', default=os.getenv('MONITOR_UNTIL') or None)
    parser.add_argument('--output', help='Optional JSON report path, outside the published site.')
    args = parser.parse_args()
    try:
        config, baseline = load_config()
        token = os.getenv('GITHUB_TOKEN', '')
        if args.create_issues:
            if not token:
                raise MonitorError('A GitHub token is required for writes.')
            if os.getenv('GITHUB_ACTIONS') == 'true' and (
                    os.getenv('GITHUB_REPOSITORY') != config['repository'] or
                    os.getenv('GITHUB_REF') != 'refs/heads/main' or
                    os.getenv('GITHUB_EVENT_NAME') not in ('schedule', 'workflow_dispatch', 'push')):
                raise MonitorError('Writes are restricted to the intended repository on main, never PRs or forks.')
        report = run(config, baseline, PubMed(), GitHub(config['repository'], token),
                     today=datetime.now(timezone.utc).date(), since=args.since, until=args.until,
                     dry_run=not args.create_issues)
        if args.output:
            Path(args.output).write_text(json.dumps(report, indent=2) + '\n')
        summary = (f"PubMed review monitor: {'DRY RUN' if report['dry_run'] else 'LIVE'}\n"
                   f"Window {report['from']} through {report['through']} (Create Date).\n"
                   f"{report['records_fetched']} records fetched; {len(report['candidates'])} new candidates; "
                   f"{len(report['created'])} issues created.\n"
                   f"Exclusions: {json.dumps(report['skipped'], sort_keys=True)}\n"
                   f"Checkpoint eligible: {report['checkpoint_eligible']}. "
                   "No scientific claims or review dates were changed.\n")
        print(summary)
        if os.getenv('GITHUB_STEP_SUMMARY'):
            with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as f:
                f.write('## PubMed screening\n\n' + summary + '\n')
                for search in report['searches']:
                    f.write(f"- {search['profile']}: {search['count']} matches. Query: `{search['query']}`\n")
                for c in report['candidates']:
                    f.write(f"- Candidate PMID [{c['pmid']}](https://pubmed.ncbi.nlm.nih.gov/{c['pmid']}/): "
                            f"{c['kind']}; {', '.join(c['profiles'])}\n")
                for created in report['created']:
                    f.write(f"- Created [{created['pmid']}]({created['url']})\n")
                if report.get('issue_cap_exceeded'):
                    f.write('\n**Issue cap exceeded: a live run would stop before writing. Use smaller windows.**\n')
    except (MonitorError, ValueError, KeyError, ET.ParseError) as exc:
        print(f'Evidence monitor stopped: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
