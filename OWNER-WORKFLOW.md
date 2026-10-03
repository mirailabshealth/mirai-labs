# Owner inventory and manual order workflow

Open portal.html, sign in with the existing owner account, and select Owner.

1. Add actual stock under Inventory by batch. Record compound, vial size, lot, vial count, optional COA and expiry. Restocks/corrections use Adjust with a reason.
2. Review portal requests. Confirm shipping and tax, then Approve & reserve stock. Approval is all-or-nothing and excludes expired batches. Manual reservations remain held until payment or owner cancellation.
3. Contact the customer separately with the approved total and business payment instructions. No payment provider or order-email service is connected. Do not tell the customer an automated email has been sent.
4. Verify the deposit in the actual payment account. Enter method, transaction reference, and exact amount under Confirm received payment. A receipt screenshot alone is insufficient. The backend checks owner authorization, order approval, exact total and duplicate transaction references. This records a payment; it does not charge a customer.
5. Enter carrier tracking and mark shipped. Stock is removed from physical on-hand quantities when shipped; reservations keep paid stock unavailable beforehand.
6. Decline/cancel only unpaid requests to release held stock. Refunds, payment corrections and affiliate payout reconciliation require support until dedicated owner controls are added. Do not edit database rows directly to bypass accounting safeguards.

Affiliate commissions are based on the stored discounted product subtotal, excluding shipping/tax, at the rate snapshotted when the request was made. Recording the same payment twice does not create a second commission. Commissions remain pending under the configured 30-day hold. Automated release scheduling and affiliate payouts are not enabled in this release.

Public Formspree inquiries are separate from authenticated portal orders. Public registration remains closed. No live stock counts have been invented or seeded.

## Deployment

The migration supabase/migrations/20261002_inventory_workflow.sql is applied once after the existing portal foundation/access/catalog migrations. Tests in supabase/tests/inventory_workflow.sql are run with the new schema inside a transaction and rolled back.

The repository root inventory-workflow-source.zip preserves this release's migration, tests, and these instructions. Extract it into the repository root when moving to CLI-based development. The optional Stripe/email adapter files in the working checkout were not activated or included in this manual-only release.

Payment method labels are internal bookkeeping categories, not a claim that any named payment service approves this business. Public payment handles have not been configured.
