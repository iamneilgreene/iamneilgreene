import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const paths = [
  {
    title: 'Private Coaching',
    body: 'For men who want direct access, personalized correction, and close accountability to rebuild discipline, leadership, strength, and clarity with precision.',
    cta: 'Work With Neil',
    href: '/coaching/private',
    variant: 'primary' as const,
    highlight: true,
  },
  {
    title: 'The Brotherhood',
    body: 'For men who need a stronger environment, sharper proximity, and a community that refuses to let drift become normal.',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'gold-outline' as const,
    highlight: false,
  },
  {
    title: 'Ignite',
    body: 'For men who need a practical starting point to rebuild physical discipline, consistency, and self-command before stepping into deeper work.',
    cta: 'Get the Book',
    href: '/book',
    variant: 'secondary' as const,
    highlight: false,
  },
  {
    title: 'Speaking Engagements',
    body: 'For leaders, teams, and organizations that need a message on discipline, accountability, resilience, leadership, and execution under pressure.',
    cta: 'Book Neil to Speak',
    href: '/contact',
    variant: 'secondary' as const,
    highlight: false,
  },
]

export default function StructureSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              Paths to Work Together
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              How the Work Is Structured
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#6b6158]">
              Not every man needs the same level of access. Not every room needs the same message.
              But every path Neil offers is built around the same foundation: structure,
              accountability, and a standard that holds when pressure rises.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((path) => (
              <div
                key={path.title}
                className={`flex flex-col gap-5 border p-8 bg-[#0d0d0d] ${
                  path.highlight ? 'border-[#b8975a]/30' : 'border-[#2e2e2e]'
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-[#f4f1ec]">
                  {path.title}
                </h3>
                <span className="block h-px bg-[#2e2e2e]" />
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
          <div className="text-center">
            <p className="font-display text-base italic text-[#6b6158]">
              Different doors. One standard.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
