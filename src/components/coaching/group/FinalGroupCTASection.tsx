import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FinalGroupCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Next Step
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            If You&rsquo;re Ready for a Stronger Room, Step Into It
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War Cohort is for men who want real coaching, real accountability, and a
            12-week container strong enough to create movement. If you know you need more than
            community, but not full private access, the next step is clear. Apply for the next
            cohort.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/apply" variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
            <Button href="/community" variant="secondary" size="lg">
              Join the Brotherhood
            </Button>
          </div>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
