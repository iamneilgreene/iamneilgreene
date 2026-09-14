import Image from 'next/image'
import Link from 'next/link'
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
    <section className="relative overflow-hidden bg-ink-900 lg:min-h-[min(54rem,94svh)]">
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
        <div className="flex min-h-[inherit] flex-col justify-center pt-28 pb-8 md:pt-32 lg:max-w-[56%] lg:pt-40 lg:pb-14">
          <h1 style={{ animationDelay: '0.12s' }} className="enter font-display text-[clamp(2.125rem,11.7vw,4.5rem)] lg:text-[clamp(3.25rem,6.4vw,5.75rem)] font-bold leading-[0.98] tracking-[-0.038em] text-bone-50">
            Responsibility
            <br />
            demands
            <br />
            <span className="italic text-bronze-400">capability.</span>
          </h1>

          <div className="enter mt-7 max-w-[34rem] lg:mt-8" style={{ animationDelay: '0.28s' }}>
            <p className="text-base leading-relaxed text-text-body md:text-lg">
              Ideas, systems, and experiences for builders, leaders, and people
              carrying meaningful responsibility who want to expand what they
              can understand, access, handle, and lead.
            </p>
          </div>

          <div className="enter mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:mt-9 lg:gap-6" style={{ animationDelay: '0.4s' }}>
            <Button href={CTA_PRIMARY.href} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_PRIMARY.label}
            </Button>
            <Link href={CTA_SECONDARY.href} className="inline-flex min-h-11 items-center gap-3 self-center text-sm text-text-primary underline decoration-border-input underline-offset-8 transition-colors hover:text-cobalt-300 sm:self-auto">
              {CTA_SECONDARY.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile: the portrait gets its own full-width block below the copy */}
        <div className="relative -mx-6 aspect-[1/1] sm:mx-0 sm:aspect-[4/3] md:aspect-[16/10] lg:hidden">
          <Image
            src="/images/neil-hero-v10m.webp"
            alt="Neil Greene"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_24%] sm:object-[center_28%]"
          />
          <div
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900 to-transparent"
            aria-hidden="true"
          />
        </div>
      </Container>
      <Container className="relative pb-10 lg:pb-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-7 lg:grid-cols-4 lg:gap-8">
          {DIMENSIONS.map((d) => (
            <li key={d.key}>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze-400">{d.name}</p>
              <p className="mt-2 text-sm text-text-body">{d.question}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
