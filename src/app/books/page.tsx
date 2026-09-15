import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import PageHero from '@/components/shared/PageHero'
import { BOOKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Exposed and Ignite: the same question worked out in two different domains.',
}

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Books"
        title="The same question, worked out in two different domains."
        lead="These are not leftovers from earlier brands. They are evidence that the Capability worldview has been developing across different subjects for years."
      />

      <Section ground="ink-sunken" topRule>
        <ul className="grid gap-12 md:grid-cols-2 md:gap-16">
          {BOOKS.map((book) => (
            <li key={book.slug}>
              <Link href={`/books/${book.slug}`} className="group block">
                <div className="relative aspect-[2/3] max-w-xs border border-hairline bg-ink-850 transition-transform duration-300 group-hover:-translate-y-1">
                  {book.cover ? (
                    <Image
                      src={book.cover}
                      alt={`${book.title} cover`}
                      fill
                      sizes="20rem"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col justify-between p-6">
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-slate-500">
                        Neil Greene
                      </span>
                      <span className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.02em] text-bone-50">
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>

                <h2 className="mt-6 font-display text-3xl font-bold text-bone-50">
                  {book.title}
                </h2>
                {'subtitle' in book && book.subtitle && (
                  <p className="mt-1 text-sm text-text-muted">{book.subtitle}</p>
                )}
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-text-body">
                  {book.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-cobalt-300 transition-colors group-hover:text-cobalt-400">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
