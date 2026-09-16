# Email lifecycle council review

September 15, 2026. Chris Do leads this simulated council, with Chris Do/Marty Neumeier/typography, Donald Miller/April Dunford/Joanna Wiebe, and Vanessa Van Edwards/Steve Krug/accessibility perspectives. These are analytical simulations, not participation or endorsements. `REVIEW_CHARTER.md` supplies the fixed scope.

**Production acceptance: 96.3/100. The 98% target is not met.** Preserve the design. The new lifecycle is locally tested, but production activation remains blocked on the account owner's Neon marketplace terms acceptance, database provisioning, configuration and production checks.

## Evidence boundary

- **Production:** root reports commit `9393db6` serves the HTML profile email approved by the user. Confirmed receipt closes the former profile-copy delivery gap. Earlier production HTTPS and CRM persistence evidence remains recorded in `REVIEW_RESULTS.md`; this review did not rerun those journeys. Email approval does not establish cross-client compatibility or reminder delivery.
- **Branch `feat/verified-email-reminders`:** reviewed profile form, preference UI, privacy copy, reminder template, lifecycle/job logic, stable CRM sync and `docs/email-operations.md`. `/tmp/email-tests.log` records 30 passing tests, none skipped; root reports lint/build passing. Isolated real Postgres integration exercises state, expiry, concurrency, ambiguous SMTP and durable limits; mail is mocked. Browser HTTP mocks exercise the interface separately. These are complementary tests, not one real browser-to-database-to-inbox journey.
- **Visual finish:** inspected refreshed 320px/390px/1100px confirmation and 320px cancelled-state captures against incumbent `DESIGN.md`. No clipping or material hierarchy defect is visible. Corrected request wording and the wrapped stop-all button were visually confirmed; no horizontal overflow is visible. Actual screen-reader use and actual inbox appearance of new verification/reminder emails were not tested here.
- **Authentic proof:** root's search found no suitable speaking/advisory artifact. A promotional video using a retired brand is not delivery evidence. User asset input remains pending.

## Production scorecard

Scores retain previous accepted evidence and deductions except H10, where confirmed profile-email receipt earns six points. Undeployed branch work earns no production points. Each heuristic is equally weighted; deductions are acceptance judgments, not measured user outcomes.

| Heuristic | /100 | Evidence and remaining deduction from 100 |
|---|---:|---|
| System status | 98 | Recorded progress, focus and truthful success/failure states. −2: actual screen-reader announcements untested. |
| Real-world match | 91 | Self-report caveats, preserved ties and distinct demand/capability. −9: authentic speaking/advisory delivery proof absent. |
| User control | 98 | Recorded back/reload/restart, sharing and saving checks. −2: actual calendar-client behavior untested. New withdrawal controls remain local. |
| Consistency | 98 | Established visual system and mobile/desktop/print evidence. −2: assistive-technology coverage incomplete. |
| Error prevention | 96 | Validation, explicit consent, guarded submission and deployed successful persistence. −4: live partial-save/retry and shared abuse controls unverified; the branch addresses these locally. |
| Recognition | 99 | Persistent prompts, labels, selections and explanations. −1: minor repeated framework language. |
| Efficiency | 96 | Direct commercial/Profile routes and readable saved profile. −2: actual calendar import; −2: Ideas remains a topic directory. |
| Aesthetic restraint | 97 | Coherent hierarchy and removal of placeholder event proof. −3: explanatory repetition and uniform commercial treatments. |
| Error recovery | 96 | Recorded request/storage/clipboard failure recovery. −4: production partial upstream failure recovery not established. Local quarantine is implementation evidence only. |
| Help and explanation | 94 | Accurate self-report guidance and user-confirmed profile-copy delivery. −4: automated reminder delivery not activated/received; −2: production verification and withdrawal lifecycle unverified. |

**Total 963; 963 ÷ 10 = 96.3/100.** This is not conversion lift or an accessibility certification. A mean cannot override a blocking journey.

## Council synthesis and finish review

**Brand/design:** Chris Do and Marty Neumeier lenses favor retaining the calm ink/bone/cobalt identity. The preference surface uses its serif heading, restrained rules and clear confirmation action appropriately for a utility task. Typography reads clearly in supplied captures. Another broad visual pass offers little value.

**Messaging/conversion:** Miller and Wiebe lenses support separate profile-copy, reminder and educational choices, deliberate confirmation, and “around 75 days.” Dunford's buyer-proof objection remains: clear service language does not demonstrate past delivery. No conversion improvement is claimed.

**Trust/usability:** Van Edwards and Krug lenses favor inspection without activation, separate cancellation/unsubscribe and visible outcome receipts. Disclosure that accepted SMTP mail cannot be recalled is useful. Status/alert roles and focus after actions are source affordances, not substitutes for actual assistive-technology testing.

**Impeccable finish: ship within local/browser scope; hold production activation.** Source fixes and the final mobile/desktop captures are verified. This review found that a reminder-only verification request could say “Not subscribed” even when existing educational consent remained active. Root changed the verification labels to describe the request, with current subscription assertions reserved for management, and renamed the confirmation heading “Confirmed request.” Source confirms those fixes. The long stop-all button wraps cleanly at 320px. No material UI finding remains in this bounded pass. Root reports detector output `[]` in `/tmp/email-lifecycle-detect.json`. This is a bounded finish review, not a new full Impeccable critique run. Questions skipped: root already has asset and activation inputs pending.

## Red-team findings and remaining gates

1. **Resolved locally:** withdrawal previously risked duplicate CRM people. Stable person/note IDs, PATCH of the existing note and durable uncertainty quarantine address that path; root's independent review confirms resolution. Ambiguous upstream creation still requires reconciliation. Never clear quarantine blindly or send campaigns from stale CRM notes.
2. **Blocking activation:** accept Neon terms, provision the isolated production database, apply the scoped schema and verify secrets/cron configuration. New promises must not deploy before their dependencies exist.
3. **Production evidence required:** use the authorized inbox for copy plus opt-in; deliberately confirm; read back reminder/consent and stable CRM IDs; cancel reminder and unsubscribe independently; verify an old confirmation cannot restore withdrawn consent. Exercise a controlled due reminder and verify receipt, one-send behavior and cron authentication. Separate provider receipt from mocks.
4. **Other acceptance evidence:** approved authentic speaking/work artifact with defensible role/context; actual calendar-client import; actual screen-reader assessment and preference flow; intended inbox-client inspection of new email. Re-score only deductions those results close.
5. **Operational limits:** SMTP uncertainty is intentionally held for review. No newsletter sender is introduced; future campaigns must query current verified consent. Verified-record retention still needs an approved policy or deletion handling as documented.

Local implementation reduces outstanding engineering work. It does not close the production reminder journey, supply authentic proof or justify 98% today.
