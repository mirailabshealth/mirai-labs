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

## Approved-order payment email (2026-10-03)

The manual-payment-email function and 20261003_manual_payment_email.sql add a separate Gmail SMTP sender. The approval trigger queues exactly one manual_payment_instructions job per order. A database scheduler dispatches eligible jobs once per minute; delivery stays paused while commerce_settings.email_ready is false. Other existing notification kinds are not handled by this sender and remain inactive.

Payment recipients: Cash App $mirailabshealth and Venmo business @mirailabshealth, both Mirai Labs. Zelle is omitted until recipient details are provided. All totals come from the approved database order; codes and affiliate commissions are not shown in the email. The email asks the customer to reply with payment method and transaction reference. Owners must still verify the actual deposit and record it in the portal. No payment API or automatic deposit verification is enabled.

Required secret: MIRAI_SMTP_PASSWORD, the Gmail app password for mirai.labs.health@gmail.com. Save through Supabase Edge Function Secrets; never place it in repository files, SQL or chat. Gmail Auth SMTP settings are separate and do not populate Edge Function secrets.

Deploy manual-payment-email with gateway JWT verification off because it authenticates one-use, five-minute job capabilities issued only by the private database scheduler. Every RPC that consumes a capability is service-role-only. The worker cannot accept caller-chosen recipients, order details, totals or payment handles. Generic requests and token replays cannot send mail.

Before enabling customer emails, run an owner-only mirai_test_payment_email() request, inspect its delivery status and the TEST — DO NOT PAY message in the owner Gmail inbox. Set email_ready true only after the test is successful. This does not enable other commerce-worker adapters. Test jobs may run while customer delivery is paused.

Sent means accepted by Gmail's SMTP server; inbox arrival and bounces require checking Gmail. Failed/ambiguous deliveries must be inspected in Gmail Sent before a manual retry. There is no automatic resend after SMTP begins, preventing repeated payment requests on an uncertain network outcome. A customer could cancel/pay immediately after the final pre-send check; the portal remains the authoritative order status.

Inventory is still mandatory for approval; no stock is invented. Public registration remains closed. The template tests run with node supabase/tests/payment_email.mjs. Database capability tests in supabase/tests/manual_payment_email.sql roll back all fixtures and send no emails.


## Order numbers and customer payment reports (2026-10-03)
Orders receive immutable unique MIR-prefixed sequence numbers. Number gaps are normal. Customer and owner order cards and payment emails use the full short number. Customers acknowledge instructions and submit their Cash App/Venmo transaction reference in the client portal. Reports are restricted to the customer's own approved unpaid order and visible to its customer and owners. Submission does not mark an order paid or create a commission. Owners must verify actual deposits independently. Missing-note corrections go to support.
Live migration and rollback tests passed for unique numbers, immutable references, cross-account submission denial, required acknowledgment, duplicate submissions and unchanged payment/commission state.


## Public account registration (2026-10-03)
Registration is open. Email/password signup requires email confirmation (Supabase setting verified ON). After verification, account setup requires full name, phone, U.S. shipping address and laboratory/organization, plus 21+/research-use/policy acknowledgment. Saved shipping details prefill order requests and remain editable before submission. The backend blocks new orders from incomplete profiles and snapshots the contact phone onto each order. Phone is an unverified contact number, not SMS authentication or marketing consent. Owners can still access their owner workspace without a shipping profile; personal orders require completion. Top navigation includes Sign out. Registration does not imply product availability: actual inventory is still required for approval.
Database profile validation tests passed in a rolled-back transaction. No fake customer or stock records were retained.


## Support tickets (October 4, 2026)

Open portal.html?view=support. Both existing owners see the owner support queue; clients and affiliates see only their own tickets. Select a ticket to read and reply. All replies are customer-visible. Status choices are Open, In review and Resolved. A customer reply reopens a resolved ticket; an owner reply moves it to In review.

Owner replies automatically queue a customer email with the ticket number and a sign-in link. The email contains no message body, payment credentials or order details. Check Reply email delivery on the ticket for SMTP acceptance or errors. SMTP acceptance does not guarantee inbox delivery. If delivery is uncertain, check Gmail Sent before any manual follow-up. Status-only updates do not email the customer.

Support never approves/cancels orders, records a payment, changes stock, or creates commission. Use the existing Owner portal controls for those actions. Direct email inquiries remain in Gmail, separate from portal tickets. Attachments are not uploaded in the portal; arrange relevant photos by business email.

Limits: five new tickets and thirty messages per account per hour; messages up to 5,000 characters. Ticket numbers begin SUP-. Database access requires a verified account. New tickets/replies are idempotent for the same request key.

Deployment: supabase/migrations/20261004_support.sql and separate support-email Edge Function. Legacy JWT verification is off because a DB-minted, one-use, five-minute capability authenticates each scheduled delivery. No customer can choose a recipient or invoke delivery RPCs. Existing manual-payment-email is unchanged.
