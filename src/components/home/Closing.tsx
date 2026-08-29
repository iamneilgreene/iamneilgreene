import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { CTA_PRIMARY, PHILOSOPHY, MOVEMENT, HANDLE } from '@/lib/constants'

/**
 * SECTION 10 — CLOSING
 *
 * Returns to the Capability Core, now assembled and at rest, and closes on
 * the philosophy. One dominant action; the follow link stays secondary.
 */
export default function Closing() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-ink-950 py-28 md:py-40">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="mt-8 font-display text-[2.5rem] font-bold leading-[1.06] tracking-[-0.03em] text-bone-50 md:text-6xl">
            {PHILOSOPHY.replace(/\.$/, '')}
            <span className="text-bronze-400">.</span>
          </h2>

          <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-slate-500">
            {MOVEMENT}
          </p>

          <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={CTA_PRIMARY.href} variant="primary" size="lg">
              {CTA_PRIMARY.label}
            </Button>
            <a
              href="https://instagram.com/iamneilgreene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Follow {HANDLE}
            </a>
          </div>

          <p className="mt-10 text-[0.8125rem] text-slate-600">
            28 responses. About five minutes. No email required to see your
            initial results.
          </p>
        </div>
      </Container>
    </section>
  )
}
