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
