"""Synthetic fixtures test failure modes without network calls or GitHub writes."""
from copy import deepcopy
from datetime import date
import json
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

import monitor as m

TODAY = date(2026, 11, 9)


def article(pmid='900001', **overrides):
    return {'pmid': pmid, 'title': 'A randomized trial of semaglutide',
            'abstract': 'We randomized 120 adult patients. Results: no difference was found.',
            'types': ['Randomized Controlled Trial'], 'mesh': ['Humans'],
            'links': [], 'doi': '10.1234/example', 'journal': 'Synthetic test journal',
            'publication_date': '2026-10', 'electronic_date': '2026-10-20',
            'pubmed_date': '2026-11-02', 'indexed_date': 'Not supplied',
            'revised_date': 'Not supplied', **overrides}


def settings():
    return {'repository': 'mirailabshealth/mirai-labs', 'baseline_date': '2026-11-01',
            'overlap_days': 30, 'max_results_per_query': 2000, 'max_new_issues': 25,
            'profiles': [{'id': p, 'name': p.title(), 'query': f'"{p}"[Title/Abstract]',
                          'reference_pmids': ['100'] if p == 'semaglutide' else []}
                         for p in ['semaglutide', 'cagrilintide']]}


def review_issue(pmid, profiles=None, state='closed'):
    return {'number': 10, 'state': state, 'body': f'<!-- mirai-pubmed:{pmid} -->\n'
            f'<!-- mirai-profiles:{json.dumps(profiles or ["semaglutide"])} -->'}


class FakePubMed:
    def __init__(self, records=None, hits=None):
        self.records = {'100': article('100'), **(records or {})}
        self.hits = hits or {}
        self.queries = []

    def search(self, query, cap):
        self.queries.append(query)
        return self.hits.get('cagrilintide' if 'cagrilintide' in query else 'semaglutide', [])

    def fetch(self, ids):
        return {i: self.records[i] for i in ids}


class FakeGitHub:
    def __init__(self, issues=None):
        self.ledger = deepcopy(issues or [])
        self.created, self.saved = [], []

    def issues(self):
        return deepcopy(self.ledger)

    def create(self, title, body):
        issue = {'number': len(self.ledger) + 11, 'title': title, 'body': body,
                 'html_url': 'https://github.com/example/repo/issues/11'}
        self.ledger.append(issue)
        self.created.append(issue)
        return issue

    def checkpoint(self, issue, body):
        self.saved.append(body)
        if issue:
            next(i for i in self.ledger if i['number'] == issue['number'])['body'] = body
        else:
            self.ledger.append({'number': 99, 'state': 'closed', 'body': body})


class ScreeningTests(unittest.TestCase):
    def test_randomized_human_null_result_is_eligible(self):
        kind, reason = m.classify(article())
        self.assertEqual(kind, 'trial')
        self.assertIn('Verify', reason)

    def test_unindexed_completed_trial_is_provisional(self):
        kind, reason = m.classify(article(types=['Journal Article'], mesh=[]))
        self.assertEqual(kind, 'possible-trial')
        self.assertIn('provisional', reason)

    def test_reviews_protocols_preprints_and_retractions_are_not_efficacy(self):
        for publication_type in m.EXCLUDED_TYPES:
            with self.subTest(publication_type=publication_type):
                self.assertIsNone(m.classify(article(types=[publication_type]))[0])
        self.assertIsNone(m.classify(article(title='Protocol for a randomized human trial'))[0])
        self.assertIsNone(m.classify(article(types=['Journal Article'],
            abstract='Patients will be randomized. Results will follow later.'))[0])

    def test_animal_and_cell_work_excluded_even_with_trial_words(self):
        self.assertIsNone(m.classify(article(mesh=['Animals']))[0])
        self.assertIsNone(m.classify(article(title='Semaglutide in mice', mesh=[]))[0])
        self.assertIsNone(m.classify(article(abstract='', mesh=[]))[0])

    def test_safety_case_is_not_causal_evidence(self):
        kind, reason = m.classify(article(title='Pancreatitis with semaglutide: a case report',
                                         types=['Case Reports']))
        self.assertEqual(kind, 'safety-signal')
        self.assertIn('cannot establish causality', reason)
        self.assertIsNone(m.classify(article(title='Weight change: a case report', types=['Case Reports']))[0])

    def test_cohort_mentioning_randomized_trials_is_not_itself_a_trial(self):
        record = article(title='Exploratory propensity-matched cohort study', types=['Journal Article'],
                         abstract='We studied adult patients. Results were encouraging. Randomized trials are needed.')
        self.assertIsNone(m.classify(record)[0])

    def test_notices_prioritized_even_if_also_comment(self):
        self.assertEqual(m.classify(article(types=['Published Erratum', 'Comment'], mesh=[]))[0], 'notice')
        self.assertEqual(m.classify(article(title='Publisher notice', types=[], mesh=[]), True)[0], 'notice')


