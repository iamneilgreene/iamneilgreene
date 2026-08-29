import Image from 'next/image'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { CTA_PRIMARY, CTA_SECONDARY, DIMENSIONS } from '@/lib/constants'

/**
 * SECTION 1 — HERO
 *
 * The philosophy is the headline. Neil is the proof standing next to it.
 *
 * No 3D, no ornament. The portrait runs tall and bleeds off the right edge
 * of the viewport the way a cover subject does; the ink ground and the
 * photograph's own ink ground are the same colour, so the image reads as
 * lit from inside the page rather than pasted onto it.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 lg:min-h-[94svh]">
      {/* ── Portrait: full-height on desktop, anchored to the right edge ── */}
      <div className="enter-fade absolute inset-y-0 right-0 hidden w-[46%] lg:block xl:w-[44%]" style={{ animationDelay: '0.25s' }}>
        <Image
          src="/images/neil-hero-v10m.webp"
          alt="Neil Greene"
          fill
          priority
          sizes="46vw"
          className="object-cover object-[center_18%]"
        />
        {/* Blend the photograph's left edge into the page ground */}
        <div
          className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-ink-900 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent"
          aria-hidden="true"
        />
      </div>

      <Container className="relative">
        <div className="flex min-h-[inherit] flex-col justify-center pt-28 pb-10 md:pt-36 lg:max-w-[56%] lg:pt-40 lg:pb-24">
          <p className="enter label label-bronze">Neil Greene</p>

          <h1 style={{ animationDelay: '0.12s' }} className="enter mt-7 font-display text-[clamp(2.875rem,6.4vw,5.75rem)] font-bold leading-[0.98] tracking-[-0.038em] text-bone-50">
            Responsibility
            <br />
            demands
            <br />
            <span className="italic text-bronze-400">capability.</span>
          </h1>

          <div className="enter mt-9 max-w-xl border-l border-hairline-bright pl-6" style={{ animationDelay: '0.28s' }}>
            <p className="text-[1.0625rem] leading-relaxed text-text-body md:text-lg">
              Ideas, systems, and experiences for builders, leaders, and people
              carrying meaningful responsibility who want to expand what they
              can understand, access, handle, and lead.
            </p>
          </div>

          <div className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '0.4s' }}>
            <Button href={CTA_PRIMARY.href} variant="primary" size="lg">
              {CTA_PRIMARY.label}
            </Button>
            <Button href={CTA_SECONDARY.href} variant="secondary" size="lg">
              {CTA_SECONDARY.label}
            </Button>
          </div>

          {/* The framework, stated once, in the system's technical voice */}
          <ul className="enter mt-14 flex flex-wrap items-center gap-x-3 gap-y-2" style={{ animationDelay: '0.52s' }}>
            {DIMENSIONS.map((d, i) => (
              <li key={d.key} className="flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-500">
                  {d.name}
                </span>
                {i < DIMENSIONS.length - 1 && (
                  <span className="text-slate-600" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile: the portrait gets its own full-width block below the copy */}
        <div className="relative -mx-6 aspect-[4/5] sm:mx-0 sm:aspect-[4/3] md:aspect-[16/10] lg:hidden">
          <Image
            src="/images/neil-hero-v10m.webp"
            alt="Neil Greene"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_18%] sm:object-[center_28%]"
          />
          <div
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900 to-transparent"
            aria-hidden="true"
          />
        </div>
      </Container>
    </section>
  )
}
