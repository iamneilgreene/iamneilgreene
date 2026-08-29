import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import PageHero from '@/components/shared/PageHero'
import { DIMENSIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Keynotes and sessions on capability, modern leadership, technology, resilience, and responsibility.',
}

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking"
        title="A room that leaves with a framework, not a feeling."
        lead="Sessions on capability, modern leadership, technology, resilience, and responsibility, built for audiences that are past motivation and want something they can use on Monday."
      />

      <Section index="01" ground="ink-sunken" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          Keynote topics
        </h2>
        <ul className="mt-12 space-y-px bg-hairline">
          {[
            ['Why successful people become dangerously one-dimensional', 'The Responsibility-Capability Gap, why success hides it, and the Four M framework for finding it before pressure does.'],
            ['AI is changing what it means to be valuable', 'Judgment, verification, domain knowledge, and skill stacking as the capabilities AI makes more valuable, not less.'],
            ['What can you actually handle?', 'Capacity under demand (physical, psychological, operational), and why appearance is not readiness.'],
            ['Your network is part of your means', 'Relationships as usable, reciprocal capability rather than a contact list.'],
          ].map(([title, body], i) => (
            <li key={title} className="bg-ink-950 p-7 md:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.625rem] text-slate-600">0{i + 1}</span>
                <h3 className="font-display text-xl font-normal text-bone-50 md:text-2xl">{title}</h3>
              </div>
              <p className="ml-9 mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" ground="ink" topRule>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              What the audience leaves with
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'A shared language for capability across four dimensions.',
                'A diagnostic question they can apply to their own role that week.',
                'One prioritised development area rather than a list of everything.',
                'Optional: the Four M Capability Profile run across the whole room.',
              ].map((l) => (
                <li key={l} className="border-l border-hairline-bright pl-5 text-[1.0625rem] leading-relaxed text-text-body">
                  {l}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
              Formats
            </h2>
            <ul className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-text-body">
              <li className="border-l border-hairline pl-5">Keynote, 30 to 60 minutes.</li>
              <li className="border-l border-hairline pl-5">Workshop, half or full day.</li>
              <li className="border-l border-hairline pl-5">Executive session or panel.</li>
            </ul>
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-text-muted">
              A speaker one-sheet and reel are being assembled. Until then, topic
              outlines and references are shared directly on request.
            </p>
          </div>
        </div>
      </Section>

      <Section index="03" ground="bone" topRule width="narrow">
        <p className="label text-ink-on-bone-muted">The framework</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {DIMENSIONS.map((d) => (
            <li key={d.key}>
              <span className="font-display text-2xl font-semibold uppercase text-ink-on-bone">
                {d.name}
              </span>
              <span className="ml-2 font-display text-base font-medium italic text-bronze-600">
                {d.question}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-hairline bg-ink-950 py-24 text-center md:py-32">
        <Container width="narrow">
          <h2 className="font-display text-3xl font-bold text-bone-50 md:text-4xl">
            Bring Neil in.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-muted">
            Tell me the audience, the date, and what the room is actually
            carrying.
          </p>
          <Button href="/contact?reason=speaking" variant="primary" size="lg" className="mt-9">
            Speaking inquiry
          </Button>
        </Container>
      </section>
    </>
  )
}
