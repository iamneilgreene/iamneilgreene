import { NextRequest, NextResponse } from 'next/server'
import { isCrmConfigured, createPersonWithNote } from '@/lib/crm'

export async function POST(request: NextRequest) {
  try {
    if (!isCrmConfigured()) {
      console.error('Twenty CRM environment variables not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const payload = await request.json()
    const { triggerEvent, payload: booking } = payload

    // Only process new bookings
    if (triggerEvent !== 'BOOKING_CREATED') {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const attendee = booking?.attendees?.[0]
    if (!attendee?.email) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const nameParts = (attendee.name || '').split(' ')
    const firstName = nameParts[0] || attendee.email.split('@')[0]
    const lastName = nameParts.slice(1).join(' ')

    const eventTitle = booking?.title || 'Cal.com Booking'
    const eventType = booking?.eventType?.slug || 'unknown'
    const startTime = booking?.startTime
      ? new Date(booking.startTime).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'America/New_York',
        })
      : 'Not specified'

    const noteTitle = `[Cal.com] ${eventTitle}`
    const noteLines = [
      `**Event:** ${eventTitle}`,
      `**Type:** ${eventType}`,
      `**Date:** ${startTime}`,
      `**Attendee:** ${attendee.name || firstName} (${attendee.email})`,
    ]

    if (attendee.timeZone) {
      noteLines.push(`**Timezone:** ${attendee.timeZone}`)
    }

    if (booking?.responses) {
      const responses = booking.responses
      // Cal.com stores custom question responses keyed by label or field name
      for (const [key, value] of Object.entries(responses)) {
        if (key === 'name' || key === 'email' || key === 'guests') continue
        if (value && typeof value === 'object' && 'value' in (value as Record<string, unknown>)) {
          noteLines.push(`**${key}:** ${(value as Record<string, unknown>).value}`)
        } else if (typeof value === 'string') {
          noteLines.push(`**${key}:** ${value}`)
        }
      }
    }

    const labelMap: Record<string, string> = {
      speaking: 'Speaking Inquiry',
      media: 'Media / Podcast',
      strategy: 'Coaching Strategy Call',
      intro: 'Introduction Call',
    }

    await createPersonWithNote({
      firstName,
      lastName,
      email: attendee.email,
      phone: attendee.phone,
      noteTitle,
      noteMarkdown: noteLines.join('\n\n'),
      jobTitle: labelMap[eventType] || `Cal.com: ${eventType}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Cal.com webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
