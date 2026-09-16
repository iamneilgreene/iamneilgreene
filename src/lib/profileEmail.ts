import { buildResult, bandFor, BANDS, type Scores, type Demands } from './capability'
import { DIMENSIONS, type MKey } from './constants'
import { BAND_NARRATIVES, THIRTY_DAY_PLANS } from './resultCopy'

export type EmailProfile = { scores: Scores; demands: Demands | null; selectedPriority: MKey | null; completedAt?: string }
const keys = ['mind', 'means', 'measure', 'mastery'] as const

export function validateEmailProfile(value: unknown): EmailProfile | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const fields = value as Record<string, unknown>
  const check = (value: unknown, integer: boolean): value is Scores => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false
    return keys.every((key) => {
      const n = (value as Record<string, unknown>)[key]
      return typeof n === 'number' && Number.isFinite(n) && n >= 1 && n <= 10 && (!integer || Number.isInteger(n)) && Math.abs(n * 10 - Math.round(n * 10)) < 1e-8
    })
  }
  if (!check(fields.scores, false) || (fields.demands !== null && !check(fields.demands, true))) return null
  const sourceScores = fields.scores
  const scores: Scores = { mind: sourceScores.mind, means: sourceScores.means, measure: sourceScores.measure, mastery: sourceScores.mastery }
  const sourceDemands = fields.demands as Demands | null
  const demands = fields.demands === null ? null : { mind: sourceDemands!.mind, means: sourceDemands!.means, measure: sourceDemands!.measure, mastery: sourceDemands!.mastery }
  const result = buildResult(scores, demands)
  const priority = fields.selectedPriority
  if (priority !== null && (typeof priority !== 'string' || !result.priorityCandidates.includes(priority as MKey))) return null
  if (fields.completedAt !== undefined && (typeof fields.completedAt !== 'string' || !Number.isFinite(Date.parse(fields.completedAt)) || Date.parse(fields.completedAt) > Date.now() + 120000)) return null
  return { scores, demands, selectedPriority: priority as MKey | null, completedAt: fields.completedAt as string | undefined }
}

export function profileEmailText(name: string, profile: EmailProfile): string {
  const result = buildResult(profile.scores, profile.demands)
  const nameOf = (key: MKey) => DIMENSIONS.find(d => d.key === key)!.name
  const lines = [
    `Hi ${name},`, '', 'Your Four M Capability Profile', '',
    'These scores describe self-reported patterns, not independently verified abilities or a prediction of performance. The bands and 8 standard belong to this framework, not a population comparison.', '',
    ...DIMENSIONS.flatMap(d => [
      `${d.name}: ${profile.scores[d.key].toFixed(1)} / 10: ${BANDS[bandFor(profile.scores[d.key])].label}`,
      ...(profile.demands ? [`Reported responsibility demand: ${profile.demands[d.key]} / 10`] : []),
      BAND_NARRATIVES[d.key][bandFor(profile.scores[d.key])], '',
    ]),
    `Self-reported standard: ${result.standardMet ? 'met' : 'not yet met'}. All four dimensions must reach 8.0 or higher.`,
    `Highest reported areas: ${result.advantages.map(nameOf).join(', ')}.`,
    `Suggested starting areas: ${result.priorityCandidates.map(nameOf).join(', ')}.`, '',
  ]
  const priority = profile.selectedPriority ?? (result.priorityCandidates.length === 1 ? result.priorityCandidates[0] : null)
  if (priority) {
    const plan = THIRTY_DAY_PLANS[priority]
    lines.push(`Your 30-day starting plan: ${nameOf(priority)}`, plan.objective, plan.why, '', ...plan.actions.flatMap((a, i) => [`${i + 1}. ${a.title}`, a.detail, '']), `Evidence to look for: ${plan.evidence}`, '')
  } else lines.push('Your responses do not establish one clear priority. Choose an area in your browser to see its 30-day plan; all score interpretations are included above.', '')
  lines.push('Return in about 75 days to compare your responses with concrete changes in behavior. No automatic reminder has been scheduled. Use the calendar download in your browser if you want a reminder.', '', 'Your raw assessment answers and written evidence are not included in this email.', 'Requesting this copy does not subscribe you to educational updates unless you separately checked that option.', '', 'Questions? Reply to hello@iamneilgreene.com.', 'https://www.iamneilgreene.com/capability-profile')
  return lines.join('\n')
}

/** Escape every dynamic value before it enters an email's HTML. */
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!))

