import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Replace with actual PDF file path when speaker one-sheet asset is ready
const ONE_SHEET_HREF = '/one-sheet'

const whatToInclude = [
  'Event type',
  'Audience size and profile',
  'Preferred date or timeline',
  'Format: keynote, workshop, panel, or session',
  'What challenge or outcome matters most for the room',
]

export default function SpeakingBookingSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
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

            <div className="flex flex-col gap-3 pt-4">
              <Button href="/contact" variant="primary" size="md">
                Book Neil to Speak
              </Button>
              <Button href={ONE_SHEET_HREF} variant="gold-outline" size="md">
                Download Speaker One-Sheet
              </Button>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
