import PageContainer from '@/components/layout/PageContainer'

const items = [
  {
    title: 'Private Coaching Sessions',
    body: 'Direct 1-on-1 sessions focused on correction, strategy, accountability, and rebuilding the standards that matter most.',
  },
  {
    title: 'Personalized Structure',
    body: 'A coaching approach shaped around your current challenges, pressure points, blind spots, and the areas where drift is costing you most.',
  },
  {
    title: 'Direct Accountability',
    body: 'Ongoing accountability that makes it harder to hide behind delay, inconsistency, or good intentions.',
  },
  {
    title: 'Strategic Correction',
    body: 'Clear guidance that identifies what needs to change, where standards are slipping, and what must be rebuilt first.',
  },
  {
    title: 'Forward Movement Between Sessions',
    body: 'This is not a weekly conversation with no carryover. The work is meant to move in real time, not just in theory.',
  },
]

export default function IncludesSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Work
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What This Includes
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Private coaching is built around direct access, structured support, and a level of
              accountability designed to shorten drift and accelerate execution. While every
              engagement is tailored, the work is built around a core structure.
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
              The goal is not more contact. The goal is more correction, more clarity, and more
              traction where it counts.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
