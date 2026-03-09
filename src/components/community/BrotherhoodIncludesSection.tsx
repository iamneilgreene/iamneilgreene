import PageContainer from '@/components/layout/PageContainer'

const items = [
  {
    title: 'Accountability and Brotherhood',
    body: 'A room where men stay connected to a stronger standard and stop carrying the fight alone.',
  },
  {
    title: 'Guided Challenges and Prompts',
    body: 'Structured touchpoints that keep forward movement active instead of leaving men to drift between bursts of motivation.',
  },
  {
    title: 'Live Sessions',
    body: 'Opportunities to stay near the message, the standard, and the room through consistent engagement.',
  },
  {
    title: 'Ongoing Reinforcement',
    body: 'A place where habits, standards, and direction are strengthened through proximity and repetition.',
  },
  {
    title: 'Path Into Deeper Work',
    body: 'For men who realize they need more correction, more access, or a stronger coaching container, the Brotherhood creates a clear next step.',
  },
]

export default function BrotherhoodIncludesSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Environment
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What This Includes
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The Brotherhood is built to keep men close to the standard. While it is lighter than
              private coaching and the cohort, it is still designed to create movement, reinforce
              accountability, and keep isolation from taking over again.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < items.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The Brotherhood is not built to entertain you. It is built to keep you near the
              standard long enough for drift to lose ground.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
