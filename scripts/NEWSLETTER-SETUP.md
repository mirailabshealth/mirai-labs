# Mirai Health newsletter activation

Status: draft; disabled until provider setup and end-to-end verification. No subscribers have been collected or emails sent by this change.

## Account and provider configuration

1. Owner creates a Brevo account at https://onboarding.brevo.com/ and completes account verification, terms and sender setup. Do not share passwords or private API keys in chat or commit them.
2. Create list `Mirai Health — Email subscribers`. Create a Full page/embedded signup form in Marketing > Forms.
3. Fields: EMAIL required; FIRSTNAME optional; LANGUAGE optional single-choice English/Spanish (no preselected preference). No clinical-interest tags, symptoms, diagnoses, medications, phone number, free-text health questions or patient portal imports.
4. Required unchecked opt-in wording: `I agree to receive educational and marketing emails from Mirai Health. I can unsubscribe at any time.` Link https://mirailabshealth.github.io/mirai-labs/privacy.html#email-updates and include the provider's data-processing disclosure.
5. Headline `Stay curious. Stay informed.` Description `Get clear research explainers, new learning resources, and updates from Mirai Health.` Button `Subscribe by email`. Do not promise a cadence or content language that is not staffed.
6. Enable double confirmation. The first response should ask the visitor to check their inbox, not claim they are already subscribed. Use provider spam protection. Set a real sender/reply-to and a valid business mailing address in email templates. Disable optional open/click tracking for this initial launch. Do not send campaigns yet.
7. Supply the hosted form/iframe URL from Brevo's Share step (HTTPS *.sibforms.com/serve/...). Use that public URL in assets/newsletter-config.js; this integration requires no API key. Keep enabled:false until tested.
8. Verify the form's fields, consent and confirmation settings. In an authorized test mailbox, submit once, confirm delivery, click confirmation, verify list membership and consent evidence, test duplicate submission, unsubscribe and verify suppression. Export a CSV and confirm owner access. Do not mark these tests passed before actually performing them.
9. Review privacy text against actual provider settings. Confirm website uses only a generic form and no sensitive page/referrer/UTM data. Set enabled:true, run tests and publish only after the live integration works.

## Behavior

Popup is limited to homepage and learning library; it waits 20 seconds and skips hidden tabs, other open dialogs (including age verification) and active text inputs. Close/Escape dismisses it for 30 days in browser storage. A footer link provides permanent access. No third-party form is loaded until the popup's subscribe button is clicked or the signup page is visited. The iframe sends no referrer and the fallback link uses noreferrer. Only a dismissal timestamp is stored locally, never email addresses.

No API backend, health-data collection, analytics pixels or automatic marketing campaign is added. Brevo's hosted form is responsible for validating, confirming and storing subscribers and displaying errors. The site does not invent success responses or infer subscription from an iframe load. A disconnected/invalid config produces no popup or footer signup link; the standalone page clearly says signup is unavailable.

## Access to the data

Brevo CRM > Contacts > select list > select contacts > More actions > Export. Include email, first name, language, creation date and subscription status. Retain unsubscribe suppression records; never re-import them as subscribed. Do not commit exports to the public GitHub repository.

Provider references:
- https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo
- https://help.brevo.com/hc/en-us/articles/5310065850642-Export-your-contacts-from-Brevo

Checks completed locally: publication validator and 43 regression tests. Real provider submission, sender verification, confirmation, unsubscribe and CSV export are pending account setup.
