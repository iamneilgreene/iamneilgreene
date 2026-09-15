import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createPersonWithNote, savePersonWithNote, validateContact } from '../src/lib/crm'

const inquiry = { name: 'Test Person', email: 'test@example.invalid', reason: 'organization', message: 'Synthetic unit-test message. Never sent.' }
const ids = ['11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '33333333-3333-4333-8333-333333333333']
const operations = ['createPerson', 'createNote', 'createNoteTarget']

test('validates required types, allowed reasons, limits, control characters and email', () => {
  assert.deepEqual(validateContact(inquiry), inquiry)
  for (const bad of [null, [], {}, { ...inquiry, name: ' ' }, { ...inquiry, email: 'bad' }, { ...inquiry, reason: 'unknown' }, { ...inquiry, message: 'a'.repeat(4001) }, { ...inquiry, name: 'a\nb' }, { ...inquiry, message: '\u0000text' }, { ...inquiry, email: ['test@example.invalid'] }]) {
    assert.equal(validateContact(bad), null)
  }
  assert.ok(validateContact({ ...inquiry, message: 'a'.repeat(4000) }))
})

test('receipt requires all three schema-confirmed creates and relation uses targetPersonId', async () => {
  const calls: { url: string; body: Record<string, unknown> }[] = []
  const fetchImpl = (async (url, init) => {
    const index = calls.length
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)) })
    assert.ok(init?.signal)
    assert.equal(init?.redirect, 'error')
    return Response.json({ data: { [operations[index]]: { id: ids[index] } } }, { status: 201 })
  }) as typeof fetch
  const result = await createPersonWithNote(inquiry, { baseUrl: 'https://crm.example.invalid', apiKey: 'fake', fetchImpl })
  assert.deepEqual(result, { personId: ids[0], noteId: ids[1], targetId: ids[2] })
  assert.deepEqual(calls[2].body, { noteId: ids[1], targetPersonId: ids[0] })
  assert.match(String(calls[1].body.title), /organization/)
})

test('missing response IDs never produce success, including a failed final link', async () => {
  for (let broken = 0; broken < 3; broken++) {
    let count = 0
    const fetchImpl = (async () => {
      const index = count++
      return Response.json(index === broken ? { data: {} } : { data: { [operations[index]]: { id: ids[index] } } })
    }) as typeof fetch
    await assert.rejects(createPersonWithNote(inquiry, { baseUrl: 'https://crm.example.invalid', apiKey: 'fake', fetchImpl }), /save not confirmed/)
    assert.equal(count, broken + 1)
  }
})

test('upstream failures do not leak private response bodies or continue writes', async () => {
  let count = 0
  const fetchImpl = (async () => { count++; return new Response('private error payload', { status: 500 }) }) as typeof fetch
  await assert.rejects(createPersonWithNote(inquiry, { baseUrl: 'https://crm.example.invalid', apiKey: 'fake', fetchImpl }), (error: Error) => !error.message.includes('private') && /not confirmed/.test(error.message))
  assert.equal(count, 1)
})

test('timeout and malformed JSON fail without a false receipt', async () => {
  for (const fetchImpl of [
    (async () => { throw new DOMException('Aborted', 'TimeoutError') }) as typeof fetch,
    (async () => new Response('not json', { status: 201 })) as typeof fetch,
  ]) await assert.rejects(createPersonWithNote(inquiry, { baseUrl: 'https://crm.example.invalid', apiKey: 'fake', fetchImpl }))
})

test('neutral note helper preserves consent text without relabeling it as an inquiry', async () => {
  let count = 0
  let note: Record<string, unknown> | undefined
  const fetchImpl = (async (_url, init) => {
    const index = count++
    if (index === 1) note = JSON.parse(String(init?.body))
    return Response.json({ data: { [operations[index]]: { id: ids[index] } } }, { status: 201 })
  }) as typeof fetch
  await savePersonWithNote({ name: 'Test', email: inquiry.email, noteTitle: 'Educational email consent', noteMarkdown: 'Explicit consent v1, synthetic timestamp' }, { baseUrl: 'https://crm.example.invalid', apiKey: 'fake', fetchImpl })
  assert.equal(note?.title, 'Educational email consent')
  assert.equal((note?.bodyV2 as { markdown: string }).markdown, 'Explicit consent v1, synthetic timestamp')
})
