# Verified email and reminder operations

## Activation

This change needs an isolated Postgres database before production deployment.
The intended resource is Neon Free (`free_v3`) through the linked Vercel project.
Vercel requires the account owner to accept the marketplace terms first.

1. Provision `iamneilgreene-email`, region `iad1`, built-in auth disabled, production only.
2. Keep secrets in ignored local env files and Vercel sensitive production variables.
   Use `EMAIL_DATABASE_URL` (or the integration's `DATABASE_URL`/`POSTGRES_URL`),
   `EMAIL_TOKEN_SECRET` (at least 32 cryptographically random characters), and `CRON_SECRET`.
3. Run `npm run db:email` to apply `db/001_email_lifecycle.sql` atomically over a single private Postgres connection. It only
   creates the four `ng_email_*` tables and their indexes. Keep the database private.
4. Verify schema, a real opt-in/confirmation/cancellation with the approved test inbox,
   and CRM note updates. Deploy only after configuration and schema checks pass.
5. `vercel.json` invokes the authenticated email job daily at 13:00 UTC. Up to 200 due reminders are processed per run within a four-minute work budget. A due
   reminder is processed on the next run, so the user sees “around 75 days.”

## Consent and privacy

A profile copy remains independent of both optional checkboxes. A reminder or
educational opt-in creates a pending request, never an active subscription.
The private link is a URL fragment, keeping its token out of HTTP URLs and referrers.
Opening the page only inspects. A deliberate POST confirms the choices.
Confirmation expires in 48 hours and repeated confirmations are idempotent.

Management links allow cancellation or unsubscribe without login. A withdrawal
revokes earlier confirmation links so an old email cannot silently re-enable it.
Cancellation also invalidates pending confirmations; joining again requires a new
request and confirmation. Confirmed links do not host or recover profile answers.

Stored data: name, email, verification/consent metadata, due dates, delivery status,
and stable CRM IDs. No assessment scores, answers, or written evidence are stored.
Rate-limit keys are keyed hashes, not raw email or IP strings. Expired rate records
are cleaned daily. Expired unconfirmed requests are removed after seven days;
unverified contacts without remaining requests are then removed after nine days.
Verified records stay until a deletion request or an approved retention policy.

## Delivery and concurrency

Jobs claim reminders atomically with `FOR UPDATE SKIP LOCKED`. Preference changes
and final dispatch serialize on a contact-row lock. A message already accepted by
SMTP cannot be recalled. Confirmation schedules at most one active reminder per
contact; a later confirmed reminder replaces an earlier active reminder.

SMTP does not provide an idempotency key. A timeout or crash can make delivery
ambiguous, so `uncertain` reminders and stale processing claims are held for operator
review. They are never blindly retried. Check Hostinger logs before any manual retry.

CRM preference sync keeps one stable person and one current note per email contact.
A durable quarantine claim is written before network calls. Successful writes update
those IDs and note, including withdrawal. Ambiguous failures remain quarantined to
prevent duplicate people. The email database remains the authority for campaign
eligibility; never send a campaign from stale CRM notes alone.

## Monitoring and recovery

Monitor `email_jobs_backlog`, `email_jobs_unavailable`, `email_reminders_require_delivery_review`, and
`email_preferences_crm_sync_requires_review` in Vercel logs. These logs contain no
email addresses, tokens, answers, or provider response bodies.

Inspect `ng_email_reminders` for `uncertain` or stale `processing` states and
`ng_email_contacts` for `crm_sync_uncertain`. Reconcile against provider records
before retrying. Preserve observed CRM IDs; do not clear quarantine blindly.
Rate limits fail closed if the shared database is unavailable. The site retains
manual profile saving and the direct contact-email fallback.

No newsletter campaign sender is introduced here. A future sender must query current
verified consent, honor unsubscribe, and include a management link in each message.

## Verification

`npm test` runs unit and route tests. Real Postgres integration coverage is enabled
only with `EMAIL_TEST_DATABASE_URL` pointing to `127.0.0.1/ng_email_test`.
The integration test refuses other hosts/databases before clearing test tables.
It covers duplicate confirmations, expiry, revoked links, cancellation, independent
marketing choices, simultaneous job runs, ambiguous SMTP, and concurrent rate limits.
Browser checks cover mobile/desktop confirmation and separate management actions.
All mail is mocked in automated tests. Real setup messages require an approved inbox.

## Preferences surface

`EmailPreferences.tsx` extends the incumbent DESIGN.md in Read/Operate mode:
read the request or current preferences, then take an explicit action. Preserve
the existing ink/bone/cobalt palette, serif heading, restrained top rule, stacked
definition list, shared Button component and wrapping management actions. This
is a utility surface within the established layout, not a new visual system.
Keep pending controls disabled and focus the status/alert receipt after actions.
Verification labels describe the request; management labels describe current
preferences. Keep cancellation and unsubscribe independent, and retain the
explanation that provider-accepted mail cannot be recalled. Follow the user's
no-em-dash rule in all interface and email copy.

The council review records local database tests and mocked browser/mail evidence.
Production activation still requires Neon terms acceptance, provisioning and live
checks; authentic speaking/advisory evidence still requires user input. These
documents do not establish a completed production lifecycle or a 98% result.
