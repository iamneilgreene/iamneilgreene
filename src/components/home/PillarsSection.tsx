import PageContainer from '@/components/layout/PageContainer'

const pillars = [
  {
    number: '01',
    title: 'Discipline',
    copy: 'You stop relying on motivation and start operating by standard, structure, and repetition.',
  },
  {
    number: '02',
    title: 'Strength',
    copy: 'You rebuild your body, your edge, and your physical command so you stop carrying yourself like a man who has accepted decline.',
  },
  {
    number: '03',
    title: 'Clarity',
    copy: 'You cut through noise, excuses, and internal drift so your decisions, habits, and direction become sharper.',
  },
  {
    number: '04',
    title: 'Leadership',
    copy: 'You show up with greater consistency at home, at work, and under pressure because your private standards start matching your public responsibilities.',
  },
  {
    number: '05',
    title: 'Brotherhood',
    copy: 'You stop fighting the war alone and step into an environment where accountability, challenge, and forward movement are the norm.',
  },
]

export default function PillarsSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-14">

          {/* Header */}
          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              What We Rebuild
            </span>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                What Drift Breaks, We Rebuild
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#9a9590] lg:text-right">
                Discipline does not collapse all at once. It leaks out through neglected
                standards, private compromises, weakened routines, and a life that starts
                running you instead of the other way around.
              </p>
            </div>
          </div>

          {/* Pillars grid — divided horizontal layout */}
          <div className="border border-[#2e2e2e]">
            <div className="grid grid-cols-1 divide-y divide-[#2e2e2e] md:grid-cols-5 md:divide-x md:divide-y-0">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex flex-col gap-5 p-8 transition-colors duration-200 hover:bg-[#191919]">
                  <span className="font-display text-4xl font-bold leading-none text-[#252525]">
                    {pillar.number}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-[#f4f1ec]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#9a9590]">{pillar.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing line */}
          <div className="border-t border-[#2e2e2e] pt-7">
            <p className="font-display text-base italic text-[#9a9590]">
              This is not about hype. It is about rebuilding the standards that make power sustainable.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
