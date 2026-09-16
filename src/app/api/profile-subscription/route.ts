import { validateContact } from '../../../lib/crm'

import { limitEmailRequest, requestEmailPreferences } from '../../../lib/emailLifecycle'
import { isEmailDbConfigured } from '../../../lib/emailDb'
import { isMailConfigured, sendWebsiteMail } from '../../../lib/mail'
import { validateEmailProfile, profileEmailText, profileEmailHtml } from '../../../lib/profileEmail'

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
  const contact = validateContact({ name: value.name, email: value.email, reason: 'other', message: 'Profile email request' })
  const profile = validateEmailProfile(value.profile)
  if (!profile || !contact || (value.consent !== undefined && typeof value.consent !== 'boolean') || (value.reminder !== undefined && typeof value.reminder !== 'boolean') || (value.website !== undefined && value.website !== '')) return reply({ error: 'Enter a valid name and email, then request a copy from your completed profile.' }, 400)
  if (!isMailConfigured() || !isEmailDbConfigured()) return reply({ error: 'Profile email is temporarily unavailable. You can still save your profile in your browser.' }, 503)
  try {
    if (!await limitEmailRequest(request, contact.email, 'profile')) return reply({ error: 'Please wait before requesting another profile email. If you have tried several times today, use the saved copy or contact us.' }, 429)
    const preferences = value.reminder === true || value.consent === true
      ? await requestEmailPreferences({ name: contact.name, email: contact.email, reminder: value.reminder === true, marketing: value.consent === true }) : undefined
    await sendWebsiteMail({ to: contact.email, subject: 'Your Four M Capability Profile', text: profileEmailText(contact.name, profile, preferences), html: profileEmailHtml(contact.name, profile, preferences) })
    return reply({ success: true, email: 'accepted', confirmationRequired: Boolean(preferences) }, 201)
  } catch { return reply({ error: 'We could not confirm your profile email was accepted. You can save a copy in your browser or try again later.' }, 502) }

}

function sameHost(origin: string, host: string): boolean {
  try {
    const url = new URL(origin)
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.host === host
  } catch { return false }
}
