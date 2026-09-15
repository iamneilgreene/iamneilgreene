import { ORDERED_QUESTIONS, DEMAND_QUESTIONS } from '../../lib/questions'
import { RESPONSE_CHOICES } from '../../lib/capability'

export type Stage = 'instruction' | 'questions' | 'demand' | 'generating' | 'result'
export interface SavedAssessment {
  answers: Record<string, number>
  demands: Record<string, number>
  index: number
  stage: Stage
  completedAt?: string
}

/** Treat browser storage as untrusted; resume only from valid, complete prefixes. */
export function restoreAssessment(raw: unknown): SavedAssessment {
  const empty: SavedAssessment = { answers: {}, demands: {}, index: 0, stage: 'instruction' }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return empty
  const saved = raw as Record<string, unknown>
  const clean = (value: unknown, ids: string[], valid: (n: number) => boolean) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
    const record = value as Record<string, unknown>
    return Object.fromEntries(ids.flatMap(id => typeof record[id] === 'number' && valid(record[id]) ? [[id, record[id]]] : [])) as Record<string, number>
  }
  const answers = clean(saved.answers, ORDERED_QUESTIONS.map(q => q.id), n => RESPONSE_CHOICES.some(c => c.value === n))
  const demands = clean(saved.demands, DEMAND_QUESTIONS.map(q => q.id), n => Number.isInteger(n) && n >= 1 && n <= 10)
  const missingAnswer = ORDERED_QUESTIONS.findIndex(q => answers[q.id] === undefined)
  const missingDemand = DEMAND_QUESTIONS.findIndex(q => demands[q.id] === undefined)
  const index = typeof saved.index === 'number' && Number.isInteger(saved.index) ? saved.index : -1
  const completedAt = typeof saved.completedAt === 'string' && Number.isFinite(Date.parse(saved.completedAt)) && Date.parse(saved.completedAt) <= Date.now()
    ? new Date(saved.completedAt).toISOString() : undefined
  if (missingAnswer !== -1) {
    const resume = saved.stage === 'questions' && index >= 0 && index <= missingAnswer ? index : missingAnswer
    return { answers, demands, stage: Object.keys(answers).length || saved.stage !== 'instruction' ? 'questions' : 'instruction', index: resume }
  }
  if (saved.stage === 'questions' && index >= 0 && index < ORDERED_QUESTIONS.length) return { answers, demands, stage: 'questions', index }
  if (missingDemand !== -1) return { answers, demands, stage: 'demand', index: index >= 0 && index <= missingDemand && saved.stage === 'demand' ? index : missingDemand }
  if (saved.stage === 'demand' && index >= 0 && index < DEMAND_QUESTIONS.length) return { answers, demands, stage: 'demand', index }
  return { answers, demands, stage: 'result', index: 0, completedAt }
}
