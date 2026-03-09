import PageContainer from '@/components/layout/PageContainer'

export default function SpeakingCredibilitySection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Why Neil Greene Is Brought Into the Room
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Neil Greene brings a message shaped by pressure, responsibility, discipline, and
              real-world leadership demands. He speaks to rooms that do not need more noise. They
              need clarity, ownership, and a standard strong enough to shift how people think and
              operate once the talk is over.
            </p>
            <p>
              His speaking work is built around the idea that performance rises or falls with
              standards, and that culture weakens the moment accountability becomes negotiable. The
              message is direct, practical, and designed to challenge drift where it hides most
              easily, inside comfort, busyness, and tolerated weakness.
            </p>
            <p>
              Whether speaking to leaders, teams, or broader audiences, Neil brings a tone that is
              strong without theater, challenging without noise, and memorable without sacrificing
              credibility.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-base italic leading-relaxed text-[#9a9590] md:text-lg">
              He is not brought into the room to entertain it. He is brought in to raise its
              standard.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
