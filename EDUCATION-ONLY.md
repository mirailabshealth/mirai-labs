# Education-only operation — October 11, 2026

The public site offers education only. Product checkout, prices, vial imagery,
new affiliate applications and referral promotions have been removed from its
active public experience. Existing account sign-in and support remain available.
Prior order and commission records remain private and are not deleted.

## Production verification

Applied to Supabase on October 11, 2026 (US Eastern; October 12 UTC).
Verified five active protective triggers, zero visitor/client execute grants on
the checked commerce and affiliate RPCs, zero queued payment instruction emails,
and zero payment-email cron jobs. Website inline JavaScript parses; simulated
client, affiliate, profile and support routes render without sales forms.
The public guide and closed affiliate page were checked on the deployed site.

## Deployment

GitHub Pages publishes the HTML and shared navigation changes. It does not deploy
Supabase SQL. Apply `supabase/migrations/20261011_education_only.sql` separately
using an authorized database session. Until that migration is applied, old clients
can still reach the existing backend RPCs; front-end closure alone is insufficient.
The migration blocks new orders, affiliate applications, approvals and activation,
revokes their RPC access, and stops queued payment-instruction emails. It leaves
support, history, reconciliation and paid-order fulfillment available. Review any
email already in `sending`; a message already delivered to SMTP cannot be recalled.
No clinical intake, telehealth integration or new medical service is enabled.

## Validation

Run `node scripts/check-education.cjs`. In a staging database, apply the migration
and check that anonymous public application calls and authenticated request/quote
calls fail; direct inserts into protected tables fail; existing order/commission
reads, support replies, and paid-order shipping continue to work. Inspect function
privileges and triggers after production application. Do not use real customer
orders as test fixtures. SQL application and live checks require Supabase access.

All production database records are preserved. Restore previous website files only
as part of an explicit reopening decision; rolling back HTML cannot undo the DB
closure. Restore RPC grants from their authoritative original migrations if and
when reopening is authorized. Do not blindly rerun the historical migration chain.
