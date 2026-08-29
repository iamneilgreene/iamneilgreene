import Image from 'next/image'
import Container from '@/components/layout/Container'
import Reveal from '@/components/ui/Reveal'

/**
 * Proof of Range — the film, then the index.
 *
 * The wireframe asks for 6–9 editorial frames, written with a real photo
 * shoot in mind. Neil's call (2026-08-29): until that shoot exists, one
 * film and the text index carry the section — a wall of generated
 * portraits works against trust. The mosaic returns when real frames do.
 *
 * The film slot is reserved for Neil's real clip of him speaking to a room
 * of men; until it lands the poster still stands in and the play
 * affordance says so.
 */

const RANGE_INDEX = [
  ['Technology and risk', 'Cybersecurity taught a way of thinking about risk, resilience, and failure points that applies well beyond a network.'],
  ['Two books, two domains', 'Exposed went deeper into digital risk and leadership. Ignite went deeper into performance and discipline.'],
  ['Building and advising', 'Business taught value, leverage, relationships, and the discipline of creating options instead of depending on one door.'],
  ['Capacity, not appearance', 'Training so the body supports responsibility rather than becoming one more limitation to manage.'],
  ['Teaching in the open', 'Studying, testing, and publishing what actually makes people more capable.'],
  ['Responsibility that does not negotiate', 'Husband and father. The responsibilities that arrive whether or not capability is ready.'],
] as const

export default function ProofOfRange() {
  return (
    <section className="border-t border-hairline bg-ink-950 py-24 md:py-40">
      <Container>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="font-display text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] text-bone-50 md:text-5xl">
            Not one-dimensional.
            <br />
            Not random.
          </h2>
          <p className="max-w-md text-[1.0625rem] leading-relaxed text-text-body md:pb-2">
            The subjects are different. The question is the same: does this
            expand what you can understand, access, handle, or lead?
          </p>
        </div>
      </Container>

      <Container width="wide" className="mt-16 md:mt-20">
        <Reveal>
          <figure className="group relative aspect-video overflow-hidden border border-hairline md:aspect-[21/9]">
            <Image
              src="/images/neil-room-v3.webp"
              alt="Neil Greene speaking to a room of men"
              fill
              sizes="96rem"
              className="object-cover object-[center_30%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center border border-bone-50/70 bg-ink-950/55 transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                  <path d="M1 1.5v17l16-8.5L1 1.5Z" fill="var(--color-bone-50)" />
                </svg>
              </span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-7">
              <span className="font-display text-xl font-semibold text-bone-50 md:text-2xl">
                In the room.
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-slate-400">
                Film · Clip arriving
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>

      <Container>
        {/* The index. Text, not cards: many subjects, one question. */}
        <div className="mt-16 grid gap-x-16 gap-y-0 md:mt-20 md:grid-cols-2">
          {RANGE_INDEX.map(([title, body], i) => (
            <Reveal key={title} delay={i * 40} className="border-t border-hairline py-5">
              <div className="flex gap-5">
                <span className="font-mono text-[0.625rem] tabular-nums leading-6 text-bronze-500">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-bone-50">{title}</h3>
                  <p className="mt-1 max-w-md text-[0.875rem] leading-relaxed text-text-muted">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
