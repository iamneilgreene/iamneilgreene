/** Server-side only. Never expose the CRM credential or upstream response bodies. */
export type ContactInquiry = { name: string; email: string; reason: string; message: string }
export const CONTACT_REASONS = ['speaking', 'organization', 'individual', 'community', 'media', 'other'] as const

export function validateContact(value: unknown): ContactInquiry | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const fields = value as Record<string, unknown>
  const limits = { name: 120, email: 254, reason: 32, message: 4000 }
  for (const [key, maximum] of Object.entries(limits)) {
    const field = fields[key]
    if (typeof field !== 'string' || !field.trim() || field.length > maximum || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(field)) return null
  }
  const inquiry = Object.fromEntries(Object.keys(limits).map((key) => [key, (fields[key] as string).trim()])) as ContactInquiry
  if (/[<>,;\r\n]/.test(inquiry.email) || /[\r\n]/.test(inquiry.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return null
  if (!CONTACT_REASONS.some((reason) => reason === inquiry.reason)) return null
  return inquiry
}

export function isCrmConfigured() {
  return Boolean(process.env.TWENTY_CRM_BASE_URL && process.env.TWENTY_CRM_API_KEY)
}

export type CrmOptions = { baseUrl: string; apiKey: string; fetchImpl?: typeof fetch }

export type PersonNote = { name: string; email: string; noteTitle: string; noteMarkdown: string }

/** Shared durable write for validated server-side inputs (contact or explicit consent). */
export async function savePersonWithNote(input: PersonNote, options?: CrmOptions) {
  const baseUrl = options?.baseUrl ?? process.env.TWENTY_CRM_BASE_URL
  const apiKey = options?.apiKey ?? process.env.TWENTY_CRM_API_KEY
  if (!baseUrl || !apiKey) throw new Error('CRM unavailable')
  const fetchImpl = options?.fetchImpl ?? fetch
  const endpoint = new URL(baseUrl)
  if (endpoint.protocol !== 'https:') throw new Error('CRM unavailable')

  const create = async (path: string, operation: string, body: Record<string, unknown>): Promise<string> => {
    const response = await fetchImpl(`${baseUrl.replace(/\/$/, '')}/rest/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
      redirect: 'error',
    })
    if (!response.ok) throw new Error('CRM save not confirmed')
    const payload = await response.json()
    const id = payload?.data?.[operation]?.id
    if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw new Error('CRM save not confirmed')
    return id
  }

  // Keep the supplied name intact; do not guess culturally dependent name parts.
  const personId = await create('people', 'createPerson', {
    name: { firstName: input.name, lastName: '' },
    emails: { primaryEmail: input.email },
  })
  const noteText = input.noteMarkdown
  const noteId = await create('notes', 'createNote', {
    title: input.noteTitle,
    bodyV2: {
      markdown: noteText,
      blocknote: JSON.stringify([{ id: crypto.randomUUID(), type: 'paragraph', props: {}, content: [{ type: 'text', text: noteText, styles: {} }], children: [] }]),
    },
  })
  const targetId = await create('noteTargets', 'createNoteTarget', { noteId, targetPersonId: personId })
  return { personId, noteId, targetId }
}

export async function createPersonWithNote(inquiry: ContactInquiry, options?: CrmOptions) {
  return savePersonWithNote({ name: inquiry.name, email: inquiry.email,
    noteTitle: `Website inquiry: ${inquiry.reason}`,
    noteMarkdown: `Inquiry type: ${inquiry.reason}\n\n${inquiry.message}`,
  }, options)
}

export type EmailCrmIds = { crm_person_id: string | null; crm_note_id: string | null; crm_target_id: string | null }
/** A single stable person/note for each verified email contact. Persist each ID
 * before the next write. Ambiguous failures are quarantined by the caller. */
export async function syncEmailPreferenceInCrm(input: EmailCrmIds & { name: string; email: string; markdown: string }, persist: (ids: EmailCrmIds) => Promise<void>) {
  const base = process.env.TWENTY_CRM_BASE_URL
  const key = process.env.TWENTY_CRM_API_KEY
  if (!base || !key || new URL(base).protocol !== 'https:') throw new Error('CRM unavailable')
  const write = async (path: string, operation: string, body: unknown, method = 'POST') => {
    const response = await fetch(`${base.replace(/\/$/, '')}/rest/${path}`, { method, headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(8000), redirect: 'error', cache: 'no-store' })
    if (!response.ok) throw new Error('CRM sync not confirmed')
    const id = (await response.json())?.data?.[operation]?.id
    if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error('CRM sync not confirmed')
    return id
  }
  const ids: EmailCrmIds = { crm_person_id: input.crm_person_id, crm_note_id: input.crm_note_id, crm_target_id: input.crm_target_id }
  if (!ids.crm_person_id) {
    ids.crm_person_id = await write('people', 'createPerson', { name: { firstName: input.name, lastName: '' }, emails: { primaryEmail: input.email } })
    await persist(ids)
  }
  const note = { title: 'Website: current verified email preferences', bodyV2: { markdown: input.markdown, blocknote: JSON.stringify([{ id: crypto.randomUUID(), type: 'paragraph', props: {}, content: [{ type: 'text', text: input.markdown, styles: {} }], children: [] }]) } }
  if (!ids.crm_note_id) {
    ids.crm_note_id = await write('notes', 'createNote', note)
    await persist(ids)
  } else await write(`notes/${ids.crm_note_id}`, 'updateNote', note, 'PATCH')
  if (!ids.crm_target_id) {
    ids.crm_target_id = await write('noteTargets', 'createNoteTarget', { noteId: ids.crm_note_id, targetPersonId: ids.crm_person_id })
    await persist(ids)
  }
}
