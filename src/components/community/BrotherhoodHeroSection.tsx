import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const SKOOL_URL = 'https://www.skool.com/forged-by-war-2309/about'

export default function BrotherhoodHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Brotherhood
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            A Stronger Environment for Men Who Refuse to Drift Alone
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War Brotherhood is a disciplined community for men who need sharper
            proximity, real accountability, and a room built around standards, challenge, and
            forward movement.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href={SKOOL_URL} variant="primary" size="lg">
              Join the Brotherhood
            </Button>
            <Button href="/coaching/group" variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
