import PageContainer from '@/components/layout/PageContainer'

const items = [
  {
    title: 'Live Group Coaching',
    body: 'Weekly coaching built to challenge drift, sharpen execution, and move the room forward with clarity.',
  },
  {
    title: '12-Week Container',
    body: 'A defined start, middle, and finish designed to create traction, momentum, and measurable movement.',
  },
  {
    title: 'Shared Accountability',
    body: 'A room where excuses are harder to protect and forward movement is reinforced by the standard of the group.',
  },
  {
    title: 'Guided Structure',
    body: 'Direction, focus, and coaching that reduce noise and help men stay aligned to what matters most.',
  },
  {
    title: 'Momentum Through Proximity',
    body: 'The force of being in a serious room with other men moving under one standard.',
  },
]

export default function GroupIncludesSection() {
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
              The cohort is built around live coaching, guided structure, accountability, and a
              room moving under one standard. While each cohort may have its own rhythm, the core
              experience is built around a focused set of elements.
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
              This is not open-ended conversation. It is a coaching container built to create
              movement.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
