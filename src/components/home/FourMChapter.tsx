'use client'

import Link from 'next/link'
import Container from '@/components/layout/Container'
import FourMPlate from '@/components/capability/FourMPlate'
import { useScrollProgress, segment } from '@/lib/useScrollProgress'
import { DIMENSIONS, type MKey } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * Core Question + Four M as one chapter.
 *
 * The Core Question is no longer its own screen. It is
 * State 0 of the Four M scrollytelling sequence, then Mind, Means, Measure,
 * Mastery, then the assembled system. One sticky stage, ~360vh of scroll.
 *
 * Left 35–40% carries the state text; right carries the Core. Every state's
 * words are real HTML at every scroll position.
 */
export default function FourMChapter() {
  const { ref, progress } = useScrollProgress<HTMLElement>()

  // question, four dimensions, assembled
  const STATES = DIMENSIONS.length + 2
  // Section is STATES × 60svh tall; the hook's 0→1 spans entry to exit, so
  // remap onto the pinned range only (top at 0 → bottom at viewport top).
  const H = STATES * 0.6
  const pinned = segment(progress, 1 / (H + 1), H / (H + 1))
  const index = Math.min(STATES - 1, Math.floor(pinned * STATES))

  const isQuestion = index === 0
  const dimIndex = index - 1
  const assembled = index === STATES - 1
  const active: MKey | null =
    isQuestion || assembled ? null : DIMENSIONS[dimIndex].key

  // RESPONSIBILITY gains weight across the opening state
  const load = segment(pinned, 0.0, 1 / STATES)
  const weight = Math.round(500 + load * 400)

  return (
    <>
    {/* Below lg: stacked chapters, no sticky (the spec forbids a 400vh
        pinned experience on mobile). Same order, same words. */}
    <StackedChapter />

    <section
      ref={ref}
      id="four-m"
      className="relative hidden bg-ink-900 lg:block"
      style={{ height: `${STATES * 60}svh` }}
      aria-label="The Core Question and the Four Dimensions of Capability"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div
          className="absolute left-0 top-0 h-0.5 bg-cobalt-500/70"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />

        <Container className="w-full">
          <div
            className={cn(
              'grid items-center gap-10 transition-[grid-template-columns] duration-700',
              isQuestion ? 'lg:grid-cols-1' : 'lg:grid-cols-[1fr_0.92fr]',
              'lg:gap-16'
            )}
          >
            <div className="relative min-h-[26rem] md:min-h-[28rem]">
              {/* State 0 — the question */}
              <div
                className={cn(
                  'absolute inset-x-0 top-0 transition-all duration-500 ease-out',
                  isQuestion ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
                )}
                aria-hidden={!isQuestion}
              >
                <h2 className="font-display leading-[1.06] tracking-[-0.03em] text-bone-50">
                  <span className="block text-2xl font-medium text-text-muted sm:text-3xl md:text-4xl">
                    When
                  </span>
                  <span
                    className="block text-[2.5rem] uppercase leading-[0.92] tracking-[-0.04em] sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem]"
                    style={{
                      fontVariationSettings: `"wght" ${weight}, "opsz" 40`,
                      transform: `scale(${1 + load * 0.04})`,
                      transformOrigin: 'left center',
                    }}
                  >
                    Responsibility
                  </span>
                  <span className="block text-2xl font-medium text-text-muted sm:text-3xl md:text-4xl">
                    calls, are you capable of{' '}
                    <em className="not-italic text-bone-50">answering?</em>
                  </span>
                </h2>
                <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
                  Responsibility is the obligation to answer. Capability
                  determines the quality of that answer.
                </p>
              </div>

              {/* States 1–4 — the dimensions */}
              {DIMENSIONS.map((d, i) => (
                <div
                  key={d.key}
                  className={cn(
                    'absolute inset-x-0 top-0 transition-all duration-500 ease-out',
                    dimIndex === i
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-3 opacity-0'
                  )}
                  aria-hidden={dimIndex !== i}
                >
                  <h3 className="font-display text-5xl font-bold uppercase tracking-[-0.03em] text-bone-50 sm:text-6xl md:text-7xl">
                    {d.name}
                  </h3>
                  <p className="mt-5 font-display text-2xl font-semibold italic text-bronze-400 md:text-3xl">
                    {d.question}
                  </p>
                  <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-text-body">
                    {d.essence}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {d.covers.map((c) => (
                      <li
                        key={c}
                        className="border border-hairline px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate-500"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Final state — assembled */}
              <div
                className={cn(
                  'absolute inset-x-0 top-0 transition-all duration-500 ease-out',
                  assembled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
                )}
                aria-hidden={!assembled}
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-500">
                  Mind • Means • Measure • Mastery
                </p>
                <h3 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-5xl">
                  Four dimensions.
                  <br />
                  One capability system.
                </h3>
                <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-text-body">
                  You do not need to be a ten in everything. But your capability
                  has to keep pace with your responsibility. If one dimension
                  falls far behind, responsibility eventually finds the gap.
                </p>
                <Link
                  href="/capability"
                  className="mt-8 inline-flex items-center gap-2 border-b border-cobalt-500/50 pb-1 text-sm text-cobalt-300 transition-colors hover:border-cobalt-400 hover:text-cobalt-400"
                >
                  See the Four M framework
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* The Core is absent during the question — typography and
                negative space only — and enters with Mind. */}
            {!isQuestion && (
              <div className="enter-fade relative order-first aspect-square w-full max-w-lg justify-self-center lg:order-none">
                <FourMPlate active={active} className="h-full w-full" />
              </div>
            )}
          </div>

          {/* Progress rail — question, four dimensions, whole */}
          <div className="mt-10 flex items-center gap-6 lg:mt-14">
            {['?', ...DIMENSIONS.map((d) => d.name), 'Whole'].map((label, i) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'h-1.5 w-1.5 transition-colors duration-300',
                    index === i ? 'bg-cobalt-400' : index > i ? 'bg-slate-600' : 'bg-ink-600'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors',
                    index === i ? 'text-bone-50' : 'text-slate-600'
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
    </>
  )
}

function StackedChapter() {
  return (
    <div className="bg-ink-900 lg:hidden" aria-label="The Core Question and the Four Dimensions of Capability">
      <Container>
        <div className="py-20 md:py-24">
          <h2 className="font-display leading-[1.06] tracking-[-0.03em] text-bone-50">
            <span className="block text-2xl font-medium text-text-muted sm:text-3xl">When</span>
            <span className="block text-[2.5rem] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] sm:text-6xl">
              Responsibility
            </span>
            <span className="block text-2xl font-medium text-text-muted sm:text-3xl">
              calls, are you capable of <em className="not-italic text-bone-50">answering?</em>
            </span>
          </h2>
          <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
            Responsibility is the obligation to answer. Capability determines
            the quality of that answer.
          </p>
        </div>

        {DIMENSIONS.map((d) => (
          <article key={d.key} className="grid gap-8 border-t border-hairline py-14 sm:grid-cols-[1fr_1fr] sm:items-center md:py-20">
            <div>
              <h3 className="font-display text-5xl font-bold uppercase tracking-[-0.03em] text-bone-50 sm:text-6xl">{d.name}</h3>
              <p className="mt-4 font-display text-2xl font-semibold italic text-bronze-400">{d.question}</p>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-text-body">{d.essence}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {d.covers.map((c) => (
                  <li key={c} className="border border-hairline px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate-500">{c}</li>
                ))}
              </ul>
            </div>
            <div className="mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[22rem]">
              <FourMPlate active={d.key} className="h-full w-full" />
            </div>
          </article>
        ))}

        <div className="border-t border-hairline py-16 md:py-20">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-500">Mind • Means • Measure • Mastery</p>
          <h3 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-bone-50">
            Four dimensions.<br />One capability system.
          </h3>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
            You do not need to be a ten in everything. But your capability has
            to keep pace with your responsibility. If one dimension falls far
            behind, responsibility eventually finds the gap.
          </p>
          <Link href="/capability" className="mt-8 inline-flex items-center gap-2 border-b border-cobalt-500/50 pb-1 text-sm text-cobalt-300">
            See the Four M framework <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
