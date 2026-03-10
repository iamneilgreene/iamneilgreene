import { NextRequest, NextResponse } from 'next/server'
import { isCrmConfigured, createPersonWithNote } from '@/lib/crm'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, inquiryType, message } =
      await request.json()

    if (!firstName || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isCrmConfigured()) {
      console.error('Twenty CRM environment variables not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const noteTitle = `[${inquiryType}] Inquiry from ${firstName} ${lastName || ''}`.trim()
    const noteMarkdown = `**Inquiry Type:** ${inquiryType}\n\n**Message:**\n${message}`

    await createPersonWithNote({
      firstName,
      lastName,
      email,
      phone,
      noteTitle,
      noteMarkdown,
      jobTitle: `Inquiry: ${inquiryType}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    )
  }
}
