import PageContainer from '@/components/layout/PageContainer'

const steps = [
  {
    title: 'Submit the Right Application',
    body: 'Choose the path that fits your current needs and complete the corresponding application or entry step.',
  },
  {
    title: 'Review and Fit Assessment',
    body: 'Your application is reviewed to determine whether the path you selected is the right level of support, structure, and accountability.',
  },
  {
    title: 'Next-Step Direction',
    body: 'If there is alignment, you move into the appropriate next step, whether that means private coaching, the next cohort, or the Brotherhood.',
  },
  {
    title: 'Begin the Work',
    body: 'Once the fit is clear, the focus shifts from decision to movement. The work begins inside the right container.',
  },
]

export default function PostApplyProcessSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Process
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What Happens After You Apply
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Once you choose your path and submit your application, the next step is clarity. The
              goal is not to rush you into a container. It is to make sure the fit is right and the
              next move is honest.
            </p>
          </div>

          <div className="grid gap-px bg-[#2e2e2e] md:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col gap-5 bg-[#0d0d0d] p-8"
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-semibold text-[#f4f1ec]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              A strong next step is not chosen by impulse. It is chosen by fit, honesty, and
              readiness.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
