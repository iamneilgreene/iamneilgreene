import Link from 'next/link'
import Container from '@/components/layout/Container'

/** Authored work carries evidence; generated scenes do not document events. */
export default function ProofOfRange() {
  return (
    <section className="border-t border-hairline bg-ink-950 py-20 md:py-28">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-20">
          <div>
            <h2 className="max-w-lg font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-5xl">
              Different subjects. Work you can examine.
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-text-body">
              Neil&apos;s writing spans digital risk and physical capacity.
              The books offer two concrete places to explore that range.
            </p>
          </div>
          <div className="divide-y divide-hairline">
            <article className="pb-7">
              <h3 className="font-display text-2xl font-semibold text-bone-50">Exposed</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-text-body">
                Inside Risks and the New Architecture of AI Defense. A book on
                digital risk, technology, and leadership judgment.
              </p>
              <Link href="/books/exposed" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-cobalt-300 underline underline-offset-8 hover:text-cobalt-400">
                View Exposed <span aria-hidden="true">→</span>
              </Link>
            </article>
            <article className="pt-7">
              <h3 className="font-display text-2xl font-semibold text-bone-50">Ignite</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-text-body">
                Fitness Fuel for Working Dads. A book that applies the question
                of physical capacity to the responsibilities of working fathers.
              </p>
              <Link href="/books/ignite" className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-cobalt-300 underline underline-offset-8 hover:text-cobalt-400">
                View Ignite <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </Container>
    </section>
  )
}
