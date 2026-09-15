import Container from '@/components/layout/Container'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function CommunitySection() {
  return (
    <section className="border-t border-hairline bg-ink-900 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <h2 className="max-w-lg font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-4xl">
            Capable men build capable men.
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-text-body">
              A local men&apos;s community is taking shape in the DMV. The pilot
              is designed around trusted relationships, shared experiences,
              useful introductions, and repeated contact.
            </p>
            <Button href="/community" variant="bronze" size="lg" className="mt-7">
              Explore the community pilot
            </Button>
          </div>
          <figure>
            <Image src="/images/community-conversation-v1.webp" alt="An imagined room with an empty table and five chairs." width={1200} height={800} sizes="(min-width: 768px) 45vw, 100vw" className="h-auto w-full" />
            <figcaption className="mt-3 text-sm text-text-muted">An editorial concept for the community pilot.</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
