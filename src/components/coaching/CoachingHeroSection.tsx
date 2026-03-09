import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function CoachingHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Coaching
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            Choose the Standard You&rsquo;re Ready to Live Under
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War offers three coaching paths for men who are done letting drift hide
            behind busyness, competence, and good intentions. The mission stays the same. What
            changes is the level of access, structure, accountability, and brotherhood you are
            ready to carry.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/coaching/private" variant="primary" size="lg">
              Apply for Private Coaching
            </Button>
            <Button href="/coaching/group" variant="gold-outline" size="lg">
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
