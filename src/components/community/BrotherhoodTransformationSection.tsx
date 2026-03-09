import PageContainer from '@/components/layout/PageContainer'

const transformations = [
  {
    title: 'Isolation Weakens',
    body: 'The habit of carrying everything alone begins to break. Men stay connected to a stronger room instead of disappearing back into private inconsistency.',
  },
  {
    title: 'Standards Stay Visible',
    body: 'What matters stops getting buried under busyness, comfort, and distraction. The standard stays in sight longer.',
  },
  {
    title: 'Momentum Lasts Longer',
    body: 'Instead of moving in short bursts and falling off again, men stay closer to consistent forward movement.',
  },
  {
    title: 'Excuses Lose Ground',
    body: 'What felt easy to rationalize in isolation becomes harder to protect when other men are moving with more honesty and intention.',
  },
  {
    title: 'Readiness Increases',
    body: 'Some men enter the Brotherhood needing a stronger room first. Over time, that room helps clarify whether they are ready for deeper coaching and greater correction.',
  },
]

export default function BrotherhoodTransformationSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Outcome
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What Changes in the Brotherhood
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The Brotherhood is built to change what happens when a man is left alone with drift.
              It does not replace coaching, but it does change the environment, the reinforcement,
              and the standard surrounding him. That alone changes what he is likely to tolerate,
              repeat, and become.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {transformations.map((t, i) => (
              <div
                key={t.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < transformations.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {t.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              A stronger environment does not do the work for a man. It makes it harder for him
              to keep escaping it.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
