import { test } from 'node:test'
import assert from 'node:assert/strict'
import nodemailer from 'nodemailer'
import { validateEmailProfile, profileEmailText } from '../src/lib/profileEmail'
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
      assert.deepEqual(message?.to, { address: recipient, name: '' })
    }
  } finally { nodemailer.createTransport = previous; process.env = env }
})
