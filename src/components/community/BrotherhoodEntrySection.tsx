import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const SKOOL_URL = 'https://www.skool.com/forged-by-war-2309/about'

const steps = [
  {
    title: 'Join the Brotherhood',
    body: 'Enter the room, step near the standard, and stop trying to rebuild in isolation.',
  },
  {
    title: 'Engage With the Environment',
    body: 'Use the accountability, live sessions, prompts, and brotherhood to stay close to forward movement and stronger habits.',
  },
  {
    title: 'Let the Room Do Its Work',
    body: 'Over time, the environment starts to expose what isolation was protecting and strengthens what drift was wearing down.',
  },
  {
    title: 'Move Into Deeper Work When Ready',
    body: 'If the Brotherhood reveals that you need more correction, more support, or a stronger coaching container, the next step becomes clear.',
  },
]

export default function BrotherhoodEntrySection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Next Step
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              How to Enter
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The Brotherhood is the clearest entry point for men who need a stronger room before
              they need a stronger coaching container. Joining is simple, but the reason for
              joining should be serious.
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
              The easiest way to keep drifting is to stay alone. The simplest way to change that
              is to enter a stronger room.
            </p>
            <Button href={SKOOL_URL} variant="primary" size="md" className="shrink-0">
              Join the Brotherhood
            </Button>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
