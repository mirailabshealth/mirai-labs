# Education-only release — October 12, 2026 (UTC)

Public pages now contain educational navigation, the 21+ age acknowledgment, safety notices and no commerce forms, prices, availability, checkout, account registration or affiliate intake. The former portal URL now offers educational navigation and contact help. **Historical database records have not been deleted.** Owners must use authorized Supabase access for historical administration until a separately scoped private administrative interface is approved. No medical intake or telehealth service is enabled.

## Catalog and comparison

`assets/data.js` contains 45 compound/blend identifiers. `research-evidence.js` is the canonical evidence layer and combination assessment. Guide, detail and stack pages load both synchronously. Every identifier has mechanism, study findings, limits, safety and source links. Blend labels are not standardized molecular specifications. Selection is unlimited; notes include component duplication and overlap. Browser storage failures are handled without breaking selection.

The educational follow-up form prepares a `mailto:` message with name, email, selections and notes. **It does not automatically deliver or log a submission.** The visitor reviews and sends through their email provider. There is no new Formspree or Supabase inquiry endpoint. This limitation is stated beside the form and in the Privacy Policy.

## Scientific review scope

Selected source checks on 2026-10-12 used PubMed original-study abstracts and FDA primary regulatory sources. Search terms included compound names and PMIDs, phase 2/3, randomized, negative, safety, and FDA approval/compounding. This is a selective educational update, not an exhaustive systematic review. Existing profile review dates are retained; a template revision is not a claim that all source literature was re-reviewed.

Updated numerical context: retatrutide PMID 37366315, cagrilintide 34798060, tesamorelin 25038357 and elamipretide 37268435. Added the 2026 rat tendon combination abstract (42542926), including its lack of additive benefit and unresolved TB-500 identity. FDA GLP-1 concerns and Forzinity approval were checked. All public summaries distinguish study preparations from other materials. Experimental dose values are not inferred or converted into personal protocols.

Pending deeper appraisal: full text and compound specification in the 2026 tendon study; current CagriSema diabetes findings (PMID 42251859); independent replication and human PK for experimental compounds; systematic searches for GLOW/KLOW combinations; topical versus systemic GHK-Cu evidence; Semax/Selank study bias and translation; exact identity of SNAP-8, Matrixyl, P021 and no-DAC terminology; systematic retraction/correction and funding review across all 45 entries. Do not replace evidence gaps with benefit claims.

## Backend remains closed

The previously applied `supabase/migrations/20261011_education_only.sql` remains authoritative. Its production checks on October 11 US Eastern / October 12 UTC showed five protective triggers, zero checked public/client commerce RPC grants, zero queued payment instruction emails and zero payment-email cron jobs. This release changes no database settings, Edge Functions, credentials or deployment configuration. Do not rerun historical migrations or restore commercial RPC grants.

GitHub Pages deploys static files only. SQL and Edge Functions need separate authorized Supabase deployment; none is introduced by this release.

## Validation and maintenance

Run `node scripts/check-education.cjs` from the repository root (Node.js; no packages needed). It verifies inline JS syntax, local links, 45 unique evidence profiles, sources, unlimited-selection combination notes, age-gate inclusion, Safety navigation and absence of public commercial UI/integrations. DOM integration checks additionally exercised all 45 detail pages, guide search, selection/removal of all entries and form synchronization.

For editorial updates, verify the exact molecule and primary source, record the review date, distinguish abstract from full-text appraisal, retain null findings and uncertainty, then rerun validation. The context page is a dated snapshot, not an automatic news feed. Monitor FDA notices and new publications through a separately configured review process; no recurring automation was installed.

Privacy protections for legacy records remain. Optional analytics scripts are no longer loaded by public pages in this release; previous records and backend retention are unchanged. No secrets or new credentials are included.

## Mirai Health branding — October 22, 2026

Public pages and the age acknowledgment now use Mirai Health. The Learn hub preserves access to the research guide, comparisons, safety and context. Outdated supplier and batch-testing claims were removed from About. Telehealth is described as a future experience; no clinical service, intake or enrollment is enabled. Existing contact email and page URLs remain in use. Scientific review dates are unchanged.

## Public distribution cleanup — October 31, 2026

The October 23 Pages build at `3ec807d70e0cd869579c373818fbc8404b719c38` used the repository root with GitHub's Jekyll 3.10.0 build. Its upload log included the legacy pricing table, vial assets, unused analytics, source ZIPs, SQL, scripts and owner documentation. An unused file can still be distributed by Pages; absence from HTML is not a publication control.

Dependency inspection found that all 16 educational HTML pages use only `assets/age-gate.js`, `assets/data.js` and `research-evidence.js` as local external scripts. None uses the retired files below. The educational pages, scientific evidence, profile identifiers, safety disclosures and navigation are unchanged.

| Assets | Disposition |
| --- | --- |
| `assets/pricing.js`, `assets/vial-sizes.js` | Removed from the current source tree; no educational dependency. Historical versions remain in Git history. |
| `analytics.js`, `vial-art.js`, `vial-art.css`, `vial-front.png` | Removed unused commerce-era frontend assets; previous analytics records remain untouched. |
| Eleven `*-source.zip` archives | Retained byte for byte for historical source reference; excluded from Pages. |
| `supabase/`, `OWNER-WORKFLOW.md` | Retained unchanged for historical administration; excluded from Pages. Do not run old SQL or deployment instructions. |
| `scripts/`, `.github/`, this release record | Retained as maintenance source; excluded from Pages. |

`_config.yml` is JSON-formatted YAML supported by Jekyll. It explicitly excludes the retained nonpublic-delivery source and retired filenames, with no `include` override. Do not add `.nojekyll`, which would bypass these exclusions. These exclusions affect website delivery only: retained files and Git history remain accessible in this public GitHub repository. They are not a confidentiality control. No production records, access controls, credentials, migrations or backend services are changed by this cleanup.

`scripts/public-files.json` lists the 19 approved public source files. The strengthened validator checks every public source file and, with `--site`, every file in a built directory, whether or not HTML references it. Unknown files, archives, SQL, obsolete asset paths, recognizable commercial code/data, broken local references, missing educational pages and symlinks fail. The optional stylesheet generated by the default Pages theme is the only generated-file exception. Approved source files must survive the build byte for byte.

Run from the repository root:

```sh
node scripts/check-education.cjs
node --test scripts/check-education.test.cjs
# After building with actions/jekyll-build-pages:
node scripts/check-education.cjs --site _site
```

The `Education-only publication check` workflow runs the source check, negative regression tests, the same Jekyll action used by Pages, and the complete output check on pull requests and main/cleanup branch pushes. Review its passing result before merging. The existing branch-based Pages publisher remains in use: `_config.yml` enforces its exclusions, while the validation workflow is a separate check, not an automatic deployment gate. Direct pushes to main can trigger Pages independently of that check. Any future replacement publisher must validate its exact output directory before upload, and must never upload the repository root as an unfiltered static artifact.