class MonitorTests(unittest.TestCase):
    def test_record_terms_reused_and_search_candidates_not_seeded_as_reviewed(self):
        config, baseline = m.load_config()
        historical = json.loads((m.ROOT / config['review_record']).read_text())
        self.assertEqual(len(config['profiles']), 9)
        for p in config['profiles']:
            self.assertIn(historical['followup_queries'][p['id']]['query'].split(' AND (')[0], p['query'])
            self.assertNotIn('[dp]', p['query'])
        candidates = {x for q in historical['followup_queries'].values() for x in q['ids']}
        self.assertTrue(candidates - baseline)
        self.assertTrue(set(historical['publication_metadata']) <= baseline)

    def test_initial_window_and_catchup_with_overlap(self):
        self.assertEqual(m.search_window(settings(), None, TODAY), (date(2026, 11, 1), TODAY, True))
        checkpoint = {'through': date(2026, 12, 15)}
        self.assertEqual(m.search_window(settings(), checkpoint, date(2027, 3, 1)),
                         (date(2026, 11, 15), date(2027, 3, 1), True))
        self.assertFalse(m.search_window(settings(), None, TODAY, '2026-11-05')[2])
        self.assertTrue(m.search_window(settings(), None, TODAY, None, '2026-11-04')[2])
        for since, until in [('2026-11-09', '2026-11-08'), (None, '2026-11-10')]:
            with self.assertRaises(m.MonitorError):
                m.search_window(settings(), None, TODAY, since, until)

    def test_one_issue_per_pmid_all_profiles_and_closed_issue_dedup(self):
        pm = FakePubMed({'900001': article()}, {'semaglutide': ['900001'], 'cagrilintide': ['900001']})
        gh = FakeGitHub()
        report = m.run(settings(), {'100'}, pm, gh, today=TODAY, dry_run=False)
        self.assertEqual(len(gh.created), 1)
        self.assertEqual(report['candidates'][0]['profiles'], ['cagrilintide', 'semaglutide'])
        self.assertIn('900001', gh.created[0]['body'])
        self.assertIn('Publication date', gh.created[0]['body'])
        self.assertIn('Why examine this', gh.created[0]['body'])
        gh.ledger[0]['state'] = 'closed'
        repeat = m.run(settings(), {'100'}, pm, gh, today=TODAY, dry_run=False)
        self.assertEqual(repeat['candidates'], [])
        self.assertEqual(len(gh.created), 1)
        self.assertTrue(all('[crdt]' in q and '[dp]' not in q for q in pm.queries))

    def test_new_correction_to_seeded_paper_even_without_name_search_hit(self):
        original = article('100', links=[{'type': 'ErratumIn', 'pmid': '900002'}])
        notice = article('900002', title='Correction', types=['Published Erratum'], mesh=[], abstract='')
        pm = FakePubMed({'100': original, '900002': notice})
        gh = FakeGitHub()
        result = m.run(settings(), {'100'}, pm, gh, today=TODAY)
        self.assertEqual(result['candidates'][0]['pmid'], '900002')
        self.assertIn('https://pubmed.ncbi.nlm.nih.gov/100/', result['candidates'][0]['body'])
        self.assertEqual(result['candidates'][0]['kind'], 'notice')
        self.assertFalse(gh.created or gh.saved)
        self.assertEqual(m.run(settings(), {'100', '900002'}, pm, gh, today=TODAY)['candidates'], [])

    def test_previously_queued_paper_still_watched_for_retraction(self):
        original = article(links=[{'type': 'RetractionIn', 'pmid': '900003'}])
        pm = FakePubMed({'900001': original, '900003': article('900003', types=['Retraction of Publication'])})
        result = m.run(settings(), {'100'}, pm, FakeGitHub([review_issue('900001')]), today=TODAY)
        self.assertEqual([c['pmid'] for c in result['candidates']], ['900003'])

    def test_dry_run_does_not_write_or_advance(self):
        pm = FakePubMed({'900001': article()}, {'semaglutide': ['900001']})
        gh = FakeGitHub()
        self.assertEqual(len(m.run(settings(), set(), pm, gh, today=TODAY)['candidates']), 1)
        self.assertFalse(gh.created or gh.saved)

    def test_over_cap_fails_before_any_issue_or_checkpoint(self):
        config = settings()
        config['max_new_issues'] = 1
        pm = FakePubMed({'900001': article(), '900002': article('900002')}, {'semaglutide': ['900001', '900002']})
        gh = FakeGitHub()
        with self.assertRaises(m.MonitorError):
            m.run(config, set(), pm, gh, today=TODAY, dry_run=False)
        self.assertFalse(gh.created or gh.saved)
        self.assertTrue(m.run(config, set(), pm, gh, today=TODAY)['issue_cap_exceeded'])

    def test_failed_fetch_or_create_never_advances_checkpoint(self):
        pm = FakePubMed({'900001': article()}, {'semaglutide': ['900001']})
        gh = FakeGitHub()
        with patch.object(pm, 'fetch', side_effect=m.MonitorError('partial response')):
            with self.assertRaises(m.MonitorError):
                m.run(settings(), set(), pm, gh, today=TODAY, dry_run=False)
        self.assertFalse(gh.created or gh.saved)
        with patch.object(gh, 'create', side_effect=m.MonitorError('uncertain POST outcome')):
            with self.assertRaises(m.MonitorError):
                m.run(settings(), set(), pm, gh, today=TODAY, dry_run=False)
        self.assertFalse(gh.saved)

    def test_partial_creation_retry_deduplicates_before_resume(self):
        pm = FakePubMed({'900001': article(), '900002': article('900002')}, {'semaglutide': ['900001', '900002']})
        gh = FakeGitHub()
        create = gh.create
        def uncertain(title, body):
            created = create(title, body)
            if '900002' in body:
                raise m.MonitorError('response lost after issue was created')
            return created
        with patch.object(gh, 'create', side_effect=uncertain):
            with self.assertRaises(m.MonitorError):
                m.run(settings(), set(), pm, gh, today=TODAY, dry_run=False)
        self.assertFalse(gh.saved)
        m.run(settings(), set(), pm, gh, today=TODAY, dry_run=False)
        self.assertEqual(len(gh.created), 2)
        self.assertEqual(len(gh.saved), 1)

    def test_narrow_manual_window_does_not_skip_checkpoint_gap(self):
        gh = FakeGitHub()
        m.run(settings(), set(), FakePubMed(), gh, today=TODAY, since='2026-11-07', dry_run=False)
        self.assertFalse(gh.saved)

    def test_corrupt_or_duplicate_checkpoint_and_missing_marker_stop(self):
        state = {'number': 1, 'body': m.STATE_MARKER + '\n<!-- through:2026-11-01 -->'}
        for issues in [[state, state], [{'body': m.STATE_MARKER}],
                       [{'body': '<!-- mirai-pubmed:123 -->'}]]:
            with self.assertRaises(m.MonitorError):
                m.read_ledger(issues, {'semaglutide'})

    def test_external_text_cannot_insert_hidden_markers_or_mentions(self):
        title, body = m.issue_content(article(title='Bad <!-- mirai-pubmed:77 --> <script> @someone'),
                                     settings()['profiles'][:1], 'trial', 'Verify.', TODAY, TODAY, [])
        self.assertEqual(m.PMID_RE.findall(body), ['900001'])
        self.assertNotIn('<script>', body)
        self.assertNotIn('@someone', body + title)


