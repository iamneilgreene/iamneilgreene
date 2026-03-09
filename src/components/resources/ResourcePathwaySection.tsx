import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Wire to Blueprint email opt-in form or landing page when ready
const BLUEPRINT_HREF = '#blueprint'

const paths = [
  {
    title: 'Start With the Blueprint',
    body: 'A practical first move for men who need clarity and structure.',
    cta: 'Get the Blueprint',
    href: BLUEPRINT_HREF,
    variant: 'primary' as const,
  },
  {
    title: 'Go Deeper With the Book',
    body: 'A stronger standard for rebuilding physical discipline and consistency.',
    cta: 'Get the Book',
    href: '/book',
    variant: 'gold-outline' as const,
  },
  {
    title: 'Step Into the Brotherhood',
    body: 'A stronger room for men who need accountability and proximity.',
    cta: 'Join the Brotherhood',
    href: '/community',
    variant: 'secondary' as const,
  },
  {
    title: 'Move Into Coaching',
    body: 'A deeper path for men who need more structure, correction, and support.',
    cta: 'Explore Coaching',
    href: '/coaching',
    variant: 'secondary' as const,
  },
]

export default function ResourcePathwaySection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Path Forward
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Where These Resources Can Lead
            </h2>
          </div>

          <div className="flex flex-col gap-5 max-w-3xl text-base leading-relaxed text-[#9a9590]">
            <p>
              A strong resource should do more than help a man think. It should help him move.
              Sometimes that movement is enough on its own. Other times it reveals that he needs a
              stronger environment, deeper accountability, or a more direct path forward.
            </p>
            <p>
              That is how the Forged By War ecosystem is built. A man may begin with the Blueprint,
              move into the book, step into the Brotherhood, and later realize he is ready for the
              cohort or private coaching. The path is not forced. It becomes clearer as the standard
              rises.
            </p>
          </div>

          <div className="border border-[#2e2e2e] md:grid md:grid-cols-4 md:divide-x md:divide-[#2e2e2e]">
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
              The right resource does not just give a man information. It reveals his next honest
              step.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
