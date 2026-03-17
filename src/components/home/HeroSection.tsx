import Link from 'next/link'
import Image from 'next/image'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const CREDENTIALS = [
  { label: 'Coach', description: '1-on-1 and group coaching for men ready to rebuild with structure.' },
  { label: 'Author', description: 'Writing on discipline, identity, and the war within every man.' },
  { label: 'Speaker', description: 'Keynotes and workshops on power, leadership, and resilience.' },
  { label: '500+', description: 'Men coached through transformation, accountability, and brotherhood.' },
] as const

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0d0d0d] pt-16">
      {/* Subtle horizontal gold thread at top */}
      <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[#b8975a]/25 to-transparent" />

      {/* Background hero image — pushed to right half */}
      <div className="pointer-events-none absolute inset-y-0 w-full md:w-[70%]" style={{ top: '120px', right: '-10%' }}>
        <Image
          src="/images/hero-subject.png"
          alt=""
          fill
          className="object-cover object-[right_top] opacity-80 md:opacity-90"
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
        />
        {/* Gradient overlays to blend into dark background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0d0d]/60" />
      </div>

      <PageContainer className="relative z-10">
        <div className="flex max-w-2xl flex-col gap-9 py-28 pb-36 md:py-36 md:pb-44">

          {/* Eyebrow */}
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#b8975a]">
            Neil Greene&nbsp;&nbsp;|&nbsp;&nbsp;Architect of Power &amp; Discipline
          </p>

          {/* Headline */}
          <h1 className="font-display text-[2.25rem] font-semibold leading-[1.06] tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl xl:text-7xl">
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

      {/* Credential cards */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[#f4f1ec]/10 backdrop-blur-sm">
        <PageContainer>
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {CREDENTIALS.map((item) => (
              <div key={item.label} className="px-4 py-6 md:px-6 md:py-8">
                <p className="font-display text-lg font-semibold text-[#f4f1ec] md:text-xl">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#9a9590] md:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    </section>
  )
}
