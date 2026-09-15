import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { BOOKS } from '@/lib/constants'

const DETAIL: Record<string, { lead: string; points: string[] }> = {
  exposed: {
    lead: 'Digital risk, technology, security, and the leadership judgment required when systems fail.',
    points: [
      'Why anything with one point of failure is fragile, in a network and in a life.',
      'How risk, resilience, and failure points actually behave under pressure.',
      'What leaders need to understand about technology they will never personally operate.',
    ],
  },
  ignite: {
    lead: 'Performance, discipline, and resilience for people whose responsibilities arrived before their capacity did.',
    points: [
      'Training so the body supports responsibility instead of becoming another limitation.',
      'Building consistency that survives a bad week rather than depending on a good one.',
      'Why being lean is not the same thing as being capable.',
    ],
  },
}

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const book = BOOKS.find((b) => b.slug === slug)
  if (!book) return {}
  return { title: book.title, description: book.blurb }
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = BOOKS.find((b) => b.slug === slug)
  if (!book) notFound()
  const detail = DETAIL[book.slug]

  return (
    <>
      <section className="bg-ink-900 pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[0.6fr_1fr] md:gap-16">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[16rem] border border-hairline bg-ink-850">
              {book.cover ? (
                <Image
                  src={book.cover}
                  alt={`${book.title} cover`}
                  fill
                  priority
                  sizes="16rem"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col justify-between p-6">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-slate-500">
                    Neil Greene
                  </span>
                  <span className="font-display text-4xl font-bold uppercase leading-none text-bone-50">
                    {book.title}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="label label-bronze">{book.domain}</p>
              <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-6xl">
                {book.title}
              </h1>
              {'subtitle' in book && book.subtitle && (
                <p className="mt-3 font-display text-xl font-semibold italic text-bronze-400">
                  {book.subtitle}
                </p>
              )}
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-body">
                {detail?.lead ?? book.blurb}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {detail && (
        <Section ground="ink-sunken" topRule width="narrow">
          <p className="label">What it covers</p>
          <ul className="mt-6 space-y-5">
            {detail.points.map((p) => (
              <li
                key={p}
                className="border-l border-hairline-bright pl-5 text-[1.0625rem] leading-relaxed text-text-body"
              >
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-12 border border-hairline bg-ink-900 p-6">
            <p className="text-[0.9375rem] leading-relaxed text-text-muted">
              {book.slug === 'ignite'
                ? 'Find the available formats and current price on Amazon.'
                : 'Ask Neil about getting a copy of Exposed.'}
            </p>
            <Button href={book.slug === 'ignite' ? 'https://www.amazon.com/dp/B0DGLKT5RT' : '/contact?reason=other'} variant="primary" size="md" className="mt-5">
              {book.slug === 'ignite' ? 'View Ignite on Amazon' : 'Ask about Exposed'}
            </Button>
          </div>

          <Link
            href="/books"
            className="mt-10 inline-block text-sm text-text-muted transition-colors hover:text-text-primary"
          >
            ← All books
          </Link>
        </Section>
      )}
    </>
  )
}
