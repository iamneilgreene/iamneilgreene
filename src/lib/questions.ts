import type { MKey } from './constants'

/* ═══════════════════════════════════════════════════════════════════════
   THE 24 SCORED ITEMS + 4 RESPONSIBILITY DEMAND ITEMS — V1

   Wording is transcribed verbatim from the V1 Pilot Specification. Do not
   reword an item during implementation without versioning the question set:
   changing an item silently invalidates every profile scored before it.
   ═══════════════════════════════════════════════════════════════════════ */

export interface Question {
  /** Stable ID. Survives reordering. */
  id: string
  dimension: MKey
  facet: string
  text: string
}

export const CAPABILITY_QUESTIONS: readonly Question[] = [
  // ── MIND ─────────────────────────────────────────────────────────────
  {
    id: 'mind-1',
    dimension: 'mind',
    facet: 'Judgment',
    text: 'When information is incomplete or conflicting, I can identify what matters most before making a decision.',
  },
  {
    id: 'mind-2',
    dimension: 'mind',
    facet: 'Applied learning',
    text: 'I regularly turn what I read, study, or learn into a decision, system, skill, or change in behavior.',
  },
  {
    id: 'mind-3',
    dimension: 'mind',
    facet: 'Intellectual honesty',
    text: 'When credible evidence challenges what I believe, I can change my view instead of defending it simply because it is mine.',
  },
  {
    id: 'mind-4',
    dimension: 'mind',
    facet: 'Strategic awareness',
    text: 'I can identify the major forces likely to affect my profession, business, or responsibilities and explain how I am preparing for them.',
  },
  {
    id: 'mind-5',
    dimension: 'mind',
    facet: 'Learning capacity',
    text: 'I have a deliberate method for learning new skills or subjects that matter to my future, rather than relying only on random consumption.',
  },
  {
    id: 'mind-6',
    dimension: 'mind',
    facet: 'Decision quality under pressure',
    text: 'Under pressure, I can slow myself down enough to think clearly instead of letting urgency, fear, ego, or emotion make the decision for me.',
  },

  // ── MEANS ────────────────────────────────────────────────────────────
  {
    id: 'means-1',
    dimension: 'means',
    facet: 'Financial margin',
    text: 'I could absorb a meaningful unexpected expense or short-term loss of income without immediately entering crisis mode.',
  },
  {
    id: 'means-2',
    dimension: 'means',
    facet: 'Skill stack',
    text: 'My professional or economic value depends on a combination of useful skills and capabilities, not one easily replaceable credential, role, or task.',
  },
  {
    id: 'means-3',
    dimension: 'means',
    facet: 'Technology and systems leverage',
    text: 'I use tools, systems, or technology to multiply what I can accomplish beyond my own time and effort.',
  },
  {
    id: 'means-4',
    dimension: 'means',
    facet: 'Reciprocal relationships',
    text: 'I have trusted relationships I can call on for expertise, opportunity, perspective, or support, and those people can reasonably call on me too.',
  },
  {
    id: 'means-5',
    dimension: 'means',
    facet: 'Optionality',
    text: 'I have meaningful options beyond a single employer, client, income source, platform, or gatekeeper if my current situation changes.',
  },
  {
    id: 'means-6',
    dimension: 'means',
    facet: 'Compounding assets',
    text: 'I have built assets such as reputation, ownership, systems, knowledge, relationships, audience, or capital that continue creating value beyond the hours I personally work.',
  },

  // ── MEASURE ──────────────────────────────────────────────────────────
  {
    id: 'measure-1',
    dimension: 'measure',
    facet: 'Physical capability',
    text: 'My current strength, mobility, and conditioning allow me to handle the normal physical demands of my life with confidence.',
  },
  {
    id: 'measure-2',
    dimension: 'measure',
    facet: 'Energy and recovery',
    text: 'My normal health and recovery habits support reliable energy across the demands of a typical week.',
  },
  {
    id: 'measure-3',
    dimension: 'measure',
    facet: 'Performance under pressure',
    text: 'Under meaningful pressure, I can prioritize, execute, and remain useful without becoming reckless, shutting down, or creating avoidable problems.',
  },
  {
    id: 'measure-4',
    dimension: 'measure',
    facet: 'Discomfort tolerance',
    text: 'When something important requires discomfort or sustained effort, I can act instead of automatically avoiding it.',
  },
  {
    id: 'measure-5',
    dimension: 'measure',
    facet: 'Recovery and adaptation',
    text: 'When a plan fails, I take a hit, or circumstances change, I can recover, adjust, and resume useful action without staying derailed for long.',
  },
  {
    id: 'measure-6',
    dimension: 'measure',
    facet: 'Reliability under demand',
    text: 'People who depend on me can reasonably expect me to remain useful when a situation becomes demanding rather than becoming another problem they must manage.',
  },

  // ── MASTERY ──────────────────────────────────────────────────────────
  {
    id: 'mastery-1',
    dimension: 'mastery',
    facet: 'Self-command',
    text: 'I consistently do important things I said I would do even when motivation, mood, or convenience works against me.',
  },
  {
    id: 'mastery-2',
    dimension: 'mastery',
    facet: 'Emotional regulation',
    text: 'I can regulate anger, fear, ego, frustration, and impulse well enough that they do not routinely control my decisions or behavior.',
  },
  {
    id: 'mastery-3',
    dimension: 'mastery',
    facet: 'Integrity and standards',
    text: 'The standards I expect from other people are standards I make a serious effort to live myself, especially when nobody is watching.',
  },
  {
    id: 'mastery-4',
    dimension: 'mastery',
    facet: 'Communication and trust',
    text: 'When I am responsible for people or outcomes, I make expectations clear, communicate directly, and follow through in a way that builds trust.',
  },
  {
    id: 'mastery-5',
    dimension: 'mastery',
    facet: 'Stewardship',
    text: 'I can make difficult decisions that protect the long-term good of the people, commitments, or outcomes I am responsible for, even when the short-term choice would be easier.',
  },
  {
    id: 'mastery-6',
    dimension: 'mastery',
    facet: 'Positive leadership impact',
    text: 'I can point to specific people or outcomes that have improved because of how I led, supported, or developed them.',
  },
] as const

