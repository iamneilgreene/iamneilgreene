import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Reveal from '@/components/ui/Reveal'
import { BOOKS } from '@/lib/constants'

/**
 * Books as a compact module attached to Ideas.
 *
 * 30–40vh, two book objects side by side with breathing room, one bridge
 * line, one CTA. An authority artifact inside the Ideas ecosystem, not a
 * separate immersive chapter. Stays on bone so it reads as part of Ideas.
 */
export default function BooksModule() {
  return (
    <section className="border-t border-hairline-on-bone bg-bone-100 py-16 text-ink-on-bone-body md:py-20">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <p className="max-w-sm font-display text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-ink-on-bone md:text-3xl">
              Two subjects. The same underlying question: what makes people
              more capable?
            </p>
            <Link
              href="/books"
              className="group mt-7 inline-flex items-center gap-2 border-b border-bronze-600/50 pb-1 text-sm text-ink-on-bone transition-colors hover:border-bronze-600"
            >
              Explore the books
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <ul className="grid grid-cols-2 gap-8 md:gap-10">
            {BOOKS.map((book, i) => (
              <Reveal as="li" key={book.slug} delay={i * 90}>
                <Link href={`/books/${book.slug}`} className="group block">
                  <div className="relative mx-auto aspect-[2/3] w-full max-w-[11rem] border border-hairline-on-bone bg-bone-200 shadow-xl shadow-black/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                    {book.cover ? (
                      <Image src={book.cover} alt={`${book.title} cover`} fill sizes="11rem" className="object-cover" />
                    ) : (
                      <div className="flex h-full flex-col justify-between bg-ink-900 p-4">
                        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slate-500">Neil Greene</span>
                        <span className="font-display text-2xl font-semibold uppercase leading-none text-bone-50">{book.title}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-5 text-center font-display text-lg font-semibold uppercase tracking-[0.04em] text-ink-on-bone">
                    {book.title}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
