const TWENTY_CRM_BASE_URL = process.env.TWENTY_CRM_BASE_URL
const TWENTY_CRM_API_KEY = process.env.TWENTY_CRM_API_KEY

export function isCrmConfigured() {
  return Boolean(TWENTY_CRM_BASE_URL && TWENTY_CRM_API_KEY)
}

export async function crmFetch(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${TWENTY_CRM_BASE_URL}/rest${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TWENTY_CRM_API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`CRM API error (${res.status}): ${text}`)
  }

  return res.json()
}

export async function createPersonWithNote({
  firstName,
  lastName,
  email,
  phone,
  noteTitle,
  noteMarkdown,
  jobTitle,
}: {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  noteTitle: string
  noteMarkdown: string
  jobTitle?: string
}) {
  const personData = await crmFetch('/people', {
    name: {
      firstName,
      lastName: lastName || '',
    },
    emails: {
      primaryEmail: email,
    },
    ...(phone && {
      phones: {
        primaryPhoneNumber: phone,
      },
    }),
    ...(jobTitle && { jobTitle }),
  })

  const personId = personData?.data?.createPerson?.id

  if (personId) {
    const noteData = await crmFetch('/notes', {
      title: noteTitle,
      bodyV2: {
        markdown: noteMarkdown,
        blocknote: JSON.stringify([
          {
            id: crypto.randomUUID(),
            type: 'paragraph',
            props: {},
            content: [{ type: 'text', text: noteMarkdown, styles: {} }],
            children: [],
          },
        ]),
      },
    })

    const noteId = noteData?.data?.createNote?.id

    if (noteId) {
      await crmFetch('/noteTargets', {
        noteId,
        targetPerson: personId,
      })
    }
  }

  return personId
}
