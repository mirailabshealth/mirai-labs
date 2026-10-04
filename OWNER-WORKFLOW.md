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

## Owner order alerts — 2026-10-04

Stack Builder now saves its selection and opens the account order review. It no longer submits a separate Formspree inquiry. Customers must sign in, complete their shipping profile, review the server-calculated total and submit the request. The existing `mirai_request_v2` creates the order and queues one `owner_request` job in the same transaction. No payment is collected by this action.

The owner dispatcher checks the queue every minute and sends alerts to **mirai.labs.health@gmail.com** through the existing Gmail sender. Each email includes the order number and an owner portal link. Sign-in is required to review or approve. The sender skips orders no longer awaiting approval and uses private expiring, one-use delivery capabilities. The fixed recipient cannot be supplied by a client. Support reply notifications continue using the same function's original route.

Owner portal → Automation activity displays owner_request delivery state. `sent` means Gmail SMTP accepted the message, not confirmed inbox delivery. Failed or stale sending jobs require review; inspect Gmail Sent before retrying an uncertain delivery. Other legacy job kinds are not activated by this change. Keep Gmail notifications enabled on the owner's phone and check Spam when testing a new sender.

Deployment source: `supabase/migrations/20261004_owner_order_alerts.sql`, `supabase/functions/support-email/index.ts`. Regression checks: `supabase/tests/owner_order_alerts.sql` runs in a rolled-back transaction and uses the real Reta 20 mg request path, including request deduplication, token checks and cancellation handling. It does not leave test orders or send emails.

Approval still reserves actual recorded stock. Existing customer payment-instructions emails and manual Cash App/Venmo verification remain unchanged. The previous Stack Builder inquiry is not automatically converted into an order.

## Standard shipping — October 3, 2026 (New York)

Standard shipping is $15 per order, free at a product subtotal of $250 or more **after quantity and partner discounts, before tax**. U.S. delivery includes Puerto Rico. The account address form supports PR as the state/territory and urbanization in address line 2. The server also normalizes country PR to country US, region PR.

`mirai_shipping_quote` obtains the existing authenticated product quote and adds shipping without changing its product total or affiliate commission basis. New `mirai_request_v2` requests store shipping against that server-calculated product subtotal. Owner approval enforces the same rate and retains the existing inventory reservation and payment-email workflow. Already approved/paid orders are not rewritten. Pending legacy requests receive the standard shipping rate at approval.

Tax remains a required owner-reviewed amount before approval, with no automatic default to zero. Pending customer totals explicitly exclude unconfirmed tax. Tax registration and applicable product/destination treatment must be resolved separately; this change does not configure automatic tax collection.

Regression: `supabase/tests/standard_shipping.sql` verifies $249.99/$250/$250.01, post-discount thresholds, Puerto Rico requests, null pending tax, rejection of shipping overrides, stock approval and the payment email's stored shipping amount. It rolls back all fixtures and sends no email.


## Automatic affiliate commission tiers

Lifetime qualifying product revenue after discounts and refunds determines the rate: 5% initially, 8% at $2,500, 12% at $10,000, 15% at $25,000, and 20% at $50,000. Only paid/shipped orders with a verified payment and a non-reversed commission entry count. Shipping, tax, self-purchases, and orders under payment review are excluded. Refunds or holds can reduce the current tier.

The server refreshes the rate when payments, refunds, payment review, and commission records change. New requests snapshot the earned rate. Existing requests and commissions retain their recorded percentage. Approving an affiliate activates their code; it does not select a manual rate. The affiliate portal shows lifetime progress, and the owner portal shows each affiliate’s current tier. This does not automate payouts or change order/payment approval.

Migration and rollback-only database tests are in affiliate-tiers-source.zip.
