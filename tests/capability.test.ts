import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildResult, dimensionScore, gapCategory, retestCalendar, type Scores } from '../src/lib/capability'

const equal = (value: number): Scores => ({ mind: value, means: value, measure: value, mastery: value })
const all = ['mind', 'means', 'measure', 'mastery']

test('equal standard scores and active demands retain every tied area', () => {
  const result = buildResult(equal(8), equal(9))
  assert.equal(result.standardMet, true)
  assert.deepEqual(result.advantages, all)
  assert.deepEqual(result.priorityCandidates, all)
  assert.deepEqual(result.largestGapDimensions, all)
})

test('equal no-gap and critical-gap cases never invent a unique priority', () => {
  for (const [score, demand] of [[8, 8], [5, 9], [2, 2]]) {
    assert.deepEqual(buildResult(equal(score), equal(demand)).priorityCandidates, all)
  }
})

test('comparison tolerance includes its decimal boundary and all near-tied areas', () => {
  const result = buildResult({ mind: 7.1, means: 7.2, measure: 7.3, mastery: 7.4 }, null)
  assert.deepEqual(result.priorityCandidates, all)
  assert.deepEqual(result.advantages, all)
})

test('near-tied active gaps remain alternatives even with different scores', () => {
  const result = buildResult({ mind: 8, means: 7.8, measure: 8, mastery: 9 }, { mind: 9.2, means: 9.2, measure: 8, mastery: 9 })
  assert.deepEqual(result.priorityCandidates, ['mind', 'means'])
  assert.deepEqual(result.largestGapDimensions, ['mind', 'means'])
})

test('a materially lower score remains a unique suggested area without averaging', () => {
  const result = buildResult({ mind: 10, means: 10, measure: 5, mastery: 10 }, null)
  assert.equal(result.standardMet, false)
  assert.deepEqual(result.priorityCandidates, ['measure'])
  assert.equal(dimensionScore([8, 8, 8, 8, 8, 8]), 8)
  assert.equal(gapCategory(9, 8), 'active')
})

test('competing urgent signals remain visible rather than collapsing unlike signals', () => {
  const result = buildResult({ mind: 3, means: 7, measure: 9, mastery: 9 }, { mind: 2, means: 10, measure: 9, mastery: 9 })
  assert.deepEqual(result.priorityCandidates, ['mind', 'means'])
})

test('calendar reminder is stable from completion, contains no answers, and rejects invalid dates', () => {
  const timestamp = '2026-09-14T12:00:00.000Z'
  const first = retestCalendar(timestamp)
  assert.ok(first)
  assert.equal(first.date.getMonth(), 10)
  assert.equal(first.date.getDate(), 28)
  assert.equal(first.calendar, retestCalendar(timestamp)?.calendar)
  assert.match(first.calendar, /DTSTART;VALUE=DATE:20261128/)
  assert.match(first.calendar, /BEGIN:VALARM/)
  assert.doesNotMatch(first.calendar, /Mind:|Means:|score|email/i)
  assert.equal(retestCalendar('invalid'), null)
})
