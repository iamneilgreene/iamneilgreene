import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const steps = [
  {
    title: 'Submit Your Application',
    body: 'Start by sharing where you are, what is slipping, and what kind of support you are looking for.',
  },
  {
    title: 'Review and Fit Assessment',
    body: 'Applications are reviewed to determine whether Forged By War Private is the right level of support for your current needs and readiness.',
  },
  {
    title: 'Next-Step Conversation',
    body: 'If there is alignment, the next step is a direct conversation to determine fit, expectations, and whether private coaching is the right path forward.',
  },
  {
    title: 'Begin the Work',
    body: 'If accepted, the engagement begins with clarity, structure, and a coaching container built to move quickly and hold under pressure.',
  },
]

export default function ApplicationProcessSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Next Step
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Application Process
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Private coaching begins with an application, not because access needs to feel
              exclusive for the sake of image, but because the right fit matters. This work is
              strongest when the man entering it is ready for correction, accountability, and the
              standard it requires.
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
              The application is not there to create distance. It is there to protect the quality
              of the work.
            </p>
            <Button href="/apply" variant="primary" size="md" className="shrink-0">
              Apply for Private Coaching
            </Button>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
