import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const paths = [
  {
    eyebrow: 'Flagship Offer',
    eyebrowColor: 'text-[#b8975a]',
    title: 'Forged By War Private',
    subtitle: '1-on-1 Coaching',
    body: 'For men who want direct access, personalized correction, and close accountability. This is the highest level of support for men who are ready to rebuild discipline, leadership, strength, and clarity with precision.',
    cta: 'Apply for Private Coaching',
    href: '/coaching/private',
    variant: 'primary' as const,
    borderClass: 'border-[#b8975a]/30',
    accentClass: 'bg-[#b8975a]',
  },
  {
    eyebrow: 'Quarterly Intake',
    eyebrowColor: 'text-[#9a9590]',
    title: 'Forged By War Cohort',
    subtitle: 'Quarterly Group Coaching',
    body: 'For men who want guided structure, live coaching, real accountability, and the force of a room moving under one standard. Built for momentum, correction, and measurable change over 12 focused weeks.',
    cta: 'Apply for the Next Cohort',
    href: '/coaching/group',
    variant: 'gold-outline' as const,
    borderClass: 'border-[#2e2e2e]',
    accentClass: 'bg-[#2e2e2e]',
  },
  {
    eyebrow: 'Community',
    eyebrowColor: 'text-[#9a9590]',
    title: 'Forged By War Brotherhood',
    subtitle: 'Community / Skool',
    body: 'For men who need a stronger environment, sharper proximity, and a brotherhood that refuses to let drift become normal. Built for accountability, connection, consistency, and forward movement.',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'secondary' as const,
    borderClass: 'border-[#2e2e2e]',
    accentClass: 'bg-[#2e2e2e]',
  },
]

export default function PathsSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/20 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Offer
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Three Paths. One Standard.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Not every man needs the same level of access. What matters is choosing the path
              that matches the level of structure, correction, brotherhood, and accountability
              you are ready to carry.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {paths.map((path) => (
              <div
                key={path.title}
                className={`flex flex-col gap-6 border ${path.borderClass} bg-[#181818] p-8`}
              >
                <div className="flex flex-col gap-2">
                  <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${path.eyebrowColor}`}>
                    {path.eyebrow}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#f4f1ec]">
                    {path.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9590]">
                    {path.subtitle}
                  </p>
                </div>

                <span className={`block h-px w-8 ${path.accentClass}`} />

                <p className="flex-1 text-sm leading-relaxed text-[#9a9590]">
                  {path.body}
                </p>

                <Button href={path.href} variant={path.variant} size="md" className="self-start">
                  {path.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="border-t border-[#2e2e2e] pt-7 text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              The wrong path creates friction. The right one creates traction.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
