import { createPersonWithNote, isCrmConfigured, validateContact } from '../../../lib/crm'

import { limitEmailRequest } from '../../../lib/emailLifecycle'
import { sendWebsiteMail } from '../../../lib/mail'

export const runtime = 'nodejs'
export const maxDuration = 60
const MAX_BODY_BYTES = 16_384
const json = (body: Record<string, unknown>, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Please submit the contact form as JSON.' }, 415)
  }
  const origin = request.headers.get('origin')
  if (origin && !sameHost(origin, request.headers.get('host') ?? new URL(request.url).host)) return json({ error: 'Please submit from this website.' }, 403)
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) return json({ error: 'Your message is too large. Please shorten it.' }, 413)

  let value: unknown
  try {
    const reader = request.body?.getReader()
    if (!reader) return json({ error: 'Please complete the contact form.' }, 400)
    const chunks: Uint8Array[] = []
    let total = 0
    while (true) {
      const { value: chunk, done } = await reader.read()
      if (done) break
      total += chunk.byteLength
      if (total > MAX_BODY_BYTES) {
        await reader.cancel()
        return json({ error: 'Your message is too large. Please shorten it.' }, 413)
      }
      chunks.push(chunk)
    }
    const body = new Uint8Array(total)
    let offset = 0
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
    value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body))
  } catch {
    return json({ error: 'The request could not be read. Please try again.' }, 400)
  }
  const inquiry = validateContact(value)
  if (!inquiry) return json({ error: 'Check your name, email, reason, and message. Messages can contain up to 4,000 characters.' }, 400)
  if (!isCrmConfigured()) return json({ error: 'The inquiry service is unavailable. Your text is still here; please use the email link below.' }, 503)
  try {
    if (!await limitEmailRequest(request, inquiry.email, 'contact')) return json({ error: 'Please wait before sending another inquiry. You can also use the email link below.' }, 429)
    await createPersonWithNote(inquiry)
    let notification = 'unconfirmed'
    try {
      if (process.env.CONTACT_NOTIFY_TO) {
        await sendWebsiteMail({ to: process.env.CONTACT_NOTIFY_TO, replyTo: inquiry.email, subject: `Website inquiry: ${inquiry.reason}`, text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nReason: ${inquiry.reason}\n\n${inquiry.message}` })
        notification = 'accepted'
      }
    } catch { /* The inquiry is saved; do not ask visitors to create a duplicate. */ }
    return json({ success: true, receipt: 'saved', notification }, 201)
  } catch {
    // An upstream timeout can occur after a partial save. Never claim non-delivery
    // or expose private request data, credentials, or the CRM's error body.
    return json({ error: 'We could not confirm your inquiry was fully saved. Your text is still here. Please use the email link below and mention this error.' }, 502)
  }
}

function sameHost(origin: string, host: string): boolean {
  try {
    const url = new URL(origin)
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.host === host
  } catch { return false }
}