class APITests(unittest.TestCase):
    def test_complete_search_or_fail_not_silent_truncation(self):
        pm = m.PubMed()
        def payload(count, ids, **extra):
            return json.dumps({'esearchresult': {'count': str(count), 'idlist': ids, **extra}}).encode()
        for response in [payload(3, ['1', '2']), payload(2, ['1', '1']),
                         payload(0, [], errorlist={'phrasesnotfound': ['bad']}),
                         payload(0, [], warninglist={'phrasesignored': ['bad']})]:
            with patch.object(pm, 'get', return_value=response), self.assertRaises(m.MonitorError):
                pm.search('query', 2)
        with patch.object(pm, 'get', return_value=payload(0, [])):
            self.assertEqual(pm.search('query', 2), [])

    def test_efetch_partial_response_fails(self):
        pm = m.PubMed()
        with patch.object(pm, 'get', return_value=b'<PubmedArticleSet/>'), self.assertRaises(m.MonitorError):
            pm.fetch(['100'])

    def test_xml_parses_nested_title_dates_types_and_notice_links(self):
        xml = b'''<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>100</PMID>
        <DateRevised><Year>2026</Year><Month>11</Month><Day>02</Day></DateRevised>
        <Article><ArticleTitle>A <i>human</i> trial</ArticleTitle><Abstract><AbstractText Label="RESULTS">Findings in adults.</AbstractText></Abstract>
        <Journal><Title>Journal</Title><JournalIssue><PubDate><MedlineDate>2026 Fall</MedlineDate></PubDate></JournalIssue></Journal>
        <PublicationTypeList><PublicationType>Randomized Controlled Trial</PublicationType></PublicationTypeList></Article>
        <MeshHeadingList><MeshHeading><DescriptorName>Humans</DescriptorName></MeshHeading></MeshHeadingList>
        <CommentsCorrectionsList><CommentsCorrections RefType="ErratumIn"><PMID>101</PMID></CommentsCorrections></CommentsCorrectionsList>
        </MedlineCitation><PubmedData><History><PubMedPubDate PubStatus="pubmed"><Year>2026</Year><Month>11</Month><Day>1</Day></PubMedPubDate></History>
        <ArticleIdList><ArticleId IdType="doi">10.1/test</ArticleId></ArticleIdList></PubmedData></PubmedArticle></PubmedArticleSet>'''
        record = m.parse_articles(xml)['100']
        self.assertEqual(record['title'], 'A human trial')
        self.assertEqual(record['abstract'], 'RESULTS: Findings in adults.')
        self.assertEqual(record['publication_date'], '2026 Fall')
        self.assertEqual(record['links'], [{'type': 'ErratumIn', 'pmid': '101'}])
        self.assertEqual(record['doi'], '10.1/test')
        self.assertEqual(record['types'], ['Randomized Controlled Trial'])

    def test_issue_ledger_paginates_all_states_and_ignores_prs(self):
        gh = m.GitHub('owner/repo')
        pages = [[{'number': n} for n in range(99)] + [{'pull_request': {}, 'number': 100}],
                 [review_issue('900001')]]
        with patch.object(gh, 'request', side_effect=pages) as request:
            issues = gh.issues()
        self.assertEqual(len(issues), 100)
        self.assertEqual(issues[-1]['state'], 'closed')
        self.assertIn('state=all', request.call_args_list[0].args[0])
        self.assertIn('page=2', request.call_args_list[1].args[0])

    def test_retry_429_but_never_retry_ambiguous_post(self):
        http = m.HTTP()
        error = HTTPError('https://example.test', 429, 'limited', {'Retry-After': '1'}, None)
        with patch.object(m, 'urlopen', side_effect=error) as request, patch.object(m.time, 'sleep'):
            with self.assertRaises(m.MonitorError):
                http.request('https://example.test')
            self.assertEqual(request.call_count, 4)
        error = HTTPError('https://example.test', 503, 'uncertain', {}, None)
        with patch.object(m, 'urlopen', side_effect=error) as request, patch.object(m.time, 'sleep'):
            with self.assertRaises(m.MonitorError):
                http.request('https://example.test', method='POST', body={})
            self.assertEqual(request.call_count, 1)


if __name__ == '__main__':
    unittest.main()
