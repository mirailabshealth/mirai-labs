# Mirai Health scientific evidence review monitor

Installed November 2, 2026. This is a selective discovery and triage system for human editors, **not a systematic review, medical recommendation, regulatory monitor or automatic content updater**. A successful run means a search completed and candidates were queued; it does not mean the literature was appraised or that the website is scientifically current.

## Scope and provenance

The initial nine profiles are retatrutide, tirzepatide, semaglutide, cagrilintide, CagriSema, survodutide, mazdutide, tesamorelin and elamipretide/SS-31. These have existing human clinical evidence and clinically consequential population, endpoint, safety or combination questions. This deliberately does not cover all 45 profiles.

`config.json` records the selection, rationale and current cited PMIDs. At runtime, the monitor reuses each selected profile's title/abstract name and alias expression from `../research-review-2026-11-01.json`. It removes that audit's fixed publication-date range and review exclusion, then searches a new date window. CagriSema also matches co-occurring cagrilintide and semaglutide terms. Co-occurrence is only a candidate association, not proof that the combination was tested. Broad aliases and new profiles should be added through reviewed PRs, with a manual backfill for their earlier literature.

Previously recorded citation identities (`publication_metadata` keys), configured reference PMIDs and explicitly documented `additional_reviewed` entries seed deduplication. **The capped audit's `followup_queries.*.ids` are search candidates, not a reviewed-publication list, and are not suppressed wholesale.** The November 1 audit file remains an unchanged historical record. A seeded PMID does not imply a full-text or systematic appraisal.

## Schedule and state

`.github/workflows/evidence-review.yml` runs Mondays at **07:23 UTC** (02:23 US Eastern standard time / 03:23 daylight time), on merged changes to the monitor, and manually through **Actions → PubMed evidence review → Run workflow**. Installation on `main` performs the first live run. Manual runs default to **dry run**. No paid service, LLM service, external Python package or personal access token is needed in Actions; it uses the repository's short-lived `GITHUB_TOKEN` with `contents: read` and `issues: write` only. The checked-out credentials are not persisted. The write job cannot run on a pull request, a fork or a non-main branch. A workflow concurrency group serializes its runs.

Searches use PubMed **Create Date `[crdt]`**, not publication date: an older publication can be newly added to PubMed. Initial coverage begins November 1, 2026. Subsequent runs start 30 days before the last successful scan, bounded by the baseline date. This overlap allows another chance for recent metadata to mature. A closed operational issue, **[Evidence monitor] Successful scan checkpoint**, stores the last complete through-date. After an outage the next run catches up from that checkpoint, including the overlap, rather than only searching the last week.

Every query must return its entire reported result count (up to 2,000 IDs per profile/window). Larger or incomplete searches fail explicitly; there is no silent first-page/capped success. EFetch retrieves records in batches of 100 and requires every requested PMID. Requests are serial, spaced at least 0.4 seconds apart, with bounded retries for transient read failures. `NCBI_EMAIL` is an optional repository variable for a maintained contact; no API key is needed at this volume. Respect NCBI's usage/registration guidance if operating or expanding the service.

The monitor also checks PubMed's linked erratum, retraction and expression-of-concern records for configured references and previously queued publications. This is independent of the date window and can find a notice whose title does not contain the compound. It is limited to links actually supplied by PubMed; not all publisher corrections are linked or indexed promptly.

## What generates a review issue

One issue per **PMID**, with all matching monitored profiles consolidated. Each contains PubMed/DOI links, publication and indexing/history dates, detection/search dates, publication types, relevant original PMIDs for notices, a reason for examination and a reviewer checklist.

| Candidate | Why it is queued | Interpretation guard |
| --- | --- | --- |
| Indexed clinical trial with a human-study signal | Could affect an existing clinical summary | Indexing alone does not establish study quality or applicability. |
| Human abstract with randomization and results language, not yet trial-indexed | Early indexing may omit publication types | Explicitly provisional; may be a false positive. |
| Human observational/case report with a safety term in its title | Could justify examining a safety concern | Does not establish causation, incidence or efficacy. |
| Linked or identified correction, retraction or concern notice | Could alter an existing citation's interpretation | A notice is not new efficacy evidence. |

