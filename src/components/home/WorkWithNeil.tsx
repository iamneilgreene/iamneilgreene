import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Reveal from '@/components/ui/Reveal'

/**
 * Work With Neil.
 *
 * The tightened wireframe: "Do not use three generic stock icons. Use one
 * real proof-driven image per pathway." Each column leads with the
 * documentary frame that proves that pathway, then the line and the action.
 */

const PATHS = [
  {
    href: '/work/individuals',
    label: 'For Individuals',
    line: 'Programs, coaching, and development experiences for people whose responsibility has outgrown what they have built to carry it.',
    cta: 'See the work',
    img: {
      src: '/images/neil-table.webp',
      alt: 'Neil Greene in conversation with a small group at a table',
    },
  },
  {
    href: '/work/organizations',
    label: 'For Organizations',
    line: 'AI, cybersecurity, digital risk, strategy, advisory, and workshops for teams that need judgment as much as technology.',
    cta: 'Explore advisory',
    img: {
      src: '/images/neil-org-v2.webp',
      alt: 'Neil Greene leading a workshop in front of a systems diagram',
    },
  },
  {
    href: '/speaking',
    label: 'Speaking',
    line: 'Capability, modern leadership, technology, resilience, and responsibility, for rooms that are past motivation.',
    cta: 'Bring Neil in',
    img: {
      src: '/images/neil-room-v3.webp',
      alt: 'Neil Greene speaking to a seated audience',
    },
  },
] as const

export default function WorkWithNeil() {
  return (
    <section className="border-t border-hairline bg-ink-950 py-24 md:py-40">
      <Container>

        <h2 className="mt-12 max-w-2xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-5xl">
          When the responsibility is real, the work gets specific.
        </h2>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal as="li" key={p.href} delay={i * 80}>
              <Link
                href={p.href}
                className="group flex h-full flex-col border border-hairline bg-ink-950 transition-colors hover:border-hairline-bright"
              >
                <div className="relative aspect-[3/2] overflow-hidden border-b border-hairline">
                  <Image
                    src={p.img.src}
                    alt={p.img.alt}
                    fill
                    sizes="(min-width: 1024px) 26rem, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-[0.625rem] text-slate-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-bone-50">
                    {p.label}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
                    {p.line}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm text-cobalt-300 transition-colors group-hover:text-cobalt-400">
                    {p.cta}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
