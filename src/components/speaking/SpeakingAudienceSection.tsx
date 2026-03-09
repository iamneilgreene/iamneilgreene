import PageContainer from '@/components/layout/PageContainer'

const audiences = [
  {
    title: 'Leadership Teams',
    body: 'For leaders responsible for setting the tone, carrying the standard, and shaping how accountability is lived across the room.',
  },
  {
    title: 'Corporate and Professional Audiences',
    body: 'For organizations that want a message on discipline, resilience, ownership, and performance that goes beyond surface-level motivation.',
  },
  {
    title: 'Conferences and Events',
    body: 'For stages that need a speaker who can challenge the room, hold attention, and leave people thinking differently about standards, leadership, and execution.',
  },
  {
    title: 'Faith-Based and Men\'s Events',
    body: 'For audiences where responsibility, conviction, brotherhood, and personal discipline need to be addressed with both force and substance.',
  },
]

export default function SpeakingAudienceSection() {
  return (
    <section className="relative bg-[#eae5dc] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              Audience Fit
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Who Neil Speaks To
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#6b6158]">
              Neil&rsquo;s message is built for rooms that need stronger standards, sharper
              ownership, and more disciplined execution. His talks are especially relevant for
              audiences carrying pressure, responsibility, and the cost of weak accountability.
            </p>
          </div>

          <div className="grid gap-px border border-[#cfc8bb] md:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="flex flex-col gap-4 bg-[#eae5dc] p-8"
              >
                <h3 className="font-display text-lg font-semibold text-[#1a1a1a]">
                  {audience.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6b6158]">{audience.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#6b6158]">
              If the room needs more than inspiration, the message fits.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
