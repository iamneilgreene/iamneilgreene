import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import PageHero from '@/components/shared/PageHero'
import { DIMENSIONS, CTA_PRIMARY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'For Individuals',
  description:
    'Development work for people whose responsibility has outgrown the capability they built to carry it.',
}

export default function IndividualsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work With Neil / Individuals"
        title="Your responsibility grew. Did your capability?"
        lead="A promotion, a business, a marriage, fatherhood, money, influence, or leadership all put more in your hands. The work here is closing the distance between what is being asked of you and what you can reliably supply."
      />

      <Section index="01" ground="ink-sunken" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              Who this is for
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'You are successful in at least one dimension and quietly fragile in another.',
                'Your responsibilities have grown faster than your systems, health, or self-command.',
                'You are past motivation. You want structure, evidence, and a standard.',
                'You are willing to be measured, and to be measured again in 90 days.',
              ].map((l) => (
                <li key={l} className="border-l border-hairline-bright pl-5 text-[1.0625rem] leading-relaxed text-text-body">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              Who it is not for
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'Anyone looking for motivation as a product.',
                'Anyone who wants a number to go up without changing behaviour.',
                'Anyone unwilling to look honestly at their weakest dimension.',
              ].map((l) => (
                <li key={l} className="border-l border-hairline pl-5 text-[1.0625rem] leading-relaxed text-text-muted">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section index="02" ground="ink" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          The method is the framework
        </h2>
        <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-text-body">
          Work begins with a measured profile, not a conversation about goals.
          You get one primary development priority, not four, and a 30-day plan
          with evidence requirements attached to it.
        </p>

        <ol className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Measure', 'Establish a Four M baseline and identify the real constraint.'],
            ['Prioritise', 'One dimension. The one responsibility is currently outpacing.'],
            ['Build', 'A 30-day plan with weekly actions and defined evidence.'],
            ['Retest', 'At 60 to 90 days, prove behaviour actually changed.'],
          ].map(([step, detail], i) => (
            <li key={step} className="bg-ink-900 p-6">
              <span className="font-mono text-[0.625rem] text-slate-600">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-normal text-bone-50">{step}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">{detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="03" ground="bone" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink-on-bone md:text-4xl">
          What changes, by dimension
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {DIMENSIONS.map((d) => (
            <li key={d.key} className="border-t border-ink-on-bone/25 pt-5">
              <h3 className="font-display text-2xl font-semibold uppercase text-ink-on-bone">
                {d.name}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{d.essence}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-hairline bg-ink-950 py-24 text-center md:py-32">
        <Container width="narrow">
          <h2 className="font-display text-3xl font-bold text-bone-50 md:text-4xl">
            Start with the measurement.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-muted">
            The profile is free, takes about five minutes, and tells you which
            dimension to work on first. Applications open from there.
          </p>
          <Button href={CTA_PRIMARY.href} variant="primary" size="lg" className="mt-9">
            {CTA_PRIMARY.label}
          </Button>
        </Container>
      </section>
    </>
  )
}
