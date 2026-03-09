import PageContainer from '@/components/layout/PageContainer'

export default function GroupDefinitionSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Offer
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What This Is
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Forged By War Cohort is a 12-week group coaching experience built for men who want
              live coaching, guided structure, and real accountability inside a focused room.
            </p>
            <p>
              This is not passive community access and it is not one-off group motivation. It is
              a defined coaching container built to create traction, expose drift, and move men
              forward under shared standards and consistent correction.
            </p>
            <p>
              The cohort is designed for men who want more support than community alone, but do
              not need the highest level of private access. It gives them a serious room, a fixed
              timeframe, and a coaching environment built for measurable change.
            </p>
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-base italic leading-relaxed text-[#9a9590] md:text-lg">
              This is not group access for convenience. It is group coaching for reconstruction.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
