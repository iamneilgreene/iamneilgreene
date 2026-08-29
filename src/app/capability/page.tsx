import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import PageHero from '@/components/shared/PageHero'
import FourMPlate from '@/components/capability/FourMPlate'
import { DIMENSIONS, CTA_PRIMARY, PHILOSOPHY, MOVEMENT, ENEMY } from '@/lib/constants'
import { STANDARD } from '@/lib/capability'

export const metadata: Metadata = {
  title: 'Capability',
  description:
    'Responsibility is the obligation to answer. Capability determines the quality of that answer. The Four Dimensions: Mind, Means, Measure, Mastery.',
}

const BANDS_TEACHING = [
  ['Below eight', 'you build.'],
  ['At eight', 'you are capable.'],
  ['At nine', 'you are proven.'],
  ['At ten', 'you are exceptional.'],
] as const

export default function CapabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="The Philosophy"
        title={
          <>
            Responsibility is the obligation to answer.{' '}
            <span className="italic text-bronze-400">
              Capability determines the quality of that answer.
            </span>
          </>
        }
        lead="As responsibility grows, capability must grow with it. A person can carry responsibility beyond current capability, but the resulting gap creates fragility, poor judgment, failure under pressure, or weak leadership."
      />

      {/* ── The enemy ──────────────────────────────────────────────── */}
      <Section index="01" ground="ink-sunken" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-lg font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              The enemy is {ENEMY.toLowerCase()}.
            </h2>
            <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
              One of the biggest mistakes successful people make is assuming
              success in one area makes them capable everywhere else. Success
              usually increases responsibility faster than most people realise.
            </p>
          </div>

          <ul className="space-y-5">
            {[
              'You can know a lot and still lack the resources or relationships to act.',
              'You can have money, technology, and access and still fold when real pressure shows up.',
              'You can be physically strong and still be unable to govern yourself.',
              'You can lead a team at work and have no control over your own habits.',
            ].map((line) => (
              <li
                key={line}
                className="border-l border-hairline-bright pl-5 text-[1.0625rem] leading-relaxed text-text-body"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── The four dimensions ────────────────────────────────────── */}
      <Section index="02" ground="ink" topRule>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              The Four Dimensions of Capability
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-text-body">
              Four parts of response readiness. Responsibility can expose any
              dimension that falls below the standard, regardless of how strong
              the other three are.
            </p>

            <ul className="mt-12 space-y-px bg-hairline">
              {DIMENSIONS.map((d, i) => (
                <li key={d.key} className="bg-ink-900 py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.625rem] text-slate-600">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-bone-50">
                      {d.name}
                    </h3>
                  </div>
                  <p className="ml-9 mt-2 font-display text-xl font-semibold italic text-bronze-400">
                    {d.question}
                  </p>
                  <p className="ml-9 mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-text-body">
                    {d.essence}
                  </p>
                  <p className="ml-9 mt-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-600">
                    {d.response}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <FourMPlate className="h-full w-full" />
            </div>
            <p className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-600">
              The Four M instrument
            </p>
          </div>
        </div>
      </Section>

      {/* ── The standard ───────────────────────────────────────────── */}
      <Section index="03" ground="bone" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-md font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink-on-bone md:text-4xl">
              {STANDARD.toFixed(0)} is the standard, not the finish.
            </h2>
            <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed">
              You do not meet the standard because your four scores average to
              eight. All four must reach {STANDARD.toFixed(1)} or higher. A high
              score in one area cannot compensate for a meaningful constraint in
              another.
            </p>
            <p className="mt-5 max-w-md font-display text-xl font-semibold italic text-ink-on-bone">
              You cannot average your way into capability.
            </p>
          </div>

          <div>
            <ul className="space-y-3">
              {BANDS_TEACHING.map(([when, then]) => (
                <li
                  key={when}
                  className="flex items-baseline gap-3 border-b border-hairline-on-bone pb-3"
                >
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bronze-600">
                    {when}
                  </span>
                  <span className="font-display text-lg text-ink-on-bone">{then}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 border border-hairline-on-bone bg-bone-50 p-6">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-on-bone-muted">
                Worked example
              </p>
              <dl className="mt-4 grid grid-cols-4 gap-3 text-center">
                {[
                  ['Mind', '9.0'],
                  ['Means', '9.0'],
                  ['Measure', '5.0'],
                  ['Mastery', '9.0'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-on-bone-muted">
                      {k}
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-ink-on-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 border-t border-hairline-on-bone pt-4 text-[0.875rem] leading-relaxed">
                Average: 8.0. Ruling:{' '}
                <span className="text-ink-on-bone">standard not met.</span>{' '}
                Measure is the current constraint.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── The gap ────────────────────────────────────────────────── */}
      <Section index="04" ground="ink" topRule width="narrow">
        <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          The Responsibility-Capability Gap
        </h2>
        <p className="mt-7 text-[1.0625rem] leading-relaxed text-text-body">
          The gap occurs when the responsibility a person carries grows faster
          than the capability they have developed to answer it. It is the
          mechanism underneath one-dimensional success, and it stays hidden
          until pressure finds it.
        </p>
        <p className="mt-6 font-display text-2xl font-semibold italic text-bronze-400">
          Where has your responsibility outgrown your capability?
        </p>
        <p className="mt-6 text-[0.9375rem] leading-relaxed text-text-muted">
          Low responsibility does not make low capability acceptable. Demand
          affects urgency, not the standard. The resolution is always the same:
          expand capability, carry responsibility.
        </p>
      </Section>

      {/* ── Close ──────────────────────────────────────────────────── */}
      <section className="border-t border-hairline bg-ink-950 py-24 md:py-32">
        <Container width="narrow">
          <div className="text-center">
            <p className="font-display text-3xl font-bold leading-tight text-bone-50 md:text-4xl">
              {PHILOSOPHY}
            </p>
            <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-500">
              {MOVEMENT}
            </p>
            <Button href={CTA_PRIMARY.href} variant="primary" size="lg" className="mt-10">
              {CTA_PRIMARY.label}
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
