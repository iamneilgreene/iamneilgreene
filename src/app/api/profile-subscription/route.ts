import { isCrmConfigured, savePersonWithNote, validateContact } from '../../../lib/crm'

export const runtime = 'nodejs'
export const maxDuration = 30
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
  if (!contact || value.consent !== true || (value.website !== undefined && value.website !== '')) return reply({ error: 'Enter your name and email, and check the permission box to subscribe.' }, 400)
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
