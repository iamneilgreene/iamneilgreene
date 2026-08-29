import Container from '@/components/layout/Container'

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-[0.09] blur-3xl"
        style={{ background: 'radial-gradient(circle, #3d6fe5 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <Container className="relative">
        <p className="label label-bronze">{eyebrow}</p>
        <h1 className="mt-7 max-w-3xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-body">{lead}</p>
        )}
        {children}
      </Container>
    </section>
  )
}
