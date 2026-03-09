import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

// TODO: Replace with actual PDF asset path when one-sheet is ready
const ONE_SHEET_HREF = '/one-sheet'

export default function SpeakingHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Speaking
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            Messages That Raise the Standard in the Room
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Neil Greene speaks to leaders, teams, and organizations on discipline, resilience,
            accountability, leadership, and performance under pressure. His message is built for
            rooms that need more than inspiration. They need ownership, clarity, and standards that
            hold when comfort starts costing results.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/contact" variant="primary" size="lg">
                Book Neil to Speak
              </Button>
              <Button href={ONE_SHEET_HREF} variant="gold-outline" size="lg">
                Download Speaker One-Sheet
              </Button>
            </div>
            <div className="pt-1">
              <Link
                href="#featured-talk"
                className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
              >
                Watch the Featured Talk
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
