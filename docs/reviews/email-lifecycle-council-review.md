# Email lifecycle council review

September 16, 2026. Chris Do leads this simulated council, with Chris Do/Marty Neumeier/typography, Donald Miller/April Dunford/Joanna Wiebe, and Vanessa Van Edwards/Steve Krug/accessibility perspectives. These are analytical simulations, not participation or endorsements. `REVIEW_CHARTER.md` supplies the fixed scope.

**Production acceptance: 97.0/100 (97.0%). The 98% target is not met.** Preserve the design. The email lifecycle is activated on Supabase and production deployment `60649fa` is Ready. Live application, database, CRM and SMTP-acceptance evidence closes the former activation gate. Inbox receipt and rendering of the new confirmation/reminder messages remain unverified.

## Evidence boundary

- **Production, reported by the main agent:** deployment `60649fa` is Ready. All four Supabase tables have RLS enabled and deny anonymous/authenticated read access; TLS verification succeeds with the dashboard CA. The live profile API returned 201 with SMTP acceptance. A locally created pending request was emailed through real SMTP, inspected through production without activation, then explicitly confirmed twice with idempotent results. Production cron synchronized one contact with three stable CRM IDs. A controlled test reminder, with only the test contact's due date advanced, was accepted once; the next run accepted zero. Cancellation preserved educational consent, unsubscribe cleared it, revoked links returned 410, and subsequent CRM sync retained the same IDs while recording withdrawal. No uncertain delivery or due backlog remained. Vercel reports the daily 13:00 UTC cron active; unauthorized invocation returned 401. These checks span real services, but do not establish a single browser-to-inbox journey or inbox receipt. The previously user-approved HTML profile email remains separate evidence.
- **Branch `feat/verified-email-reminders`:** reviewed profile form, preference UI, privacy copy, reminder template, lifecycle/job logic, stable CRM sync and `docs/email-operations.md`. `/tmp/email-tests.log` records 30 passing tests, none skipped; root reports lint/build passing. Isolated real Postgres integration exercises state, expiry, concurrency, ambiguous SMTP and durable limits; mail is mocked. Browser HTTP mocks exercise the interface separately. These are complementary tests, not one real browser-to-database-to-inbox journey.
- **Visual finish:** inspected refreshed 320px/390px/1100px confirmation and 320px cancelled-state captures against incumbent `DESIGN.md`. No clipping or material hierarchy defect is visible. Corrected request wording and the wrapped stop-all button were visually confirmed; no horizontal overflow is visible. Actual screen-reader use and actual inbox appearance of new verification/reminder emails were not tested here.
- **Authentic proof:** root's search found no suitable speaking/advisory artifact. A promotional video using a retired brand is not delivery evidence. User asset input remains pending.

## Production scorecard

Scores retain prior evidence and deductions, with seven additional points for the newly observed production lifecycle: H5 gains two, H9 gains one and H10 gains four. Provider acceptance is not treated as inbox receipt; live happy-path success is not treated as fault-injection coverage. Each heuristic is equally weighted; deductions are acceptance judgments, not measured user outcomes.

| Heuristic | /100 | Evidence and remaining deduction from 100 |
|---|---:|---|
| System status | 98 | Recorded progress, focus and truthful success/failure states. −2: actual screen-reader announcements untested. |
| Real-world match | 91 | Self-report caveats, preserved ties and distinct demand/capability. −9: authentic speaking/advisory delivery proof absent. |
| User control | 98 | Recorded back/reload/restart, sharing and saving checks. −2: actual calendar-client behavior untested. Independent withdrawal controls and idempotent confirmation now have live production evidence. |
| Consistency | 98 | Established visual system and mobile/desktop/print evidence. −2: assistive-technology coverage incomplete. |
| Error prevention | 98 | Live inspection without activation, explicit/idempotent confirmation, independent withdrawal, revoked-link rejection and private database access add production evidence. −2: live shared abuse-limit enforcement and partial-upstream fault injection remain unverified. |
| Recognition | 99 | Persistent prompts, labels, selections and explanations. −1: minor repeated framework language. |
| Efficiency | 96 | Direct commercial/Profile routes and readable saved profile. −2: actual calendar import; −2: Ideas remains a topic directory. |
| Aesthetic restraint | 97 | Coherent hierarchy and removal of placeholder event proof. −3: explanatory repetition and uniform commercial treatments. |
| Error recovery | 97 | Recorded request/storage/clipboard recovery plus live stable CRM updates after withdrawal and successful repeat cron processing. −3: production partial-upstream failure and ambiguous-delivery recovery remain untested; quarantine behavior is supported by local tests. |
| Help and explanation | 98 | Accurate guidance, previously user-confirmed profile copy, and live verification, withdrawal and one-send reminder SMTP acceptance. −2: receipt and intended inbox-client rendering of the new confirmation/reminder emails remain unverified. |

