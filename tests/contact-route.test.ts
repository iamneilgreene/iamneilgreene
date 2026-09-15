import { test } from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../src/app/api/contact/route'

const payload = { name: 'Synthetic Test', email: 'test@example.invalid', reason: 'other', message: 'Local test only.' }
const request = (body: string, headers: Record<string, string> = {}) => new Request('https://example.invalid/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body })

test('rejects media, origin, malformed JSON, and invalid fields before CRM access', async () => {
  const cases: [Request, number][] = [
    [request('{}', { 'content-type': 'text/plain' }), 415],
    [request('{}', { origin: 'https://other.invalid' }), 403],
    [request('{'), 400],
    [request(JSON.stringify({ ...payload, message: ' ' })), 400],
  ]
  for (const [req, code] of cases) assert.equal((await POST(req)).status, code)
})

test('enforces body limit with and without a supplied content length', async () => {
  assert.equal((await POST(request('{}', { 'content-length': '20000' }))).status, 413)
  assert.equal((await POST(request(' '.repeat(16385)))).status, 413)
})

test('CRM unavailable is an explicit failure, never a receipt', async () => {
  const previous = process.env.TWENTY_CRM_API_KEY
  delete process.env.TWENTY_CRM_API_KEY
  try { assert.equal((await POST(request(JSON.stringify(payload)))).status, 503) }
  finally { if (previous !== undefined) process.env.TWENTY_CRM_API_KEY = previous }
})

test('route confirms only complete mocked saves and safely reports an incomplete final link', async () => {
  const oldFetch = globalThis.fetch
  const oldBase = process.env.TWENTY_CRM_BASE_URL
  const oldKey = process.env.TWENTY_CRM_API_KEY
  process.env.TWENTY_CRM_BASE_URL = 'https://crm.example.invalid'
  process.env.TWENTY_CRM_API_KEY = 'fake-test-key'
  try {
    for (const complete of [true, false]) {
      let count = 0
      globalThis.fetch = (async () => {
        const operation = ['createPerson', 'createNote', 'createNoteTarget'][count++]
        return Response.json({ data: count === 3 && !complete ? {} : { [operation]: { id: '11111111-1111-4111-8111-111111111111' } } }, { status: 201 })
      }) as typeof fetch
      const response = await POST(request(JSON.stringify(payload)))
      assert.equal(response.status, complete ? 201 : 502)
      const body = await response.json()
      assert.equal(body.success, complete ? true : undefined)
      assert.equal(response.headers.get('cache-control'), 'no-store')
    }
  } finally {
    globalThis.fetch = oldFetch
    if (oldBase === undefined) delete process.env.TWENTY_CRM_BASE_URL; else process.env.TWENTY_CRM_BASE_URL = oldBase
    if (oldKey === undefined) delete process.env.TWENTY_CRM_API_KEY; else process.env.TWENTY_CRM_API_KEY = oldKey
  }
})


test('accepts the public Host when the framework uses an internal request URL', async () => {
  const req = new Request('http://localhost:3102/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', host: '127.0.0.1:3102', origin: 'http://127.0.0.1:3102' }, body: '{}',
  })
  assert.equal((await POST(req)).status, 400)
  assert.equal((await POST(request('{}', { origin: 'not-a-url' }))).status, 403)
})
