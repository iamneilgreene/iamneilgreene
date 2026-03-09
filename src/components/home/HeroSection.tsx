import Link from 'next/link'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center bg-[#0d0d0d] pt-16">
      {/* Subtle horizontal gold thread at top */}
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[#b8975a]/25 to-transparent" />

      <PageContainer>
        <div className="flex max-w-5xl flex-col gap-9 py-28 md:py-36">

          {/* Eyebrow */}
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#b8975a]">
            Neil Greene&nbsp;&nbsp;|&nbsp;&nbsp;Architect of Power &amp; Discipline
          </p>

          {/* Headline */}
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.06] tracking-tight text-[#f4f1ec] md:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Discipline Is What Remains<br className="hidden sm:block" />{' '}
            When Excuses Die
          </h1>

          {/* Gold rule */}
          <span className="block h-px w-14 bg-[#b8975a]" />

          {/* Subhead */}
          <p className="max-w-2xl text-lg leading-relaxed text-[#9a9590] md:text-xl">
            Forged By War is for men who are finished negotiating with drift,
            inconsistency, and self-betrayal, and are ready to rebuild strength,
            clarity, and leadership through structure.
          </p>

          {/* CTA row */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/apply" variant="primary" size="lg">
              Apply for Coaching
            </Button>
            <Button href="/community" variant="gold-outline" size="lg">
              Join the Brotherhood
            </Button>
            <Link
              href="/speaking"
              className="text-sm font-medium tracking-wide text-[#9a9590] underline-offset-4 transition-colors hover:text-[#f4f1ec] hover:underline sm:ml-2"
            >
              Book Neil to Speak
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0d0d0d]" />
    </section>
  )
}
