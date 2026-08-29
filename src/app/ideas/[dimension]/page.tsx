import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'
import { DIMENSIONS, type MKey } from '@/lib/constants'

const KEYS: MKey[] = ['mind', 'means', 'measure', 'mastery']

export function generateStaticParams() {
  return KEYS.map((dimension) => ({ dimension }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dimension: string }>
}): Promise<Metadata> {
  const { dimension } = await params
  const d = DIMENSIONS.find((x) => x.key === dimension)
  if (!d) return {}
  return {
    title: `${d.name} · Ideas`,
    description: `${d.question} ${d.essence}`,
  }
}

export default async function DimensionIdeasPage({
  params,
}: {
  params: Promise<{ dimension: string }>
}) {
  const { dimension } = await params
  const d = DIMENSIONS.find((x) => x.key === dimension)
  if (!d) notFound()

  const others = DIMENSIONS.filter((x) => x.key !== d.key)

  return (
    <>
      <PageHero
        eyebrow={`Ideas / ${d.name}`}
        title={d.question}
        lead={d.essence}
      >
        <ul className="mt-9 flex flex-wrap gap-2">
          {d.covers.map((c) => (
            <li
              key={c}
              className="border border-hairline px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-500"
            >
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section ground="ink-sunken" topRule width="narrow">
        <div className="border border-hairline bg-ink-900 p-8 text-center">
          <p className="label">No pieces published yet</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
            {d.name} writing is in production. In the meantime, the Capability
            Profile will tell you whether {d.name} is your current advantage or
            your current constraint.
          </p>
          <Link
            href="/capability-profile"
            className="mt-6 inline-flex items-center gap-2 border-b border-cobalt-500/50 pb-1 text-sm text-cobalt-300 transition-colors hover:border-cobalt-400 hover:text-cobalt-400"
          >
            Get your Capability Profile <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-14">
          <p className="label">The other three dimensions</p>
          <ul className="mt-5 grid gap-px bg-hairline sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.key}>
                <Link
                  href={`/ideas/${o.key}`}
                  className="block bg-ink-950 p-5 transition-colors hover:bg-ink-900"
                >
                  <span className="font-display text-xl font-semibold uppercase text-bone-50">
                    {o.name}
                  </span>
                  <span className="mt-1 block font-display text-sm font-medium italic text-bronze-400">
                    {o.question}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