Reviews, systematic reviews, meta-analyses, protocols, editorials, ordinary comments, preprints, retracted papers as efficacy evidence, animal-only indexed studies, and clearly preclinical titles are excluded from the automatic clinical queue. Human results may be positive, null or negative: the screen does not filter by favorable outcomes. No abstract text is copied into issues or automatically interpreted into a medical claim. No public profile, study finding, review date, approval status or website file is modified by the monitor.

This conservative heuristic misses some observational efficacy findings, safety findings without the selected title terms, studies without the configured names/aliases, delayed metadata beyond the overlap, non-PubMed publications and all unselected profiles. It can still generate false positives, including background mentions and secondary analyses. Perform broader human searches at least quarterly, when expanding scope, and before materially revising claims. Do not interpret zero alerts as proof that no relevant evidence exists.

## Deduplication and human disposition

All repository issues are read through the paginated REST issues endpoint with `state=all`, not search-index results or only open issues. Hidden `mirai-pubmed` and `mirai-profiles` markers are stable identifiers. An open or closed issue suppresses repeat creation for that PMID. A new correction's own PMID can trigger a new issue even if the original was already reviewed. A newly indexed version with a different PMID may still describe the same trial: reviewers must check trial registrations, populations and overlapping analyses.

1. Confirm the molecule, formulation, route, study population and which profiles are actually affected. Separate monotherapy, combination and comparator evidence.
2. Read the original and linked notices. Record whether access was abstract-only or full-text. Evaluate study design, sample size, control, endpoints, estimands, missing data, uncertainty, harms, funding and conflicts; retain null findings.
3. Comment with reviewer, date, decision (**update needed / no change / irrelevant / already reviewed**) and reasoning. If further expertise or full text is needed, leave the issue open and record the blocker.
4. For an update, create a separate content PR, cite the source, change only genuinely appraised review dates, synchronize educational summaries and pass `education-check.yml`. A human must decide whether any claim changes. Close the issue with the PR link or documented no-change decision.
5. Preserve hidden markers and closed issues. Reopen to reconsider the same PMID. Deleting an issue or removing its marker can cause a duplicate. For a paper reviewed outside this queue, add it to `additional_reviewed` in `config.json`, e.g. `"12345678": {"reviewed_on": "YYYY-MM-DD", "reviewer": "name", "decision": "no change", "reason": "..."}`. Add an adopted citation to the profile's `reference_pmids` so its correction links stay watched.

The checkpoint issue is operational and stays closed. Do not use it to record editorial decisions or close it as a substitute for reviewing candidate issues. Deduplication is by PMID rather than DOI/title, which avoids mistakenly merging different notices or records.

## Operations and recovery

Check the latest successful run and open review queue each week. In Actions, enable the repository owner's preferred failed-workflow notifications; this installation does not configure personal notification settings. The run summary lists exact queries, counts, exclusion counts, candidate PMIDs and created issue links. The checkpoint is advanced only after all searches, fetches and issue creations succeed. Dry runs never write issues or state. A successful run with zero candidates still records its checkpoint.

There is a limit of 25 new issues per live run. If exceeded, **nothing is created and the checkpoint stays put**. Preview the run, then use `until` to process smaller chronological windows; a window advances the checkpoint only if it starts at or before the expected start and reaches or passes the saved through-date. A manually chosen later `since` can inspect a subset but cannot skip a gap in saved coverage. Larger volumes should prompt review of query quality before changing the configured limit.

After API, network or permission failures, inspect the failed run, then rerun after the service recovers. GitHub mutations are not automatically retried: a lost response may mean an issue was created. The next run reloads all issue markers before writing, so a partially completed run can resume without recreating successful issues. Do not run live CLI instances concurrently with Actions. Missing/corrupt or multiple checkpoint issues and missing profile markers fail visibly; restore them from issue history rather than guessing a date.

GitHub schedules can be delayed or dropped; they are not guaranteed-time jobs. **Public-repository schedules can be disabled after 60 days without repository activity.** Check workflow status monthly and after an extended pause, re-enable it if necessary, and run a catch-up from the saved checkpoint. Do not add meaningless commits merely to keep it alive. If an outage produces more than the search cap, process smaller date windows manually.

