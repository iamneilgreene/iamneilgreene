import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Wire to Private Coaching application form when ready
const PRIVATE_COACHING_HREF = '/contact'

// TODO: Wire to Group Coaching Cohort application form when ready
const COHORT_HREF = '/contact'

const fits = [
  {
    label: 'Apply for Private Coaching if...',
    cta: 'Apply for Private Coaching',
    href: PRIVATE_COACHING_HREF,
    variant: 'primary' as const,
    items: [
      'you want direct access and personalized correction',
      'you need the highest level of accountability',
      'you are ready for close support and honest challenge',
      'you want the fastest, most precise path inside Forged By War',
    ],
  },
  {
    label: 'Apply for the Cohort if...',
    cta: 'Apply for the Next Cohort',
    href: COHORT_HREF,
    variant: 'gold-outline' as const,
    items: [
      'you want real coaching, but not full private access',
      'you move well inside a serious group environment',
      'you want a 12-week container built for structure and movement',
      'you want challenge, accountability, and momentum in a room',
    ],
  },
  {
    label: 'Join the Brotherhood if...',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'secondary' as const,
    items: [
      'you need a stronger environment first',
      'you want accountability without entering a coaching container yet',
      'you know isolation has been feeding inconsistency',
      'you need a serious first step, not more content',
    ],
  },
]

export default function FitGuidanceSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a9590]">
              Self-Assessment
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Who Should Apply for What
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              If you are unsure where to start, use this as a simple filter. The goal is not to
              choose the highest tier. The goal is to choose the container most likely to move you.
            </p>
          </div>

          <div className="grid gap-px bg-[#2e2e2e] md:grid-cols-3">
            {fits.map((fit) => (
              <div
                key={fit.label}
                className="flex flex-col gap-6 bg-[#141414] p-8"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                  {fit.label}
                </p>
                <ul className="flex flex-col gap-3 flex-1">
                  {fit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#9a9590]">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href={fit.href} variant={fit.variant} size="sm">
                  {fit.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The best choice is the one that meets your honesty, not your ego.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
