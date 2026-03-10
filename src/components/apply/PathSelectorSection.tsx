import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const APPLICATION_HREF = '/apply/form'

const paths = [
  {
    title: 'Private Coaching',
    body: 'For men who want direct access, personalized correction, and the highest level of support inside Forged By War.',
    cta: 'Apply for Private Coaching',
    href: APPLICATION_HREF,
    variant: 'primary' as const,
  },
  {
    title: 'Group Coaching Cohort',
    body: 'For men who want live coaching, a serious room, and a defined 12-week container built for movement and accountability.',
    cta: 'Apply for the Next Cohort',
    href: APPLICATION_HREF,
    variant: 'gold-outline' as const,
  },
  {
    title: 'Brotherhood',
    body: 'For men who need a stronger environment, a clear first step, and a room that keeps drift from growing in isolation.',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'secondary' as const,
  },
]

export default function PathSelectorSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Paths
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Choose Your Path
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The right next step is not the one that sounds most impressive. It is the one that
              matches the level of structure, correction, and accountability you actually need right
              now.
            </p>
          </div>

          <div className="border border-[#2e2e2e] md:grid md:grid-cols-3 md:divide-x md:divide-[#2e2e2e]">
            {paths.map((path, i) => (
              <div
                key={path.title}
                className={`flex flex-col gap-5 p-8 ${
                  i < paths.length - 1 ? 'border-b border-[#2e2e2e] md:border-b-0' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {path.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#9a9590]">{path.body}</p>
                <Button href={path.href} variant={path.variant} size="sm">
                  {path.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              Choose the path that fits the work you are ready to do, not the image you want to
              protect.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