Local commands (Python 3.10+ standard library):

```sh
python3 -m unittest discover -s scripts/evidence-monitor -p 'test_*.py' -v
python3 scripts/evidence-monitor/monitor.py
# Optional read-only backfill and report outside the repository's public output:
python3 scripts/evidence-monitor/monitor.py --since 2026-10-01 --until 2026-11-01 --output /tmp/mirai-review.json
# Writes require explicit --create-issues and an authorized GITHUB_TOKEN.
```

Without a token, local dry runs use public GitHub read access and its lower rate limit. PR CI tests are entirely offline and do not create issues. To stop the system, disable **PubMed evidence review** in Actions; preserve the checkpoint and review issues for later recovery. Scripts and their documentation are excluded from GitHub Pages by the existing publication policy.

## Separate official regulatory review — manual

PubMed does **not** establish current approval, labeling, compounding eligibility or enforcement policy. The schedule above does not monitor or infer regulatory changes. Automated web-page differences and literature keywords are not sufficiently reliable for this implementation, so the designated Mirai Health editorial maintainer should perform this separate check **weekly and before any regulatory claim is published**. Review all relevant profiles, not just the nine automated searches. Obtain qualified regulatory review where the meaning or legal effect is uncertain.

| Official source | What to verify |
| --- | --- |
| [FDA Drugs@FDA](https://www.accessdata.fda.gov/scripts/cder/daf/) and the linked approval letters/current FDA labels | Exact product, ingredient, formulation, route, indication, population and approval action; inspect current labeling rather than relying on a press headline. |
| [FDA Drug Safety Communications](https://www.fda.gov/drugs/drug-safety-and-availability/drug-safety-communications) and [recalls/safety alerts](https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts) | Safety changes, affected products and dates. Official email alerts can help discovery but require manual confirmation. |
| [FDA Human Drug Compounding](https://www.fda.gov/drugs/guidance-compliance-regulatory-information/human-drug-compounding), its linked policies, bulk-substance lists and risk alerts | Current source version, eligibility, exclusions and precise scope; an enforcement policy is not drug approval or demonstrated benefit. |
| [HHS](https://www.hhs.gov/) official policy documents and [Federal Register](https://www.federalregister.gov/agencies/food-and-drug-administration), verified against [GovInfo](https://www.govinfo.gov/app/collection/FR) | Draft versus final status, publication and effective dates, corrections, withdrawals, superseding versions, exact entities/ingredients covered. |

Use the November 1 audit's `primary_regulatory_sources` as historical starting points, then confirm whether they have been amended or superseded. A page being reachable or byte-identical is not proof that its policy is current. Check linked documents and later notices, especially single-ingredient versus blend restrictions. If an official source is unavailable, record **unverified** and retain uncertainty; do not substitute a vendor, social post, press release or clinical publication for the controlling document.

Create a separate **[Regulatory review]** issue when a possible material change is found. Record:

- Issuing agency, official URL, document/docket number, version, publication/effective dates and date accessed.
- Current versus prior wording, draft/final/withdrawn status and any linked superseding document.
- Affected profiles/pages and the precise approval, labeling, safety or compounding claim that may need examination.
- Reviewer, interpretation, unresolved questions and decision; link any separately reviewed content PR.

Keep a dated issue comment or editorial record even for a completed regulatory check with no change, listing the sources actually checked. Never automatically replace a scientific or legal claim based on an alert. This runbook documents a manual responsibility; it does not claim a regulatory check has already been performed or set up a regulatory alert subscription.

## Technical references

- [PubMed guide: Create Date, publication types and indexing limitations](https://pubmed.ncbi.nlm.nih.gov/help/)
- [NCBI E-Utilities quick start](https://eutilities.github.io/site/Quick_Start/eu_quick/) and [usage limits](https://eutilities.github.io/site/API_Key/usageandkey/)
- [GitHub scheduled workflow behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)
- [GitHub issues REST API](https://docs.github.com/en/rest/issues/issues) and [API retry/write guidance](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api)