/**
 * Fixed interleaved presentation order.
 *
 * Balanced so no two items from the same dimension appear consecutively and
 * so early or late fatigue cannot land disproportionately on one dimension.
 * The participant is never shown which dimension an item belongs to.
 */
export const PRESENTATION_ORDER: readonly string[] = [
  'mind-1', 'means-1', 'measure-1', 'mastery-1',
  'mind-2', 'means-2', 'measure-2', 'mastery-2',
  'mind-3', 'means-3', 'measure-3', 'mastery-3',
  'mind-4', 'means-4', 'measure-4', 'mastery-4',
  'mind-5', 'means-5', 'measure-5', 'mastery-5',
  'mind-6', 'means-6', 'measure-6', 'mastery-6',
] as const

/** The ordered question list actually presented to the participant. */
export const ORDERED_QUESTIONS: readonly Question[] = PRESENTATION_ORDER.map(
  (id) => {
    const q = CAPABILITY_QUESTIONS.find((x) => x.id === id)
    if (!q) throw new Error(`Presentation order references unknown question: ${id}`)
    return q
  }
)

/* ─── Responsibility Demand layer ──────────────────────────────────────
   Unscored. These never alter a capability score — they only establish how
   urgently a gap is likely to matter in the participant's current life.
   ──────────────────────────────────────────────────────────────────── */

export interface DemandQuestion {
  id: string
  dimension: MKey
  label: string
  text: string
}

export const DEMAND_QUESTIONS: readonly DemandQuestion[] = [
  {
    id: 'demand-mind',
    dimension: 'mind',
    label: 'Mind demand',
    text: 'How much does your current life require you to make sound judgments, learn quickly, adapt, solve unfamiliar problems, or make consequential decisions?',
  },
  {
    id: 'demand-means',
    dimension: 'means',
    label: 'Means demand',
    text: 'How much does your current life require access to money, skills, technology, systems, relationships, reputation, or options to get important things done?',
  },
  {
    id: 'demand-measure',
    dimension: 'measure',
    label: 'Measure demand',
    text: 'How much does your current life require physical energy, resilience, composure, recovery, or useful performance under pressure?',
  },
  {
    id: 'demand-mastery',
    dimension: 'mastery',
    label: 'Mastery demand',
    text: 'How much does your current life require self-command, leadership, communication, stewardship, or responsibility for other people and outcomes?',
  },
] as const

export const DEMAND_ANCHORS = [
  { value: 1, label: 'Very little current demand' },
  { value: 5, label: 'Moderate demand' },
  { value: 8, label: 'High demand' },
  { value: 10, label: 'Extreme or near-constant demand' },
] as const
