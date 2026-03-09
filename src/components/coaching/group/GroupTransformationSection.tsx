import PageContainer from '@/components/layout/PageContainer'

const transformations = [
  {
    title: 'Momentum Builds',
    body: 'The stop-start cycle begins to break. What has been delayed, avoided, or repeatedly restarted begins to move with more consistency.',
  },
  {
    title: 'Discipline Stabilizes',
    body: 'Standards stop depending on mood. Habits tighten, routines strengthen, and drift has less room to hide.',
  },
  {
    title: 'Excuses Shrink Faster',
    body: 'A serious room makes self-negotiation harder to protect. What has been rationalized alone becomes easier to confront in motion.',
  },
  {
    title: 'Execution Improves',
    body: 'Men begin to move with more clarity, more follow-through, and less internal resistance.',
  },
  {
    title: 'Brotherhood Deepens',
    body: 'The room itself becomes part of the correction. Men are sharpened by the standard around them, not only by willpower inside them.',
  },
]

export default function GroupTransformationSection() {
  return (
    <section className="relative bg-[#eae5dc] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              The Outcome
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              What Changes Through the Cohort
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#3d3530]">
              The cohort is built to create movement. Not temporary motivation, and not
              surface-level accountability, but a measurable shift in how a man carries
              discipline, executes under pressure, and moves inside a stronger standard.
            </p>
          </div>

          <div className="border border-[#cfc8bb]">
            {transformations.map((t, i) => (
              <div
                key={t.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < transformations.length - 1 ? 'border-b border-[#cfc8bb]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#cfc8bb]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#1a1a1a]">
                  {t.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6b6158]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#6b6158]">
              The cohort changes a man by changing the room he moves in, the standards he submits
              to, and the pace at which drift is allowed to survive.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
