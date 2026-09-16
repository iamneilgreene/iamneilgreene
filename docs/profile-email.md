# Capability Profile email

## Purpose and visual authority

This transactional report extends the established brand in Read mode. PRODUCT.md and DESIGN.md remain authoritative; this document does not introduce a new visual system or change site tokens. Keep the voice calm, exact, and earned. Follow the user's preference against em dashes in all email copy, including shared narratives and plans.

## Implementation

`src/lib/profileEmail.ts` owns HTML, plain text, and profile validation. `src/app/api/profile-subscription/route.ts` passes both representations to `sendWebsiteMail`; preserve the multipart plain-text fallback.

The ink header introduces a warm bone report with one cobalt action. Email styles use literal hex values, inline declarations, presentation tables, a fluid 100% container capped at 640px, and an Outlook conditional 640px wrapper. Georgia with Times New Roman fallback carries headings; Arial with Helvetica fallback carries body and UI. These are email adaptations of the site's typography. No external images, fonts, scripts, or assets are required.

Keep the score table semantic: caption, row headers, numeric scores, and visible band labels. Colour must never be the only explanation. Preserve generous body leading and the single-column reading order. Escape every dynamic string entering HTML, including names and shared copy; format numbers only from validated profile data.

## Content and decision semantics

- Show all four scores to one decimal with their band narratives and optional reported responsibility demands. Never average them into an overall score. The standard is met only when every dimension reaches 8.0.
- Derive interpretation from `buildResult`, bands from `bandFor`/`BANDS`, and plans from `THIRTY_DAY_PLANS`. Do not create email-specific scoring logic.
- Preserve all `advantages` and `priorityCandidates`. Near ties use the framework's provisional 0.3 comparison tolerance, not a statistical confidence claim. Candidate order does not establish superiority. Priority selection considers urgent signals, then active demand gaps, then lowest scores; defer to the shared implementation.
- Show the selected candidate's plan, or automatically show a plan only when there is exactly one candidate. An unresolved tie must invite a browser choice and include every score interpretation; never silently use the first candidate. Validation accepts a selected priority only from the computed candidates.
- Keep the self-report limitations, 75-day retest guidance, explicit absence of an automatic reminder, exclusion of raw answers/written evidence, and separate educational-update consent language.
- Maintain meaningful plain-text parity whenever changing HTML: scores, bands, demands, interpretations, highest areas, candidate choices, plan objective/why/actions/evidence, caveats, and navigation expectations. Presentation order may differ.
- Saved results live in the completion browser. The email action is not a portable results link; another device opens a new assessment. Do not imply server-hosted result recovery.

## Verification and known limits

Review disposition supplied with this handoff: ship. Browser captures exist at `/tmp/profile-email-mobile.png` and `/tmp/profile-email-desktop.png`; they are temporary review artifacts, not inbox-client certification. Actual Gmail, Apple Mail, and Outlook rendering has not been verified. Inline styles, fallback fonts, and the Outlook wrapper reduce compatibility risk but cannot guarantee client behaviour, forced dark-mode colours, or identical button padding.

For maintenance, preview mobile and desktop with a single priority, an unresolved tie, optional demands, and a name containing HTML-sensitive characters. Compare both message representations. For a client-compatibility claim, send and inspect the multipart message in the named clients.

Existing drift observed, left unchanged: the email action/link colour (`#214da8`) is a local literal outside DESIGN.md's listed cobalt hex values. Plain text ends at `/capability-profile`, while the HTML action targets `/capability-profile/start`; plain text also omits the HTML's explicit same-browser recovery explanation and privacy link. These differences should be considered when next updating parity, without treating this document as authorization to change system tokens.
