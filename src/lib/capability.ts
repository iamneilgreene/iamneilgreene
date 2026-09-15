import type { MKey } from './constants'

/* ═══════════════════════════════════════════════════════════════════════
   THE FOUR M CAPABILITY PROFILE — SCORING ENGINE

   Deterministic by design. No model, no randomness, no server round-trip
   required to produce a result. Every threshold below is versioned so a
   future recalibration never silently rewrites a historical profile.

   Source of truth: Four M Capability Profile — V1 Pilot Specification.
   ═══════════════════════════════════════════════════════════════════════ */

export const QUESTION_SET_VERSION = 'v1.0.0'
export const SCORING_VERSION = 'v1.0.0'
export const PRIORITY_LOGIC_VERSION = 'v1.1.0'
export const RESULT_COPY_VERSION = 'v1.1.0'

/* ─── Response scale ───────────────────────────────────────────────────
   "Usually true" maps to exactly 8.0 — the Capability Standard. The
   standard is therefore behavioural, not aspirational.
   ──────────────────────────────────────────────────────────────────── */

export const RESPONSE_CHOICES = [
  { label: 'Never true', value: 1.0 },
  { label: 'Rarely true', value: 3.0 },
  { label: 'Sometimes true', value: 5.5 },
  { label: 'Usually true', value: 8.0 },
  { label: 'Consistently true', value: 10.0 },
] as const

export type ResponseValue = (typeof RESPONSE_CHOICES)[number]['value']

/* ─── Score bands ──────────────────────────────────────────────────── */

export type Band =
  | 'breakpoint'
  | 'constraint'
  | 'functional'
  | 'capable'
  | 'proven'
  | 'exceptional'

export const BANDS: Record<Band, { label: string; min: number; max: number }> = {
  breakpoint: { label: 'Breakpoint', min: 1.0, max: 3.9 },
  constraint: { label: 'Constraint', min: 4.0, max: 5.9 },
  functional: { label: 'Functional', min: 6.0, max: 7.9 },
  capable: { label: 'Capable', min: 8.0, max: 8.9 },
  proven: { label: 'Proven', min: 9.0, max: 9.9 },
  exceptional: { label: 'Exceptional', min: 10.0, max: 10.0 },
}

export function bandFor(score: number): Band {
  if (score >= 10.0) return 'exceptional'
  if (score >= 9.0) return 'proven'
  if (score >= 8.0) return 'capable'
  if (score >= 6.0) return 'functional'
  if (score >= 4.0) return 'constraint'
  return 'breakpoint'
}

/** The Capability Standard. 8 is the standard, not the finish. */
export const STANDARD = 8.0

/* ─── Responsibility-Capability Gap ────────────────────────────────── */

export type GapCategory = 'no_gap' | 'watch' | 'active' | 'critical'

export const GAP_LABELS: Record<GapCategory, string> = {
  no_gap: 'No Current Gap',
  watch: 'Watch Zone',
  active: 'Active Gap',
  critical: 'Critical Gap',
}

export const GAP_DESCRIPTIONS: Record<GapCategory, string> = {
  no_gap: 'Your reported capability meets or exceeds your reported demand.',
  watch: 'Your reported demand is slightly above your reported capability.',
  active:
    'Your responses suggest a gap worth exploring with concrete examples.',
  critical:
    'Your reported demand is substantially higher than your reported capability. Review what support or change would help.',
}

/** Gap = demand − capability, within the same dimension. */
export function gapCategory(demand: number, capability: number): GapCategory {
  const gap = demand - capability
  if (gap <= 0) return 'no_gap'
  if (gap < 1.0) return 'watch'
  if (gap < 2.0) return 'active'
  return 'critical'
}

/* ─── Result shape ─────────────────────────────────────────────────── */

export interface Scores {
  mind: number
  means: number
  measure: number
  mastery: number
}

export interface Demands {
  mind: number
  means: number
  measure: number
  mastery: number
}

export interface CapabilityResult {
  scores: Scores
  demands: Demands | null
  /** Standard is met only when all four reach 8.0. Never an average. */
  standardMet: boolean
  /** All dimensions within the provisional 0.3 comparison tolerance. */
  advantages: MKey[]
  priorityCandidates: MKey[]
  largestGapDimensions: MKey[]
  /** Legacy presentation representative; use advantages to avoid hiding ties. */
  advantage: MKey
  /** Populated when the top two scores sit within 0.3 of each other. */
  coAdvantage: MKey | null
  /** Lowest below 8.0. Null when all four already meet the standard. */
  constraint: MKey | null
  /** Compatibility default for a plan. Use priorityCandidates for interpretation; ties require user choice. */
  developmentPriority: MKey
  /** Legacy first two candidates; use priorityCandidates for the complete set. */
  closeDevelopmentAreas: [MKey, MKey] | null
  oneDimensionalRisk: boolean
  gaps: Record<MKey, GapCategory> | null
  largestGap: { dimension: MKey; category: GapCategory } | null
  versions: {
    questionSet: string
    scoring: string
    priorityLogic: string
    resultCopy: string
  }
}

