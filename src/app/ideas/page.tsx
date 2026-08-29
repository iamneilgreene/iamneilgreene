import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'
import { DIMENSIONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Ideas',
  description:
    'Ideas organised by the Four Dimensions of Capability: Mind, Means, Measure, and Mastery.',
}

const SUBTOPICS: Record<string, string[]> = {
  mind: ['Strategy', 'Psychology', 'Books', 'Learning', 'Decision-making', 'Applied wisdom'],
  means: ['Business', 'AI', 'Technology', 'Money', 'Systems', 'Relationships', 'Ownership'],
  measure: ['Fitness', 'Health', 'Resilience', 'Readiness', 'Performance', 'Recovery'],
  mastery: ['Leadership', 'Fatherhood', 'Discipline', 'Communication', 'Stewardship', 'Standards'],
}

export default function IdeasPage() {
  return (
    <>
      <PageHero
        eyebrow="Ideas"
        title="One worldview, examined from four directions."
        lead="Every piece maps to one of the Four Dimensions. The subjects differ; the question underneath them does not."
      />

      <Section index="01" ground="ink-sunken" topRule>
        <ul className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {DIMENSIONS.map((d, i) => (
            <li key={d.key}>
              <Link
                href={`/ideas/${d.key}`}
                className="group flex h-full flex-col bg-ink-950 p-8 transition-colors hover:bg-ink-900 md:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-bone-50">
                    {d.name}
                  </h2>
                  <span className="font-mono text-[0.625rem] text-slate-600">0{i + 1}</span>
                </div>
                <p className="mt-2 font-display text-lg font-medium italic text-bronze-400">
                  {d.question}
                </p>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                  {d.essence}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-1.5">
                  {SUBTOPICS[d.key].map((s) => (
                    <li key={s} className="text-[0.8125rem] text-slate-500">
                      {s}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Honest about the state of the library rather than padding it with
          invented article titles. */}
      <Section ground="ink" topRule width="narrow" pad="md">
        <div className="border border-hairline bg-ink-850 p-8 text-center">
          <p className="label label-bronze">Publishing</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-bone-50">
            The first pieces are being written now.
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
            The Ideas library opens with long-form work on judgment, AI and
            professional value, capacity under pressure, and what a network
            actually is. Until then, the Capability Profile is the most useful
            thing here.
          </p>
          <Link
            href="/capability-profile"
            className="mt-6 inline-flex items-center gap-2 border-b border-cobalt-500/50 pb-1 text-sm text-cobalt-300 transition-colors hover:border-cobalt-400 hover:text-cobalt-400"
          >
            Get your Capability Profile <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>
    </>
  )
}
