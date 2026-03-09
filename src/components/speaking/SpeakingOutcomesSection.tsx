import PageContainer from '@/components/layout/PageContainer'

const outcomes = [
  {
    title: 'Sharper Ownership',
    body: 'People leave with a clearer understanding of what accountability actually looks like when pressure rises.',
  },
  {
    title: 'Higher Standards',
    body: 'The room is challenged to see where comfort, tolerated weakness, and quiet compromise have been lowering performance.',
  },
  {
    title: 'Stronger Execution',
    body: 'The message pushes people toward action, not just agreement, by making the cost of drift harder to ignore.',
  },
  {
    title: 'More Honest Leadership',
    body: 'Leaders are forced to confront the gap between what they expect publicly and what they tolerate privately.',
  },
  {
    title: 'A More Memorable Standard',
    body: 'The room leaves with language, ideas, and frames that continue working after the event ends.',
  },
]

export default function SpeakingOutcomesSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Outcome
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What the Room Walks Away With
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Neil&rsquo;s goal is not to give a room a temporary lift. It is to leave people
              thinking more clearly, owning more fully, and seeing standards with less tolerance for
              excuses than when they walked in.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {outcomes.map((outcome, i) => (
              <div
                key={outcome.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < outcomes.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {outcome.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">{outcome.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              A strong talk should not just move a room emotionally. It should raise what that room
              is willing to accept from itself.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
