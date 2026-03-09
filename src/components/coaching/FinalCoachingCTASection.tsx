import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FinalCoachingCTASection() {
  return (
    <section className="relative bg-[#141414] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Next Step
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            Choose the Path That Matches the Standard You Need
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            You do not need to guess your way forward. You need to choose the level of
            structure, accountability, and proximity that will actually move you. Whether
            that means private coaching, the next cohort, or the Brotherhood, the next step
            is in front of you.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button href="/coaching/private" variant="primary" size="lg">
              Apply for Private Coaching
            </Button>
            <Button href="/coaching/group" variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
            <Button href="/community" variant="secondary" size="lg">
              Join the Brotherhood
            </Button>
          </div>

          <p className="font-display text-sm italic text-[#9a9590] md:text-base">
            Choose clearly. Commit fully. Carry the standard.
          </p>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
