import Link from 'next/link'
import Container from '@/components/layout/Container'
import Reveal from '@/components/ui/Reveal'
import { DIMENSIONS } from '@/lib/constants'

/**
 * Ideas.
 *
 * Bone chapter change. Positioning line, headline, featured story left
 * (6–7 columns) with three smaller pieces stacked right, Four M filters as
 * quiet tabs, one CTA. Pieces are layout placeholders marked "In draft" —
 * no fabricated publication dates, no fake read counts.
 */

const FEATURED = {
  dimension: 'Mind',
  title: 'Judgment is the skill under every other skill.',
  blurb:
    'Why the leaders who scale are the ones who decide well with incomplete information, and how that gets trained.',
  kind: 'Essay',
}

const STACK = [
  {
    dimension: 'Means',
    title: 'Options are a form of capability.',
    kind: 'Essay',
  },
  {
    dimension: 'Measure',
    title: 'The body is the first system responsibility tests.',
    kind: 'Video',
  },
  {
    dimension: 'Mastery',
    title: 'Standards travel. Motivation does not.',
    kind: 'Framework',
  },
] as const

export default function IdeasSection() {
  return (
    <section className="border-t border-hairline-on-bone bg-bone-50 py-24 text-ink-on-bone-body md:py-36">
      <Container>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-600">
          Capability is the system. Ideas are the application.
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink-on-bone md:text-5xl">
            Ideas that expand capability.
          </h2>
          {/* Four M filters — quiet tabs */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-on-bone-muted">
            {DIMENSIONS.map((d, i) => (
              <li key={d.key} className={i === 0 ? 'text-ink-on-bone' : ''}>
                {d.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {/* Featured */}
          <Reveal className="md:col-span-7">
            <article className="group flex h-full flex-col border border-hairline-on-bone bg-bone-100">
              <div className="relative aspect-[16/10] border-b border-hairline-on-bone bg-bone-200">
                <span className="absolute left-4 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-on-bone-muted">
                  Image · {FEATURED.dimension}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bronze-600">
                  {FEATURED.dimension} · {FEATURED.kind}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-ink-on-bone md:text-3xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed">
                  {FEATURED.blurb}
                </p>
                <p className="mt-auto pt-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-on-bone-muted">
                  In draft
                </p>
              </div>
            </article>
          </Reveal>

          {/* Stack */}
          <ul className="flex flex-col gap-5 md:col-span-5">
            {STACK.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i + 1) * 70} className="flex-1">
                <article className="flex h-full gap-5 border border-hairline-on-bone bg-bone-100 p-5">
                  <div className="relative w-20 shrink-0 self-stretch bg-bone-200 sm:w-24" aria-hidden="true" />
                  <div className="flex flex-col">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bronze-600">
                      {p.dimension} · {p.kind}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-[1.2] text-ink-on-bone">
                      {p.title}
                    </h3>
                    <p className="mt-auto pt-3 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-on-bone-muted">
                      In draft
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>

        <Link
          href="/ideas"
          className="group mt-12 inline-flex items-center gap-3 border border-ink-on-bone/25 px-6 py-3.5 text-[0.9375rem] text-ink-on-bone transition-colors hover:border-ink-on-bone hover:bg-bone-100"
        >
          Explore all ideas
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </Container>
    </section>
  )
}