const KEYS: MKey[] = ['mind', 'means', 'measure', 'mastery']

/** Mean of six mapped item values, to one decimal place. */
export function dimensionScore(responses: number[]): number {
  if (responses.length === 0) return 0
  const mean = responses.reduce((a, b) => a + b, 0) / responses.length
  return Math.round(mean * 10) / 10
}

/** Provisional interpretation tolerance, not a validated statistical interval. */
export const COMPARISON_TOLERANCE = 0.3
const closeEnough = (a: number, b: number) => Math.abs(a - b) <= COMPARISON_TOLERANCE + 1e-9

/** Preserve all near ties. Ordering is presentation only, never evidence of superiority. */
function selectPriority(scores: Scores, demands: Demands | null, gaps: Record<MKey, GapCategory> | null): MKey[] {
  const urgent = KEYS.filter((k) => gaps?.[k] === 'critical' || scores[k] < 4)
  if (urgent.length) {
    // Different urgent signals are not commensurate enough to rank confidently.
    return urgent
  }
  if (demands && gaps) {
    const active = KEYS.filter((k) => gaps[k] === 'active')
    if (active.length) {
      const maximum = Math.max(...active.map((k) => demands[k] - scores[k]))
      return active.filter((k) => closeEnough(demands[k] - scores[k], maximum))
    }
  }
  const minimum = Math.min(...KEYS.map((k) => scores[k]))
  return KEYS.filter((k) => closeEnough(scores[k], minimum))
}

export function buildResult(scores: Scores, demands: Demands | null): CapabilityResult {
  const descending = [...KEYS].sort((a, b) => scores[b] - scores[a])
  const [top, secondTop] = descending

  const gaps = demands
    ? (Object.fromEntries(
        KEYS.map((k) => [k, gapCategory(demands[k], scores[k])])
      ) as Record<MKey, GapCategory>)
    : null

  let largestGap: CapabilityResult['largestGap'] = null
  if (demands && gaps) {
    const positive = KEYS.filter((k) => demands[k] - scores[k] > 0)
    if (positive.length > 0) {
      const worst = [...positive].sort(
        (a, b) => demands[b] - scores[b] - (demands[a] - scores[a])
      )[0]
      largestGap = { dimension: worst, category: gaps[worst] }
    }
  }

  const priorityCandidates = selectPriority(scores, demands, gaps)
  const advantages = KEYS.filter((k) => closeEnough(scores[k], scores[top]))
  const largestGapDimensions = demands && largestGap
    ? KEYS.filter((k) => demands[k] - scores[k] > 0 && closeEnough(demands[k] - scores[k], demands[largestGap.dimension] - scores[largestGap.dimension]))
    : []

  const values = KEYS.map((k) => scores[k])
  const spread = Math.max(...values) - Math.min(...values)

  const belowStandard = KEYS.filter((k) => scores[k] < STANDARD)
  const constraint =
    belowStandard.length > 0
      ? [...belowStandard].sort((a, b) => scores[a] - scores[b])[0]
      : null

  return {
    scores,
    demands,
    standardMet: KEYS.every((k) => scores[k] >= STANDARD),
    advantages,
    priorityCandidates,
    largestGapDimensions,
    advantage: top,
    coAdvantage:
      Math.abs(scores[top] - scores[secondTop]) <= 0.3 ? secondTop : null,
    constraint,
    developmentPriority: priorityCandidates[0],
    closeDevelopmentAreas: priorityCandidates.length > 1 ? [priorityCandidates[0], priorityCandidates[1]] : null,
    // Provisional threshold, to be recalibrated against pilot data.
    oneDimensionalRisk: spread >= 2.0,
    gaps,
    largestGap,
    versions: {
      questionSet: QUESTION_SET_VERSION,
      scoring: SCORING_VERSION,
      priorityLogic: PRIORITY_LOGIC_VERSION,
      resultCopy: RESULT_COPY_VERSION,
    },
  }
}

export function retestCalendar(completedAt: string): { date: Date; calendar: string } | null {
  const completed = new Date(completedAt)
  if (!Number.isFinite(completed.getTime())) return null
  const date = new Date(completed)
  date.setDate(date.getDate() + 75)
  const stamp = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const end = new Date(date)
  end.setDate(end.getDate() + 1)
  return { date, calendar: [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Neil Greene//Capability Profile//EN',
    'BEGIN:VEVENT', `UID:capability-retest-${completed.getTime()}@iamneilgreene.com`,
    `DTSTAMP:${completed.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    `DTSTART;VALUE=DATE:${stamp(date)}`, `DTEND;VALUE=DATE:${stamp(end)}`,
    'SUMMARY:Revisit your Capability Profile',
    'DESCRIPTION:Review concrete examples of change and retake the self-assessment.',
    'URL:https://iamneilgreene.com/capability-profile/start',
    'BEGIN:VALARM', 'TRIGGER:-PT9H', 'ACTION:DISPLAY', 'DESCRIPTION:Revisit your Capability Profile',
    'END:VALARM', 'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n') }
}
