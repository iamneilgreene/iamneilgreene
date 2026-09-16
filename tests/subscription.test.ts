import { test, mock } from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../src/app/api/profile-subscription/route'
import * as db from '../src/lib/emailDb'
import * as lifecycle from '../src/lib/emailLifecycle'
import * as mail from '../src/lib/mail'
const valid = { name: 'Synthetic Subscriber', email: 'test@example.invalid', consent: true, reminder: true, website: '', profile: { scores: {mind:6,means:7,measure:8,mastery:9},demands:null,selectedPriority:'mind' } }
const request = (value: unknown, headers: Record<string, string> = {}) => new Request('https://example.invalid/api/profile-subscription', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(value) })
test('profile request rejects malformed choices and address lists', async () => {
  for (const value of [null, [], {}, {...valid,consent:'true'}, {...valid,reminder:1}, {...valid,email:'a@b.com,c@d.com'}, {...valid,website:'spam'}, {...valid,profile:null}]) assert.equal((await POST(request(value))).status,400)
})
test('rejects cross-origin and oversized bodies before mail or database writes', async () => {
  assert.equal((await POST(request(valid,{origin:'https://other.invalid'}))).status,403)
  assert.equal((await POST(request(valid,{'content-type':'text/plain'}))).status,415)
  assert.equal((await POST(request(valid,{'content-length':'4097'}))).status,413)
  assert.equal((await POST(request({...valid,extra:'a'.repeat(4097)}))).status,413)
})
test('database failure fails closed before mailing; optional choices only create a pending confirmation', async () => {
  const configured=mock.method(db,'isEmailDbConfigured',()=>true)
  const ready=mock.method(mail,'isMailConfigured',()=>true)
  const limit=mock.method(lifecycle,'limitEmailRequest',async()=>false)
  const send=mock.method(mail,'sendWebsiteMail',async()=>({accepted:true as const}))
  const pending=mock.method(lifecycle,'requestEmailPreferences',async()=>({verificationUrl:'https://example.invalid/#verify=token',managementUrl:'https://example.invalid/#manage=token',reminderRequested:true,marketingRequested:true}))
  try {
    assert.equal((await POST(request(valid))).status,429)
    assert.equal(send.mock.callCount(),0)
    limit.mock.mockImplementation(async()=>true)
    const response=await POST(request(valid))
    assert.equal(response.status,201)
    assert.equal((await response.json()).confirmationRequired,true)
    assert.equal(pending.mock.callCount(),1)
    assert.match(send.mock.calls[0].arguments[0].html!,/Confirm email and choices/)
    configured.mock.mockImplementation(()=>false)
    assert.equal((await POST(request(valid))).status,503)
    assert.equal(send.mock.callCount(),1)
  } finally { configured.mock.restore();ready.mock.restore();limit.mock.restore();send.mock.restore();pending.mock.restore() }
})
