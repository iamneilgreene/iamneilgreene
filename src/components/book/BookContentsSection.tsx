import PageContainer from '@/components/layout/PageContainer'

const contents = [
  {
    title: 'Practical Fitness Guidance',
    body: 'Straightforward training direction for men who need consistency more than complexity.',
  },
  {
    title: 'Nutrition That Fits Real Life',
    body: 'A clearer way to think about eating, fueling, and staying aligned without pretending your schedule is empty.',
  },
  {
    title: 'A Stronger Standard',
    body: 'More than tactics, the book helps reestablish the mindset and discipline required to stop falling off every time life gets heavy.',
  },
  {
    title: 'A Rebuild Path for Working Men',
    body: 'Written for men balancing work, family, pressure, and limited time, not for people living in a perfect routine.',
  },
  {
    title: 'A Bridge Into Deeper Work',
    body: 'For men who want more structure after the book, Ignite connects naturally into the Blueprint, the Brotherhood, and coaching.',
  },
]

export default function BookContentsSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Inside the Book
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What&rsquo;s Inside
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Ignite is built to help working men rebuild the physical side of discipline in a way
              that can actually survive real life. The book gives a practical path, not an idealized
              one.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {contents.map((item, i) => (
              <div
                key={item.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < contents.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The value of the book is not in how much it says. It is in how much it helps a man
              actually do.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