/** Table layout and inline styles keep the report readable without external assets. */
export function profileEmailHtml(name: string, profile: EmailProfile): string {
  const result = buildResult(profile.scores, profile.demands)
  const nameOf = (key: MKey) => DIMENSIONS.find(d => d.key === key)!.name
  const priority = profile.selectedPriority ?? (result.priorityCandidates.length === 1 ? result.priorityCandidates[0] : null)
  const paragraph = (text: string) => `<p style="margin:0 0 16px;font:16px/1.65 Arial,Helvetica,sans-serif;color:#2b3746;">${escapeHtml(text)}</p>`
  const heading = (text: string) => `<h2 style="margin:32px 0 12px;font:normal 28px/1.2 Georgia,'Times New Roman',serif;color:#101720;">${escapeHtml(text)}</h2>`
  const rows = DIMENSIONS.map(d => `<tr><th scope="row" align="left" style="padding:16px 8px 16px 0;border-bottom:1px solid #d4ccbd;font:normal 19px/1.4 Georgia,'Times New Roman',serif;color:#101720;">${escapeHtml(d.name)}</th><td align="right" style="padding:16px 0;border-bottom:1px solid #d4ccbd;font:bold 20px/1.4 Arial,Helvetica,sans-serif;color:#101720;white-space:nowrap;">${profile.scores[d.key].toFixed(1)} <span style="font-size:14px;font-weight:normal;color:#3a495c;">/ 10</span><br><span style="font-size:13px;font-weight:normal;color:#3a495c;">${escapeHtml(BANDS[bandFor(profile.scores[d.key])].label)}</span></td></tr>`).join('')
  const interpretations = DIMENSIONS.map(d => `<h3 style="margin:24px 0 8px;font:bold 18px/1.4 Arial,Helvetica,sans-serif;color:#101720;">${escapeHtml(d.name)}</h3>${paragraph(BAND_NARRATIVES[d.key][bandFor(profile.scores[d.key])])}${profile.demands ? paragraph(`Reported responsibility demand: ${profile.demands[d.key]} / 10.`) : ''}`).join('')
  let planHtml: string
  if (priority) {
    const plan = THIRTY_DAY_PLANS[priority]
    planHtml = heading(`Your 30-day plan: ${nameOf(priority)}`) + paragraph(plan.objective) + paragraph(plan.why) + `<ol style="margin:20px 0;padding-left:24px;color:#101720;">${plan.actions.map(a => `<li style="margin:0 0 20px;padding-left:4px;font:16px/1.6 Arial,Helvetica,sans-serif;"><strong>${escapeHtml(a.title)}</strong><br>${escapeHtml(a.detail)}</li>`).join('')}</ol>` + `<h3 style="margin:24px 0 8px;font:bold 18px/1.4 Arial,Helvetica,sans-serif;color:#101720;">Evidence to look for</h3>` + paragraph(plan.evidence)
  } else {
    planHtml = heading('Choose where to begin') + paragraph(`Suggested starting areas: ${result.priorityCandidates.map(nameOf).join(', ')}.`) + paragraph('Your responses do not establish one clear priority. Return to your results in the same browser and choose an area to see its 30-day plan. All score interpretations are included below.')
  }
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>Your Four M Capability Profile</title></head>
<body style="margin:0;padding:0;background-color:#e6e0d4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Your four scores, what they mean, and a practical starting point.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e6e0d4;"><tr><td align="center" style="padding:24px 12px;">
<!--[if mso]><table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#faf7f3;">
<tr><td bgcolor="#101720" style="padding:32px 24px;background-color:#101720;color:#faf7f3;">
<p style="margin:0 0 32px;font:normal 22px/1.3 Georgia,'Times New Roman',serif;color:#faf7f3;">Neil Greene<span style="color:#8cadf5;">.</span></p>
<h1 style="margin:0 0 16px;font:normal 36px/1.12 Georgia,'Times New Roman',serif;color:#faf7f3;">Your Four M<br>Capability Profile</h1>
<p style="margin:0;font:16px/1.6 Arial,Helvetica,sans-serif;color:#e6e0d4;">Expand capability. Carry responsibility.</p></td></tr>
<tr><td style="padding:28px 24px 8px;">
${paragraph(`Hi ${name},`)}${paragraph('Here is your profile, ready to revisit. Start with your scores, choose one area to work on, and look for evidence of change in daily life.')}
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><caption style="text-align:left;padding:8px 0 4px;font:normal 28px/1.2 Georgia,'Times New Roman',serif;color:#101720;">Your scores</caption><tbody>${rows}</tbody></table>
<p style="margin:16px 0 8px;font:bold 15px/1.6 Arial,Helvetica,sans-serif;color:#101720;">Self-reported standard: ${result.standardMet ? 'met' : 'not yet met'}.</p>
${paragraph('All four dimensions must reach 8.0 or higher. These are self-reported patterns, not independently verified abilities or a prediction of performance. The bands and 8 standard belong to this framework, not a population comparison.')}
${paragraph(`Highest reported areas: ${result.advantages.map(nameOf).join(', ')}.`)}
${planHtml}
${heading('What your scores mean')}${interpretations}
${heading('Return in about 75 days')}${paragraph('Compare your responses with concrete changes in behavior. No automatic reminder has been scheduled. Use the calendar download in your browser if you want a reminder.')}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr><td bgcolor="#214da8" style="background-color:#214da8;"><a href="https://www.iamneilgreene.com/capability-profile/start" style="display:inline-block;padding:15px 20px;border:1px solid #214da8;font:bold 16px/1.4 Arial,Helvetica,sans-serif;color:#faf7f3;text-decoration:none;">Visit the Capability Profile</a></td></tr></table>
${paragraph('Your saved results are available only in the browser where you completed the profile. On another device, the link opens a new assessment.')}
</td></tr>
<tr><td style="padding:24px;border-top:1px solid #d4ccbd;">
<p style="margin:0 0 12px;font:14px/1.65 Arial,Helvetica,sans-serif;color:#3a495c;">This is the profile copy you requested. Your raw answers and written evidence are not included. Requesting this copy does not subscribe you to educational updates unless you separately checked that option.</p>
<p style="margin:0;font:14px/1.65 Arial,Helvetica,sans-serif;color:#3a495c;">Questions? Reply to this email.<br><a href="mailto:hello@iamneilgreene.com" style="color:#214da8;text-decoration:underline;">hello@iamneilgreene.com</a><br><a href="https://www.iamneilgreene.com/privacy" style="color:#214da8;text-decoration:underline;">Privacy and contact preferences</a></p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`
}
