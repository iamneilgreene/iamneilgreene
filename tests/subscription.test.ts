import { test } from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../src/app/api/profile-subscription/route'

const valid = { name: 'Synthetic Subscriber', email: 'test@example.invalid', consent: true, website: '' }
const request = (value: unknown, headers: Record<string, string> = {}) => new Request('https://example.invalid/api/profile-subscription', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(value) })

test('subscription requires explicit boolean consent and valid contact fields', async () => {
  for (const value of [null, [], {}, { ...valid, consent: false }, { ...valid, consent: 'true' }, { ...valid, consent: undefined }, { ...valid, email: 'invalid' }, { ...valid, website: 'spam' }]) {
    assert.equal((await POST(request(value))).status, 400)
  }
})

test('subscription rejects cross-origin and oversized bodies before CRM access', async () => {
  assert.equal((await POST(request(valid, { origin: 'https://other.invalid' }))).status, 403)
  assert.equal((await POST(request(valid, { 'content-type': 'text/plain' }))).status, 415)
  assert.equal((await POST(request(valid, { 'content-length': '4097' }))).status, 413)
  assert.equal((await POST(request({ ...valid, extra: 'a'.repeat(4097) }))).status, 413)
})

test('subscription configuration failure cannot return a saved receipt', async () => {
  const previous = process.env.TWENTY_CRM_API_KEY
  delete process.env.TWENTY_CRM_API_KEY
  try { assert.equal((await POST(request(valid))).status, 503) }
  finally { if (previous !== undefined) process.env.TWENTY_CRM_API_KEY = previous }
})

test('only complete mocked CRM writes confirm permission; raw answers and scores are discarded', async () => {
  const previousFetch = globalThis.fetch
  const previousBase = process.env.TWENTY_CRM_BASE_URL
  const previousKey = process.env.TWENTY_CRM_API_KEY
  process.env.TWENTY_CRM_BASE_URL = 'https://crm.example.invalid'
  process.env.TWENTY_CRM_API_KEY = 'fake-test-key'
  try {
    for (const failedStage of [-1, 0, 1, 2]) {
      const bodies: Record<string, unknown>[] = []
      globalThis.fetch = (async (_url, init) => {
        const stage = bodies.length
        bodies.push(JSON.parse(String(init?.body)))
        const operation = ['createPerson', 'createNote', 'createNoteTarget'][stage]
        return Response.json({ data: stage === failedStage ? {} : { [operation]: { id: '11111111-1111-4111-8111-111111111111' } } }, { status: 201 })
      }) as typeof fetch
      const response = await POST(request({ ...valid, scores: { mind: 3.7 }, answers: { privateAnswer: 'do-not-forward-this-answer' } }))
      const result = await response.json()
      assert.equal(response.status, failedStage === -1 ? 201 : 502)
      assert.equal(result.success, failedStage === -1 ? true : undefined)
      assert.equal(bodies.length, failedStage === -1 ? 3 : failedStage + 1)
      assert.doesNotMatch(JSON.stringify(bodies), /3\.7|do-not-forward-this-answer|privateAnswer/)
      if (failedStage === -1) {
        const note = bodies[1].bodyV2 as { markdown: string }
        assert.match(note.markdown, /Website consent submitted \(email ownership unverified\): \d{4}-\d{2}-\d{2}T/)
        assert.match(note.markdown, /Confirm ownership before sending educational updates/)
        assert.match(note.markdown, /Consent version: 2026-09-14/)
        assert.match(note.markdown, /I agree to receive educational emails/)
        assert.match(note.markdown, /no profile email or automated reminder was promised/)
      }
    }
  } finally {
    globalThis.fetch = previousFetch
    if (previousBase === undefined) delete process.env.TWENTY_CRM_BASE_URL; else process.env.TWENTY_CRM_BASE_URL = previousBase
    if (previousKey === undefined) delete process.env.TWENTY_CRM_API_KEY; else process.env.TWENTY_CRM_API_KEY = previousKey
  }
})
