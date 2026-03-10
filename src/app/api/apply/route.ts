import { NextRequest, NextResponse } from 'next/server'
import { isCrmConfigured, createPersonWithNote } from '@/lib/crm'

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      email,
      phone,
      stage,
      area,
      discipline,
      seriousness,
      income,
      financialAbility,
      accountability,
      fiveYearConcern,
      whyNeil,
      qualification,
    } = await request.json()

    if (!fullName || !email || !seriousness || !financialAbility || !accountability) {
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

    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    const assessment =
      qualification === 'qualified'
        ? 'Qualified'
        : 'Lower-fit — redirected to Brotherhood'

    const noteMarkdown = [
      `**Auto-Assessment:** ${assessment}`,
      '',
      `**Stage:** ${stage || 'Not provided'}`,
      `**Area:** ${area || 'Not provided'}`,
      `**Seriousness:** ${seriousness}`,
      `**Income:** ${income || 'Not provided'}`,
      `**Financial Ability:** ${financialAbility}`,
      `**Accountability:** ${accountability}`,
      '',
      '**Hardest part of maintaining discipline:**',
      discipline || 'Not provided',
      '',
      '**What concerns you if nothing changes in 5 years:**',
      fiveYearConcern || 'Not provided',
      '',
      '**Why work with Neil specifically:**',
      whyNeil || 'Not provided',
    ].join('\n')

    await createPersonWithNote({
      firstName,
      lastName,
      email,
      phone,
      noteTitle: `[Coaching Application] from ${fullName}`,
      noteMarkdown,
      jobTitle: 'Coaching Application',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Application form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}
