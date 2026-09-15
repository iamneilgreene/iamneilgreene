import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function IdeasSection() {
  return (
    <section className="border-t border-hairline-on-bone bg-bone-50 py-14 text-ink-on-bone-body md:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center md:gap-20">
          <h2 className="max-w-lg font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-ink-on-bone md:text-4xl">
            Ideas that expand capability.
          </h2>
          <div>
            <p className="max-w-lg text-base leading-relaxed">
              The first essays are in development. Explore the four areas that
              will guide the library, or explore Neil’s books.
            </p>
            <Link href="/ideas" className="mt-4 inline-flex min-h-11 items-center gap-3 text-sm text-ink-on-bone underline underline-offset-8 hover:text-bronze-600">
              See the Ideas topics <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
