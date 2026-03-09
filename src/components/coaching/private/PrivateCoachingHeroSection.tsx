import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function PrivateCoachingHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Private Coaching
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            The Highest Level of Accountability Inside Forged By War
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War Private is a 1-on-1 coaching engagement for men who want direct access,
            personalized correction, and a standard strong enough to rebuild discipline, strength,
            clarity, and leadership with precision.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/apply" variant="primary" size="lg">
              Apply for Private Coaching
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
