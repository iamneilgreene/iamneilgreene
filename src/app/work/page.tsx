import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'

export const metadata: Metadata = {
  title: 'Work With Neil',
  description:
    'Three pathways: development for individuals, advisory for organizations, and speaking.',
}

const PATHS = [
  {
    href: '/work/individuals',
    label: 'For Individuals',
    outcome: 'Expand what you can understand, access, handle, and lead.',
    line: 'Programs, coaching, and development experiences for people whose responsibility has outgrown what they have built to carry it.',
  },
  {
    href: '/work/organizations',
    label: 'For Organizations',
    outcome: 'Judgment and resilience, not just tooling.',
    line: 'AI, cybersecurity, digital risk, strategy, advisory, and workshops for teams and executives.',
  },
  {
    href: '/speaking',
    label: 'Speaking',
    outcome: 'A room that leaves with a framework, not a feeling.',
    line: 'Capability, modern leadership, technology, resilience, and responsibility.',
  },
]

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work With Neil"
        title="When the responsibility is real, the work gets specific."
        lead="Start with what you are carrying and what it is asking of you. The right pathway follows from that."
      />

      <Section ground="ink-sunken" topRule>
        <ul className="grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex h-full flex-col bg-ink-950 p-8 transition-colors hover:bg-ink-900 md:p-10"
              >
                <span className="font-mono text-[0.625rem] text-slate-600">0{i + 1}</span>
                <h2 className="mt-5 font-display text-2xl font-normal text-bone-50">
                  {p.label}
                </h2>
                <p className="mt-3 font-display text-lg font-medium italic text-bronze-400">
                  {p.outcome}
                </p>
                <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                  {p.line}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-cobalt-300 transition-colors group-hover:text-cobalt-400">
                  Read more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
