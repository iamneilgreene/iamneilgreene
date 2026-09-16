import { isCrmConfigured, savePersonWithNote, validateContact } from '../../../lib/crm'

import { claimProfileEmail } from '../../../lib/emailThrottle'
import { isMailConfigured, sendWebsiteMail } from '../../../lib/mail'
import { validateEmailProfile, profileEmailText } from '../../../lib/profileEmail'

export const runtime = 'nodejs'
export const maxDuration = 60
const reply = (body: Record<string, unknown>, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({ error: 'Please submit the subscription form as JSON.' }, 415)
  const origin = request.headers.get('origin')
  if (origin && !sameHost(origin, request.headers.get('host') ?? new URL(request.url).host)) return reply({ error: 'Please submit from this website.' }, 403)
  if (Number(request.headers.get('content-length')) > 4096) return reply({ error: 'The request is too large.' }, 413)
  let value: Record<string, unknown>
  try {
    const reader = request.body?.getReader()
    if (!reader) return reply({ error: 'Please complete the subscription form.' }, 400)
    const decoder = new TextDecoder('utf-8', { fatal: true })
    let text = ''
    let bytes = 0
    while (true) {
      const { value: chunk, done } = await reader.read()
      if (done) break
      bytes += chunk.byteLength
      if (bytes > 4096) { await reader.cancel(); return reply({ error: 'The request is too large.' }, 413) }
      text += decoder.decode(chunk, { stream: true })
    }
    text += decoder.decode()
    value = JSON.parse(text)
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid request')
  } catch { return reply({ error: 'The request could not be read. Please try again.' }, 400) }
  const contact = validateContact({ name: value.name, email: value.email, reason: 'other', message: 'Profile subscription' })
  const profile = value.profile === undefined ? null : validateEmailProfile(value.profile)
  if (value.profile !== undefined && !profile) return reply({ error: 'Your profile could not be read. Please reload your results.' }, 400)
  if (!contact || (!profile && value.consent !== true) || (value.consent !== undefined && typeof value.consent !== 'boolean') || (value.website !== undefined && value.website !== '')) return reply({ error: profile ? 'Enter a valid name and email to request your profile.' : 'Enter your name and email, and check the permission box to subscribe.' }, 400)
  if (profile) {
    if (!isMailConfigured()) return reply({ error: 'Profile email is temporarily unavailable. You can still save your profile in your browser.' }, 503)
    if (!claimProfileEmail(contact.email)) return reply({ error: 'Please wait a minute before requesting another profile email.' }, 429)
    try {
      await sendWebsiteMail({ to: contact.email, subject: 'Your Four M Capability Profile', text: profileEmailText(contact.name, profile) })
    } catch { return reply({ error: 'We could not confirm your profile email was accepted. You can save a copy in your browser or try again later.' }, 502) }
    let consentSaved = false
    if (value.consent === true) {
      try {
        await savePersonWithNote({ name: contact.name, email: contact.email, noteTitle: 'Website: educational email permission', noteMarkdown: `Website consent submitted (email ownership unverified): ${new Date().toISOString()}\nSource: requested profile email\nConsent version: 2026-09-14\nText: I agree to receive educational emails from Neil Greene. I can withdraw permission through the contact page.\nConfirm ownership before sending educational updates.\nAssessment answers and scores were not collected.` })
        consentSaved = true
      } catch { /* A consent failure must not cause a duplicate profile email. */ }
    }
    return reply({ success: true, email: 'accepted', consentSaved }, 201)
  }
  if (!isCrmConfigured()) return reply({ error: 'Subscriptions are temporarily unavailable. Your profile is still available; please try later.' }, 503)
  try {
    await savePersonWithNote({
      name: contact.name, email: contact.email,
      noteTitle: 'Website: educational email permission',
      noteMarkdown: `Website consent submitted (email ownership unverified): ${new Date().toISOString()}\nSource: Four M Capability Profile\nConsent version: 2026-09-14\nEmail ownership has not been confirmed. Confirm ownership before sending educational updates.\nText: I agree to receive educational emails from Neil Greene. I can withdraw permission through the contact page.\nAssessment answers and scores were not collected.\nThis is permission for future updates; no profile email or automated reminder was promised.`,
    })
    return reply({ success: true }, 201)
  } catch { return reply({ error: 'We could not confirm your permission was fully saved. Please try again later. Your profile is still available.' }, 502) }
}

function sameHost(origin: string, host: string): boolean {
  try {
    const url = new URL(origin)
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.host === host
  } catch { return false }
}