**Total 970 out of 1,000; 970 ÷ 10 = 97.0/100 (97.0%).** This is not conversion lift or an accessibility certification. A mean cannot override a blocking journey.

## Council synthesis and finish review

**Brand/design:** Chris Do and Marty Neumeier lenses favor retaining the calm ink/bone/cobalt identity. The preference surface uses its serif heading, restrained rules and clear confirmation action appropriately for a utility task. Typography reads clearly in supplied captures. Another broad visual pass offers little value.

**Messaging/conversion:** Miller and Wiebe lenses support separate profile-copy, reminder and educational choices, deliberate confirmation, and “around 75 days.” Dunford's buyer-proof objection remains: clear service language does not demonstrate past delivery. No conversion improvement is claimed.

**Trust/usability:** Van Edwards and Krug lenses favor inspection without activation, separate cancellation/unsubscribe and visible outcome receipts. Disclosure that accepted SMTP mail cannot be recalled is useful. Status/alert roles and focus after actions are source affordances, not substitutes for actual assistive-technology testing.

**Impeccable finish: prior local/browser finish accepted; production activation gate now closed by the reported live checks.** Source fixes and the final mobile/desktop captures are verified. This review found that a reminder-only verification request could say “Not subscribed” even when existing educational consent remained active. Root changed the verification labels to describe the request, with current subscription assertions reserved for management, and renamed the confirmation heading “Confirmed request.” Source confirms those fixes. The long stop-all button wraps cleanly at 320px. No material UI finding remains in this bounded pass. Root reports detector output `[]` in `/tmp/email-lifecycle-detect.json`. This is a bounded finish review, not a new full Impeccable critique run. No new visual pass was performed for this evidence update. Authentic proof remains pending; activation no longer requires user input.

## Red-team findings and remaining gates

1. **Resolved and exercised in production:** withdrawal previously risked duplicate CRM people. Stable person/note/target IDs now survived live opt-in and withdrawal synchronization. PATCH and durable uncertainty quarantine remain the implementation protections. Ambiguous upstream creation still requires reconciliation. Never clear quarantine blindly or send campaigns from stale CRM notes.
2. **Activation gate closed:** the dedicated Supabase database, scoped schema, verified TLS, restricted table access, production deployment and authenticated daily cron have reported live evidence. The obsolete Neon terms dependency no longer applies.
3. **Delivery evidence remaining:** SMTP accepted the controlled reminder once, with zero accepted on the next run. Confirm receipt and appearance in the intended inbox client. The live pending request was created locally before production confirmation, so this review does not claim a complete browser-originated opt-in-to-inbox test.
4. **Other acceptance evidence:** approved authentic speaking/work artifact with defensible role/context; actual calendar-client import; actual screen-reader assessment and preference flow; live abuse-limit and partial-upstream failure checks. Re-score only deductions those results close.
5. **Operational limits:** SMTP uncertainty is intentionally held for review. No newsletter sender is introduced; future campaigns must query current verified consent. Verified-record retention still needs an approved policy or deletion handling as documented.

Production activation and the controlled lifecycle checks close substantial engineering uncertainty. They do not establish inbox receipt, supply authentic proof or justify 98% today.
