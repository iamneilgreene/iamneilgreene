import PageContainer from '@/components/layout/PageContainer'

export default function BrotherhoodDefinitionSection() {
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
              Forged By War Brotherhood is a standards-based community for men who need a stronger
              environment, sharper accountability, and a place to keep moving forward when
              isolation would normally pull them backward.
            </p>
            <p>
              This is not private coaching, and it is not a 12-week cohort. It is an ongoing room
              built for accountability, challenge, brotherhood, and forward movement, giving men a
              place to stay near the standard instead of trying to rebuild alone.
            </p>
            <p>
              The Brotherhood is for men who want real proximity, consistent reinforcement, and a
              stronger environment than the one that helped drift survive in the first place.
            </p>
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-base italic leading-relaxed text-[#9a9590] md:text-lg">
              This is not community for comfort. It is community for correction, consistency, and
              momentum.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
