import { test, mock } from 'node:test'
import * as lifecycle from '../src/lib/emailLifecycle'
import * as emailDb from '../src/lib/emailDb'
mock.method(lifecycle, 'limitEmailRequest', async () => true)
mock.method(emailDb, 'isEmailDbConfigured', () => true)
import assert from 'node:assert/strict'
import nodemailer from 'nodemailer'
import { validateEmailProfile, profileEmailText, profileEmailHtml } from '../src/lib/profileEmail'
import { POST } from '../src/app/api/profile-subscription/route'

const profile = { scores: { mind: 6, means: 6, measure: 8, mastery: 9 }, demands: null, selectedPriority: null }
test('profile email rejects invalid scores and invented priorities and preserves ties', () => {
  assert.equal(validateEmailProfile({ ...profile, scores: { ...profile.scores, mind: 11 } }), null)
  assert.equal(validateEmailProfile({ ...profile, selectedPriority: 'mastery' }), null)
  const validated = validateEmailProfile(profile)!
  assert.ok(validated)
  const body = profileEmailText('Test', validated)
  assert.match(body, /do not establish one clear priority/)
  assert.doesNotMatch(body, /Your 30-day starting plan:/)
  assert.match(body, /No automatic reminder/)
})
test('profile copy does not require marketing consent; SMTP rejection cannot claim success', async () => {
  const previous = nodemailer.createTransport
  const env = { ...process.env }
  Object.assign(process.env, { SMTP_HOST: 'smtp.example.invalid', SMTP_USER: 'sender@example.invalid', SMTP_PASSWORD: 'test-only', MAIL_FROM: 'sender@example.invalid' })
  delete process.env.TWENTY_CRM_API_KEY
  try {
    for (const accepted of [true, false]) {
      const recipient = accepted ? 'test@example.invalid' : 'rejected@example.invalid'
      let message: Record<string, unknown> | undefined
      nodemailer.createTransport = (() => ({ close() {}, async sendMail(input: Record<string, unknown>) { message = input; return { accepted: accepted ? ['test@example.invalid'] : [], rejected: accepted ? [] : ['test@example.invalid'] } } })) as unknown as typeof previous
      const response = await POST(new Request('https://example.invalid/api/profile-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Test', email: recipient, consent: false, website: '', profile, answers: 'private-do-not-send' }) }))
      assert.equal(response.status, accepted ? 201 : 502)
      const result = await response.json()
      assert.equal(result.email, accepted ? 'accepted' : undefined)
      assert.doesNotMatch(String(message?.text), /private-do-not-send/)
      assert.match(String(message?.html), /<!doctype html>/)
      assert.doesNotMatch(String(message?.html), /private-do-not-send/)
      assert.deepEqual(message?.to, { address: recipient, name: '' })
    }
  } finally { nodemailer.createTransport = previous; process.env = env }
})


test('HTML email escapes personal text and includes the selected plan without em dashes', () => {
  const selected = { ...profile, selectedPriority: 'mind' as const }
  const html = profileEmailHtml('<img src=x onerror=alert(1)> & Test', selected)
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt; &amp; Test/)
  assert.doesNotMatch(html, /<img|<script|—/)
  assert.match(html, /Your 30-day plan: Mind/)
  assert.match(html, /<caption[^>]*>Your scores<\/caption>/)
  assert.match(html, /No automatic reminder has been scheduled/)
  assert.doesNotMatch(profileEmailText('Test', selected), /—/)
  assert.match(profileEmailHtml('Test', profile), /Choose where to begin/)
})
