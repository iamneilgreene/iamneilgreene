import type { Metadata } from 'next'
import Image from 'next/image'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { CTA_PRIMARY, DIMENSIONS, PHILOSOPHY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Neil Greene studies, practises, and shares what makes people more capable across mind, means, measure, and mastery.',
}

/**
 * Narrative, not a chronological autobiography, and not a résumé wall.
 * The range is presented as evidence of one worldview rather than a list of
 * unrelated identities.
 */
export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="label label-bronze">About</p>
              <h1 className="mt-7 max-w-2xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-6xl">
                I stopped trying to be one thing.
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-body">
                Cybersecurity. AI. Business. Fitness. Books. Leadership. Being a
                husband and a father. For a long time I thought I needed to pick
                one and stay in that box.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-body">
                The thing connecting all of it is capability: what makes a
                person capable of answering the responsibilities life places in
                their hands.
              </p>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs border border-hairline-bright bg-ink-850 lg:max-w-none">
              <Image
                src="/images/portrait-ink.webp"
                alt="Neil Greene"
                fill
                priority
                sizes="(min-width: 1024px) 28vw, 60vw"
                className="object-cover object-top"
              />
              <span
                className="absolute -bottom-px -left-px h-7 w-7 border-b border-l border-bronze-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── What each domain taught ────────────────────────────────── */}
      <Section index="01" ground="ink-sunken" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          My life kept pulling me into different worlds. Eventually I realised
          they were teaching me different parts of the same thing.
        </h2>

        <ul className="mt-14 space-y-px bg-hairline">
          {[
            ['Cybersecurity', 'How to think about risk, resilience, systems, and failure points.'],
            ['Technology and AI', 'That what you know is not enough if you cannot adapt and use the tools changing the world around you.'],
            ['Business', 'Value, leverage, money, relationships, and creating options.'],
            ['Fitness', 'That your body can either support your responsibilities or become another limitation.'],
            ['Writing Exposed', 'Deeper into digital risk, technology, and leadership.'],
            ['Writing Ignite', 'Deeper into performance, discipline, and personal development.'],
            ['Husband, father, leader', 'That responsibility always asks something of you, and the quality of your response depends on what you have built into yourself.'],
          ].map(([domain, lesson]) => (
            <li key={domain} className="grid gap-2 bg-ink-950 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bronze-500">
                {domain}
              </span>
              <span className="text-[1.0625rem] leading-relaxed text-text-body">{lesson}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── The framework ──────────────────────────────────────────── */}
      <Section index="02" ground="bone" topRule>
        <h2 className="max-w-2xl font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink-on-bone md:text-4xl">
          So capability, to me, has four dimensions.
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DIMENSIONS.map((d) => (
            <li key={d.key} className="border-t border-ink-on-bone/25 pt-5">
              <h3 className="font-display text-2xl font-semibold uppercase text-ink-on-bone">
                {d.name}
              </h3>
              <p className="mt-1.5 font-display text-lg font-medium italic text-bronze-600">
                {d.question}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-2xl text-[1.0625rem] leading-relaxed">
          I am not pretending to have mastered all four. Some things I know.
          Some things I have lived. Some things I am still studying. That is
          what this site documents.
        </p>
      </Section>

      {/* ── Position ───────────────────────────────────────────────── */}
      <Section index="03" ground="ink" topRule width="narrow">
        <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-4xl">
          Three positions I speak from
        </h2>
        <ul className="mt-10 space-y-6">
          {[
            ['I know this', 'Where I have real expertise and can be held to it.'],
            ['I experienced this', 'Where I have lived something and can tell you what it cost.'],
            ['I am studying this', 'Where I am learning in public and will say so.'],
          ].map(([pos, meaning]) => (
            <li key={pos} className="border-l border-hairline-bright pl-5">
              <p className="font-display text-xl font-semibold italic text-bronze-400">{pos}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-muted">{meaning}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[1.0625rem] leading-relaxed text-text-body">
          The brand does not require pretending to be the world&apos;s greatest
          expert in every subject. It requires being honest about which position
          I am speaking from.
        </p>
      </Section>

      <section className="border-t border-hairline bg-ink-950 py-24 text-center md:py-32">
        <Container width="narrow">
          <p className="font-display text-3xl font-bold text-bone-50 md:text-4xl">
            {PHILOSOPHY}
          </p>
          <Button href={CTA_PRIMARY.href} variant="primary" size="lg" className="mt-10">
            {CTA_PRIMARY.label}
          </Button>
        </Container>
      </section>
    </>
  )
}
