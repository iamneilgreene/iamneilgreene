import { emailDb } from './emailDb'
import { sendWebsiteMail } from './mail'
import { reminderEmail } from './reminderEmail'
import { syncEmailPreferenceInCrm, isCrmConfigured } from './crm'

export async function runEmailJobs() {
  const sql = emailDb()
  const deadline = Date.now() + 240_000
  // SMTP has no idempotency API. A crashed or ambiguous attempt is held for
  // operator review, never automatically sent twice.
  const stale = await sql`update ng_email_reminders set status='uncertain' where status='processing' and claimed_at < now() - interval '15 minutes' returning id`
  let accepted = 0; let uncertain = stale.length; let cancelled = 0
  for (let i = 0; i < 200 && Date.now() < deadline; i++) {
    const [job] = await sql`update ng_email_reminders set status='processing',claimed_at=now() where id=(select id from ng_email_reminders where status='pending' and due_at <= now() order by due_at for update skip locked limit 1) returning id,contact_id`
    if (!job) break
    try {
      const outcome = await sql.begin(async tx => {
        const [contact] = await tx`select id,email,name,verified_at from ng_email_contacts where id=${job.contact_id} for update`
        const [reminder] = await tx`select status from ng_email_reminders where id=${job.id} for update`
        if (!contact?.verified_at || reminder?.status !== 'processing') {
          await tx`update ng_email_reminders set status='cancelled' where id=${job.id} and status='processing'`
          return 'cancelled'
        }
        // Withdrawal and dispatch serialize on the contact row. Once SMTP accepts
        // a message it cannot be recalled; the preference page states this.
        try {
          await sendWebsiteMail({ to: contact.email, subject: 'Your 75-day capability check-in', ...reminderEmail(contact.name, contact.id) })
          await tx`update ng_email_reminders set status='accepted',accepted_at=now() where id=${job.id}`
          return 'accepted'
        } catch {
          await tx`update ng_email_reminders set status='uncertain' where id=${job.id}`
          return 'uncertain'
        }
      })
      if (outcome === 'accepted') accepted++
      else if (outcome === 'cancelled') cancelled++
      else uncertain++
    } catch { uncertain++; /* The durable processing marker will be held next run. */ }
  }
  let crmSynced = 0
  if (isCrmConfigured()) {
    const contacts = await sql`select id from ng_email_contacts where verified_at is not null and not crm_sync_uncertain and preference_version is distinct from crm_synced_version order by updated_at limit 200`
    for (const candidate of contacts) {
      if (Date.now() >= deadline) break
      const [claimed] = await sql`update ng_email_contacts set crm_sync_uncertain=true where id=${candidate.id} and not crm_sync_uncertain and preference_version is distinct from crm_synced_version returning id`
      if (!claimed) continue
      await sql.begin(async tx => {
        const [contact] = await tx`select * from ng_email_contacts where id=${candidate.id} for update`
        if (!contact) return
        try {
          await syncEmailPreferenceInCrm({ ...contact, crm_person_id: contact.crm_person_id, crm_note_id: contact.crm_note_id, crm_target_id: contact.crm_target_id, name: contact.name, email: contact.email, markdown: `Email ownership verified through a deliberate confirmation.\nEducational emails: ${contact.marketing_opt_in ? 'OPTED IN' : 'NOT SUBSCRIBED / WITHDRAWN'}.\nConsent version: ${contact.consent_version}.\nPreference version: ${contact.preference_version}.\nThe website email-preferences database is authoritative. Re-check its current state before any campaign. No assessment answers or scores are stored here.` }, async ids => {
            await tx`update ng_email_contacts set crm_person_id=${ids.crm_person_id},crm_note_id=${ids.crm_note_id},crm_target_id=${ids.crm_target_id} where id=${contact.id}`
          })
          await tx`update ng_email_contacts set crm_synced_version=${contact.preference_version},crm_sync_uncertain=false where id=${contact.id}`
          crmSynced++
        } catch {
          await tx`update ng_email_contacts set crm_sync_uncertain=true where id=${contact.id}`
          console.error('email_preferences_crm_sync_requires_review')
        }
      })
    }
  }
  await sql`delete from ng_email_rate_limits where expires_at < now()`
  await sql`delete from ng_email_requests where confirmed_at is null and expires_at < now() - interval '7 days'`
  await sql`delete from ng_email_contacts c where verified_at is null and created_at < now() - interval '9 days' and not exists(select 1 from ng_email_requests r where r.contact_id=c.id)`
  if (uncertain) console.error('email_reminders_require_delivery_review', { count: uncertain })
  const [backlog] = await sql`select count(*)::int as count from ng_email_reminders where status='pending' and due_at<=now()`
  if (backlog.count) console.warn('email_jobs_backlog', { count: backlog.count })
  return { accepted, cancelled, uncertain, crmSynced, remaining: backlog.count }
}
