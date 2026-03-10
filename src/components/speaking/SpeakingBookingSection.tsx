'use client'

import { useEffect } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import Cal, { getCalApi } from '@calcom/embed-react'

const whatToInclude = [
  'Event type',
  'Audience size and profile',
  'Preferred date or timeline',
  'Format: keynote, workshop, panel, or session',
  'What challenge or outcome matters most for the room',
]

export default function SpeakingBookingSection() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          dark: {
            'cal-brand': '#b8975a',
            'cal-brand-emphasis': '#d4af72',
            'cal-text': '#e8e4de',
            'cal-text-emphasis': '#f4f1ec',
            'cal-border-emphasis': '#2e2e2e',
          },
          light: {
            'cal-brand': '#b8975a',
            'cal-brand-emphasis': '#9a7d45',
          },
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  return (
    <section id="booking" className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                  Speaking Inquiry
                </span>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                  Book Neil to Speak
                </h2>
              </div>

              <p className="text-base leading-relaxed text-[#9a9590]">
                If your room needs a message on discipline, accountability, leadership, resilience,
                and performance under pressure, the next step is a direct inquiry. Share your event
                details, audience, and what the room needs most, and the conversation can begin from
                there.
              </p>

              <div className="border-l-2 border-[#b8975a] pl-5">
                <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
                  Strong events are shaped by clear expectations. Start there.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9a9590]">
                  What to Include
                </p>
                <ul className="flex flex-col gap-3">
                  {whatToInclude.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#9a9590]">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border border-[#2e2e2e]">
            <Cal
              calLink="neilgreene/speaking"
              style={{ width: '100%', height: '100%', overflow: 'scroll', minHeight: '500px' }}
              config={{
                layout: 'month_view',
                theme: 'dark',
                hideBranding: '1',
              }}
            />
            {/* Covers the Cal.com branding footer */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[#141414]" />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
