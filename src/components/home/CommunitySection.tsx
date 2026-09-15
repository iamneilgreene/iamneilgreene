import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'

export default function CommunitySection() {
  return (
    <section className="border-t border-hairline bg-ink-900 py-16 md:py-24">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 className="max-w-lg font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-4xl">
            Capable men build capable men.
          </h2>
          <div>
            <p className="max-w-lg text-[1.0625rem] leading-relaxed text-text-body">
              A local men&apos;s community is taking shape in the DMV. The pilot
              is designed around trusted relationships, shared experiences,
              useful introductions, and repeated contact.
            </p>
            <Button href="/community" variant="bronze" size="lg" className="mt-7">
              Explore the community pilot
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
