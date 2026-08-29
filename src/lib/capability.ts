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
export const PRIORITY_LOGIC_VERSION = 'v1.0.0'
export const RESULT_COPY_VERSION = 'v1.0.0'

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
  no_gap: 'Current capability meets or exceeds the demand you have described.',
  watch: 'Demand is approaching your current capability in this dimension.',
  active:
    'Responsibility is outpacing current capability enough to deserve deliberate attention.',
  critical:
    'Demand materially exceeds current capability here. This should be prioritised.',
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
  advantage: MKey
  /** Populated when the top two scores sit within 0.3 of each other. */
  coAdvantage: MKey | null
  /** Lowest below 8.0. Null when all four already meet the standard. */
  constraint: MKey | null
  /** Exactly one dimension. Selected by the priority ladder. */
  developmentPriority: MKey
  /** True when the two lowest sit within 0.3 and the tie needed breaking. */
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

/**
 * Selects the single Primary Development Priority.
 *
 * Ladder, in order:
 *   1. Critical Responsibility-Capability Gap
 *   2. Breakpoint score below 4.0
 *   3. Largest Active Gap
 *   4. Lowest Capability score below 8.0
 *   5. All four at standard → lowest becomes the Development Priority
 *
 * Ties break on higher Responsibility Demand first, then lower score.
 */
function selectPriority(
  scores: Scores,
  demands: Demands | null,
  gaps: Record<MKey, GapCategory> | null
): { priority: MKey; close: [MKey, MKey] | null } {
  const byDemandThenScore = (a: MKey, b: MKey) => {
    if (demands) {
      const d = demands[b] - demands[a]
      if (d !== 0) return d
    }
    return scores[a] - scores[b]
  }

  // Tier 1 — critical gaps and breakpoints share the highest priority.
  const tier1 = KEYS.filter(
    (k) => (gaps && gaps[k] === 'critical') || scores[k] < 4.0
  )
  if (tier1.length > 0) {
    return { priority: [...tier1].sort(byDemandThenScore)[0], close: null }
  }

  // Tier 2 — the largest active gap.
  if (gaps && demands) {
    const activeKeys = KEYS.filter((k) => gaps[k] === 'active')
    if (activeKeys.length > 0) {
      const largest = [...activeKeys].sort(
        (a, b) => demands[b] - scores[b] - (demands[a] - scores[a])
      )[0]
      return { priority: largest, close: null }
    }
  }

  // Tier 3 — the lowest score, whether or not it is below the standard.
  const ascending = [...KEYS].sort((a, b) => scores[a] - scores[b])
  const [lowest, second] = ascending

  // Avoid false precision: a 0.1 difference is not a real distinction.
  if (Math.abs(scores[lowest] - scores[second]) <= 0.3) {
    const resolved = [lowest, second].sort(byDemandThenScore)[0]
    return { priority: resolved, close: [lowest, second] }
  }

  return { priority: lowest, close: null }
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

  const { priority, close } = selectPriority(scores, demands, gaps)

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
    advantage: top,
    coAdvantage:
      Math.abs(scores[top] - scores[secondTop]) <= 0.3 ? secondTop : null,
    constraint,
    developmentPriority: priority,
    closeDevelopmentAreas: close,
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
