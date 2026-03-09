import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const paths = [
  {
    title: 'Private Coaching',
    copy: 'For men who want direct, high-accountability coaching to rebuild strength, structure, discipline, and leadership with precision.',
    cta: 'Apply for Coaching',
    href: '/apply',
  },
  {
    title: 'The Brotherhood',
    copy: 'For men who need a stronger environment, real accountability, and a community built around discipline, standards, and forward movement.',
    cta: 'Join the Brotherhood',
    href: '/community',
  },
  {
    title: 'Speaking Engagements',
    copy: 'For organizations, teams, and event leaders looking for a speaker on discipline, leadership, resilience, and performance under pressure.',
    cta: 'Book Neil to Speak',
    href: '/speaking',
  },
]

export default function PathSelectorSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Start Here
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Three Ways to Step Back Into Discipline
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Whether you need private structure, a brotherhood to sharpen you, or a voice for
              your next event, start where the standard fits.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-0 border border-[#2e2e2e] md:grid-cols-3">
            {paths.map((path, i) => (
              <div
                key={path.title}
                className={`flex flex-col gap-6 p-8 transition-colors duration-200 hover:bg-[#1a1a1a] ${
                  i < 2 ? 'border-b border-[#2e2e2e] md:border-b-0 md:border-r' : ''
                }`}
              >
                {/* Gold accent line at top of each card */}
                <span className="block h-0.5 w-8 bg-[#b8975a]" />

                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-xl font-medium text-[#f4f1ec]">
                    {path.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9a9590]">{path.copy}</p>
                </div>

                <Button href={path.href} variant="ghost" size="sm" className="mt-auto self-start px-0 hover:bg-transparent hover:text-[#b8975a]">
                  {path.cta} &rarr;
                </Button>
              </div>
            ))}
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
