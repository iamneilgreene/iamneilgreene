import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const steps = [
  {
    title: 'Apply to the Cohort',
    body: 'Start by applying for the next group and sharing where you are, what is slipping, and what kind of support you need.',
  },
  {
    title: 'Enter the 12-Week Container',
    body: 'If accepted, you step into a focused coaching environment with a defined start, shared standard, and a room built for momentum.',
  },
  {
    title: 'Move Through the Work Weekly',
    body: 'The cohort moves through live coaching, accountability, correction, and structured forward movement over the course of the program.',
  },
  {
    title: 'Finish Stronger Than You Started',
    body: 'The goal is not to simply complete a program. It is to leave with tighter standards, stronger habits, and more traction than you had when you entered.',
  },
]

export default function GroupProcessSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Structure
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              How the Cohort Works
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The cohort is built as a defined 12-week coaching container, because serious change
              moves better inside a structure with clear timing, shared standards, and forward
              pressure.
            </p>
          </div>

          <div className="border border-[#2e2e2e] md:grid md:grid-cols-4 md:divide-x md:divide-[#2e2e2e]">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={`flex flex-col gap-5 p-8 ${
                  i < steps.length - 1 ? 'border-b border-[#2e2e2e] md:border-b-0' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {step.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#9a9590]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The container matters because drift survives best where structure is weakest.
            </p>
            <Button href="/apply" variant="gold-outline" size="md" className="shrink-0">
              Apply for the Next Cohort
            </Button>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
