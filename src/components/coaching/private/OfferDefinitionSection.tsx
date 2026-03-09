import PageContainer from '@/components/layout/PageContainer'

export default function OfferDefinitionSection() {
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
              Forged By War Private is a high-accountability 1-on-1 coaching engagement built for
              men who want direct access, individualized correction, and structured support across
              discipline, strength, clarity, leadership, and execution.
            </p>
            <p>
              This work is designed to meet you closely. Not through generic advice, and not
              through surface-level encouragement, but through direct coaching that helps identify
              blind spots, tighten standards, and move you forward with more precision than you
              can usually generate alone.
            </p>
            <p>
              The engagement is built for men who want to stop circling the same problems and
              start rebuilding with speed, structure, and a standard that actually holds under
              pressure.
            </p>
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-base italic leading-relaxed text-[#9a9590] md:text-lg">
              This is not access for curiosity. It is access for reconstruction.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
