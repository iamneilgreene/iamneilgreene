import PageContainer from '@/components/layout/PageContainer'

export default function WhyGroupSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              The Foundation
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Why Group Coaching Exists
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#3d3530]">
            <p>
              Some men do not need full private access to change. They need a serious container,
              a stronger room, and a standard outside themselves that makes drift harder to
              protect.
            </p>
            <p>
              Group coaching exists because there is power in shared movement under one standard.
              A focused room shortens isolation, exposes excuses faster, increases consistency,
              and creates momentum that is harder to generate alone.
            </p>
            <p>
              Forged By War Cohort is built for men who want more than community, but do not need
              the highest level of private support. They need live coaching, guided structure,
              accountability, and the force of a room that keeps forward movement from becoming
              optional.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              A serious room changes what a man is willing to tolerate from himself.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
