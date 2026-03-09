import PageContainer from '@/components/layout/PageContainer'

const pillars = [
  {
    title: 'Structure',
    body: 'You are not left to guess your way forward. Every path is built to reduce drift and increase clarity.',
  },
  {
    title: 'Accountability',
    body: 'Progress is not left to intention alone. Each path gives you a form of correction, challenge, and responsibility.',
  },
  {
    title: 'Standard',
    body: 'This work is not built around hype or moods. It is built around standards that hold when pressure rises.',
  },
  {
    title: 'Forward Movement',
    body: 'Every path is designed to move you out of delay, inconsistency, and negotiation, and back into traction.',
  },
]

export default function SharedFoundationSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Foundation
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What All Paths Share
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Different levels of access do not mean different standards. Every path inside
              Forged By War is built on the same foundation, because the mission never changes.
            </p>
          </div>

          {/* 4-pillar horizontal grid */}
          <div className="border border-[#2e2e2e]">
            <div className="grid md:grid-cols-4 md:divide-x md:divide-[#2e2e2e]">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className={`flex flex-col gap-5 p-8 ${
                    i < pillars.length - 1 ? 'border-b border-[#2e2e2e] md:border-b-0' : ''
                  }`}
                >
                  <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#9a9590]">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing line */}
          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              The format changes. The standard does not.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
