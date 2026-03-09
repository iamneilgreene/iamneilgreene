import PageContainer from '@/components/layout/PageContainer'

export default function WhyBrotherhoodSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              The Foundation
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Why Brotherhood Exists
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#3d3530]">
            <p>
              Most men do not drift because they are incapable. They drift because isolation gives
              excuses room to breathe. What weakens in private often survives because no one is
              close enough to challenge it.
            </p>
            <p>
              Brotherhood exists to change the environment around the man before drift hardens
              into identity. A stronger room makes standards more visible, excuses less
              convincing, and forward movement easier to sustain.
            </p>
            <p>
              Forged By War Brotherhood is built for men who know they need more than motivation
              and more than solo discipline. They need proximity, accountability, challenge, and
              a community that refuses to let isolation keep writing the story.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              Isolation protects drift. Brotherhood exposes it.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
