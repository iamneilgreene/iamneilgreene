import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

/**
 * Community as a warm teaser, 60–75vh.
 *
 * The men's pathway, not a second umbrella identity. The four experience
 * labels are one compact supporting line, not four cards; explanation
 * lives on the Community page. No fabricated community imagery — the
 * visual slot stays an environmental placeholder until real photographs
 * exist.
 */
export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-ink-900 py-24 md:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: 'radial-gradient(circle, #a9814f 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div className="flex flex-col justify-center">
            <h2 className="max-w-lg font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-5xl">
              Capable men build capable men.
            </h2>
            <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
              A private local network built around trusted relationships,
              shared experience, useful introductions, honest perspective, and
              repeated action.
            </p>

            <p className="mt-8 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-bronze-500 sm:text-[0.6875rem] sm:tracking-[0.18em]">
              The Room • The Table • The Field • The Exchange
            </p>

            <div>
              <Button href="/community" variant="bronze" size="lg" className="mt-9">
                Request an invitation
              </Button>
            </div>
          </div>

          {/* Real group image eventually. Environmental placeholder until then. */}
          <div className="relative aspect-[4/3] border border-hairline bg-ink-950 lg:aspect-auto lg:min-h-[22rem]">
            <span className="absolute left-4 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slate-600">
              Image · real community, when it exists
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
