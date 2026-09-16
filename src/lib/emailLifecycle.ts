import { randomUUID } from 'node:crypto'
import { emailDb } from './emailDb'
import { emailPreferenceUrl, hashEmailToken, managementId, managementToken, newEmailToken, privateRateKey } from './emailTokens'

export const EMAIL_CONSENT_VERSION = '2026-09-16'
export async function limitEmailRequest(request: Request, email: string, purpose: 'profile' | 'contact') {
  // Vercel overwrites this header. Do not trust arbitrary forwarding headers.
  const ip = process.env.VERCEL ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'local'
  const now = Date.now()
  const limits: [string, number, number][] = [
    [`${purpose}:email:${email.toLowerCase()}`, 60, 1],
    [`${purpose}:recipient-day:${email.toLowerCase()}`, 86400, 3],
    [`${purpose}:ip:${ip}`, 3600, 10],
    [`${purpose}:global-hour`, 3600, 50],
    [`${purpose}:global-day`, 86400, 200],
  ]
  return emailDb().begin(async sql => {
    // Stable lock order prevents deadlocks under simultaneous requests.
    for (const [label, seconds, maximum] of limits.sort((a, b) => a[0].localeCompare(b[0]))) {
      const key = privateRateKey(`${label}:${Math.floor(now / (seconds * 1000))}`)
      const [row] = await sql`insert into ng_email_rate_limits(key,count,expires_at) values (${key},1,${new Date(now + seconds * 2000)}) on conflict(key) do update set count = ng_email_rate_limits.count + 1 returning count`
      if (row.count > maximum) return false
    }
    return true
  })
}

export async function requestEmailPreferences(input: { name: string; email: string; reminder: boolean; marketing: boolean }) {
  const token = newEmailToken()
  const contact = await emailDb().begin(async sql => {
    const [contact] = await sql`insert into ng_email_contacts(email,name) values (${input.email.toLowerCase()},${input.name}) on conflict(email) do update set email = excluded.email returning id`
    // A later unauthenticated request cannot revoke an earlier valid link.
    await sql`insert into ng_email_requests(contact_id,token_hash,name,reminder_requested,marketing_requested) values (${contact.id},${hashEmailToken(token)},${input.name},${input.reminder},${input.marketing})`
    return contact
  })
  return { verificationUrl: emailPreferenceUrl('verify', token), managementUrl: emailPreferenceUrl('manage', managementToken(contact.id)), reminderRequested: input.reminder, marketingRequested: input.marketing }
}

export async function inspectEmailPreferences(kind: 'verify' | 'manage', token: string) {
  const sql = emailDb()
  if (kind === 'verify') {
    const [request] = await sql`select reminder_requested,marketing_requested,confirmed_at,expires_at,revoked_at,due_at from ng_email_requests where token_hash=${hashEmailToken(token)}`
    if (!request || request.revoked_at || new Date(request.expires_at).getTime() <= Date.now()) return null
    return { kind, confirmed: Boolean(request.confirmed_at), reminder: request.reminder_requested, marketing: request.marketing_requested, dueAt: request.due_at }
  }
  const id = managementId(token)
  if (!id) return null
  const [contact] = await sql`select marketing_opt_in,verified_at from ng_email_contacts where id=${id}`
  if (!contact) return null
  const [reminder] = await sql`select due_at,status from ng_email_reminders where contact_id=${id} and status in ('pending','processing') order by due_at limit 1`
  return { kind, verified: Boolean(contact.verified_at), marketing: contact.marketing_opt_in, reminder: Boolean(reminder), dueAt: reminder?.due_at ?? null }
}

export async function confirmEmailPreferences(token: string) {
  return emailDb().begin(async sql => {
    // Lock contact before request/reminder everywhere to serialize preference changes.
    const [lookup] = await sql`select contact_id from ng_email_requests where token_hash=${hashEmailToken(token)}`
    if (!lookup) return null
    const [contact] = await sql`select id from ng_email_contacts where id=${lookup.contact_id} for update`
    const [request] = await sql`select * from ng_email_requests where token_hash=${hashEmailToken(token)} for update`
    if (!contact || !request || request.revoked_at || new Date(request.expires_at).getTime() <= Date.now()) return null
    if (request.confirmed_at) return { confirmed: true }
    const version = randomUUID()
    await sql`update ng_email_contacts set name=${request.name}, verified_at=coalesce(verified_at,now()), marketing_opt_in=marketing_opt_in or ${request.marketing_requested}, consent_version=${EMAIL_CONSENT_VERSION}, preference_version=${version},updated_at=now() where id=${contact.id}`
    if (request.reminder_requested) {
      await sql`update ng_email_reminders set status='cancelled' where contact_id=${contact.id} and status in ('pending','processing')`
      await sql`insert into ng_email_reminders(contact_id,request_id,due_at) values (${contact.id},${request.id},${request.due_at})`
    }
    await sql`update ng_email_requests set confirmed_at=now() where id=${request.id}`
    return { confirmed: true }
  })
}

export async function reduceEmailPreferences(token: string, action: 'cancel-reminder' | 'unsubscribe' | 'stop-all') {
  const id = managementId(token)
  if (!id) return false
  return emailDb().begin(async sql => {
    const [contact] = await sql`select id from ng_email_contacts where id=${id} for update`
    if (!contact) return false
    if (action !== 'unsubscribe') await sql`update ng_email_reminders set status='cancelled' where contact_id=${id} and status in ('pending','processing')`
    if (action !== 'cancel-reminder') await sql`update ng_email_contacts set marketing_opt_in=false,preference_version=${randomUUID()},updated_at=now() where id=${id}`
    // Old confirmation links cannot undo a withdrawal. Rejoining requires a fresh request.
    await sql`update ng_email_requests set revoked_at=now() where contact_id=${id} and revoked_at is null`
    return true
  })
}
