import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function GroupCoachingHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Group Coaching
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            A 12-Week Coaching Container Built for Men Who Need Structure, Challenge, and Momentum
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War Cohort is a quarterly group coaching experience for men who want live
            coaching, real accountability, and the force of a room moving under one standard.
            Built for men who are ready to rebuild discipline, sharpen execution, and stop
            drifting in isolation.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/apply" variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
            <Button href="/community" variant="ghost" size="lg">
              Join the Brotherhood
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
