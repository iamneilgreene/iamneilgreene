import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import FourMPlate from '@/components/capability/FourMPlate'
import { DIMENSIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'The Four M Capability Profile',
  description:
    'Assess your Mind, Means, Measure, and Mastery. See where your capability is strongest, where it is constrained, and where responsibility may be outpacing what you can currently support.',
}

/**
 * SCREEN 1 — CAPABILITY PROFILE LANDING
 *
 * Distraction-light by design. The Core is present but static here: the
 * assessment route must stay among the lightest pages on the site, and
 * nothing should compete with the Start action.
 */
export default function CapabilityProfileLanding() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          className="pointer-events-none absolute right-0 top-0 h-[36rem] w-[36rem] opacity-[0.11] blur-3xl"
          style={{ background: 'radial-gradient(circle, #3d6fe5 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="label label-bronze">The Four M Capability Profile</p>

              <h1 className="mt-7 max-w-xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-6xl">
                How capable are you, really?
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-text-body">
                Responsibility keeps asking more of us. The question is whether
                our capability is growing with it.
              </p>

              <div className="mt-10 border-l border-hairline-bright pl-6">
                <p className="text-[0.9375rem] text-text-muted">
                  Assess four dimensions of capability:
                </p>
                <ul className="mt-4 space-y-2">
                  {DIMENSIONS.map((d) => (
                    <li key={d.key} className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-bone-50">
                        {d.name}
                      </span>
                      <span className="font-display text-lg font-medium italic text-bronze-400">
                        {d.question}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-text-muted">
                In a few minutes, you will see where your capability is
                strongest, where it is constrained, and where responsibility may
                be outpacing what you can currently support.
              </p>

              <div className="mt-10">
                <Button href="/capability-profile/start" variant="primary" size="lg">
                  Get Your Capability Profile
                </Button>
                <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
                  28 responses · About 5 minutes · No email required to see your
                  initial results
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md">
              <FourMPlate className="h-full w-full" />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ink-950 py-14">
        <Container width="narrow">
          <p className="text-center text-[0.8125rem] leading-relaxed text-slate-500">
            This is a proprietary self-assessment and development tool, not a
            clinical or psychological diagnostic.
          </p>
        </Container>
      </section>
    </>
  )
}
