import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const themes = [
  'discipline and execution under pressure',
  'leadership through standards',
  'resilience when comfort becomes a liability',
  'accountability as a performance driver',
  'culture built on ownership, not excuses',
]

export default function SpeakingPreviewSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left */}
          <div className="flex flex-col gap-7">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Speaking
            </span>
            <h2 className="font-display text-3xl font-semibold leading-snug tracking-tight text-[#f4f1ec] md:text-4xl">
              Bring a Message That Raises the Standard in the Room
            </h2>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Neil Greene speaks to leaders, teams, and organizations on discipline,
              resilience, accountability, and performance under pressure. His message is built
              for rooms that do not need more noise. They need clarity, ownership, and a
              higher standard of execution.
            </p>

            <Button href="/speaking#booking" variant="gold-outline" size="md" className="self-start">
              Book Neil to Speak
            </Button>
          </div>

          {/* Right: offer detail */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-semibold text-[#f4f1ec]">
                Speaking Engagements
              </h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9590]">
                Keynotes &nbsp;/&nbsp; Workshops &nbsp;/&nbsp; Leadership Sessions
              </p>
            </div>

            <span className="block h-px bg-[#2e2e2e]" />

            <p className="text-sm leading-relaxed text-[#9a9590]">
              From corporate keynotes to leadership sessions and workshops, Neil delivers a
              message centered on disciplined performance, responsibility, and the kind of
              standards that shape culture when pressure is high and comfort is costing
              results. This is not inspiration for a moment. It is a challenge to think,
              lead, and execute at a higher level.
            </p>

            <div className="flex flex-col gap-0 border border-[#2e2e2e]">
              {themes.map((theme, i) => (
                <div
                  key={theme}
                  className={`flex items-start gap-4 px-6 py-4 text-sm text-[#9a9590] ${
                    i < themes.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                  }`}
                >
                  <span className="mt-0.5 shrink-0 text-[#b8975a]">/</span>
                  {theme}
                </div>
              ))}
            </div>

            <div className="border-l-2 border-[#2e2e2e] pl-5">
              <p className="font-display text-sm italic text-[#9a9590]">
                The quality of a room changes when the standard inside it does.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
