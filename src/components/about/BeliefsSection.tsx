import PageContainer from '@/components/layout/PageContainer'

const beliefs = [
  {
    statement: 'Discipline is not a feeling. It is a standard.',
    body: 'What holds a man together under pressure is not what he feels in the moment. It is what he has trained, repeated, and made non-negotiable.',
  },
  {
    statement: 'Private standards become public consequences.',
    body: 'What a man tolerates in private eventually shows up in his body, his habits, his leadership, and his relationships.',
  },
  {
    statement: 'Isolation is where drift learns to survive.',
    body: 'A weak environment makes excuses sound reasonable. A strong one shortens denial and restores accountability.',
  },
  {
    statement: 'Strength is not performance. It is alignment.',
    body: 'A man is strongest when his body, habits, responsibilities, and words move under one standard.',
  },
  {
    statement: 'Leadership starts where excuses die.',
    body: 'A man becomes trustworthy when the standard he speaks in public is the same one he lives in private.',
  },
]

export default function BeliefsSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              Core Convictions
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              What Neil Believes
            </h2>
          </div>

          {/* Beliefs list */}
          <div className="flex flex-col border-t border-[#cfc8bb]">
            {beliefs.map((belief, i) => (
              <div
                key={belief.statement}
                className="grid gap-6 border-b border-[#cfc8bb] py-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start"
              >
                {/* Number */}
                <span className="font-display text-4xl font-semibold leading-none text-[#cfc8bb] md:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Statement */}
                <p className="font-display text-lg font-semibold leading-snug text-[#1a1a1a]">
                  {belief.statement}
                </p>
                {/* Body */}
                <p className="text-sm leading-relaxed text-[#6b6158] md:text-base">
                  {belief.body}
                </p>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              This work is built on a simple conviction: men do not need more noise. They need
              stronger standards, sharper accountability, and the courage to live under both.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
