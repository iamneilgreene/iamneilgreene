import Link from 'next/link'
import Container from '@/components/layout/Container'
import FourMPlate from '@/components/capability/FourMPlate'
import { DIMENSIONS } from '@/lib/constants'

/** A readable chapter in every browser: one plate, four continuous entries. */
export default function FourMChapter() {
  return (
    <section id="four-m" className="bg-ink-900 py-20 md:py-28" aria-label="The Four Dimensions of Capability">
      <Container>
        <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-bone-50 md:text-5xl">
          When responsibility calls, are you capable of answering?
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-text-body">
          Responsibility is the obligation to answer. Capability determines the
          quality of that answer. These four questions help you see what you can
          bring to it.
        </p>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="mx-auto w-full max-w-xs lg:sticky lg:top-28 lg:max-w-md motion-reduce:static">
            <FourMPlate className="aspect-square w-full" />
            <p className="mt-5 text-sm leading-relaxed text-text-muted">
              Four dimensions, considered separately. Strength in one should
              never hide a constraint in another.
            </p>
          </div>
          <div>
            {DIMENSIONS.map((d) => (
              <article key={d.key} className="border-t border-hairline py-7 first:pt-0 first:border-t-0">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-bone-50 md:text-4xl">{d.name}</h3>
                  <p className="font-display text-xl font-semibold italic text-bronze-400">{d.question}</p>
                </div>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-text-body">{d.essence}</p>
              </article>
            ))}
            <Link href="/capability" className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-cobalt-300 underline underline-offset-8 transition-colors hover:text-cobalt-400">
              Explore the Four M framework <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
