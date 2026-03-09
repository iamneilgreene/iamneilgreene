import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Replace with actual Blueprint download/page path when ready
const BLUEPRINT_HREF = '/resources'

const paths = [
  {
    title: 'Get the Blueprint',
    body: 'For men who want a practical next step and a clearer framework to apply immediately.',
    cta: 'Get the Blueprint',
    href: BLUEPRINT_HREF,
    variant: 'primary' as const,
  },
  {
    title: 'Join the Brotherhood',
    body: 'For men who need a stronger environment, more accountability, and a room that keeps drift from taking over again.',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'gold-outline' as const,
  },
  {
    title: 'Explore Coaching',
    body: 'For men who realize they need deeper correction, more structure, and a higher level of support.',
    cta: 'Explore Coaching',
    href: '/coaching',
    variant: 'secondary' as const,
  },
]

export default function BookBridgeSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              Next Steps
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              What Comes Next After the Book
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#3d3530] max-w-3xl">
            <p>
              For many men, Ignite is the first move. It helps them rebuild physical discipline,
              tighten standards, and regain traction. But for some, the book does more than help
              them restart. It shows them they are ready for a stronger environment and a deeper
              level of accountability.
            </p>
            <p>
              That is where the next step becomes clear. The Forged Father Blueprint gives a
              sharper starting framework. The Brotherhood gives a stronger room. And for men who
              need more structure, the path into coaching is already there.
            </p>
          </div>

          <div className="grid gap-px border border-[#cfc8bb] md:grid-cols-3">
            {paths.map((path) => (
              <div
                key={path.title}
                className="flex flex-col gap-6 bg-[#eae5dc] p-8"
              >
                <h3 className="font-display text-xl font-semibold text-[#1a1a1a]">
                  {path.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#6b6158]">{path.body}</p>
                <Button href={path.href} variant={path.variant} size="md">
                  {path.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#6b6158]">
              The book can stand on its own. But for the right man, it can also be the doorway
              into a stronger standard.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
