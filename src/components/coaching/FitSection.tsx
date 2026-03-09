import PageContainer from '@/components/layout/PageContainer'

const fits = [
  {
    label: 'Choose Private Coaching if',
    items: [
      'you want direct access and personalized correction',
      'you move fast and want precision',
      'you need close accountability',
      'you are ready for the highest level of support',
    ],
  },
  {
    label: 'Choose the Cohort if',
    items: [
      'you want live coaching with strong structure',
      'you want accountability without going fully private',
      'you work well in a focused group environment',
      'you want measurable progress over 12 weeks',
    ],
  },
  {
    label: 'Choose the Brotherhood if',
    items: [
      'you need a stronger environment first',
      'you want community, accountability, and momentum',
      'you are not ready for a higher-touch coaching commitment yet',
      'you want to stop trying to rebuild in isolation',
    ],
  },
]

export default function FitSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              Making the Right Choice
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Which Path Fits You
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#6b6158]">
              The best path is not the most expensive one. It is the one that matches the level
              of correction, access, and accountability you need right now.
            </p>
          </div>

          <div className="grid gap-8 border border-[#cfc8bb] md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#cfc8bb]">
            {fits.map((fit) => (
              <div key={fit.label} className="flex flex-col gap-6 p-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9a7d45]">
                  {fit.label}
                </p>
                <span className="block h-px bg-[#cfc8bb]" />
                <ul className="flex flex-col gap-4">
                  {fit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#6b6158]">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              Do not choose based on ego. Choose based on the level of structure your life
              actually requires.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
