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
      `${d.name}: ${profile.scores[d.key].toFixed(1)} / 10 — ${BANDS[bandFor(profile.scores[d.key])].label}`,
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
