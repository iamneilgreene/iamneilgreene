import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

// TODO: Replace with actual PDF file path when speaker one-sheet asset is ready
const ONE_SHEET_HREF = '/one-sheet'

export default function FinalSpeakingCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Book Neil
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            If the Room Needs a Higher Standard, Bring in the Right Message
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            Neil Greene speaks to rooms that need more than energy. They need clarity, ownership,
            stronger standards, and a message that still matters after the applause ends. If that is
            what your event calls for, the next step is simple. Book Neil to speak.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href="#booking" variant="primary" size="lg">
              Book Neil to Speak
            </Button>
            <Button href={ONE_SHEET_HREF} variant="gold-outline" size="lg">
              Download Speaker One-Sheet
            </Button>
          </div>

          <Link
            href="#featured-talk"
            className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
          >
            Watch the Featured Talk
          </Link>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
