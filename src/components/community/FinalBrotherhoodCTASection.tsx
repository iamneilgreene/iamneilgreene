import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const SKOOL_URL = 'https://www.skool.com/forged-by-war-2309/about'

export default function FinalBrotherhoodCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Next Step
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            If You Need a Stronger Room, Step Into One
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            Forged By War Brotherhood is for men who know isolation has been feeding drift and
            who are ready to stay closer to accountability, challenge, and a stronger standard.
            If that is where you are, the next step is simple. Join the Brotherhood.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href={SKOOL_URL} variant="primary" size="lg">
              Join the Brotherhood
            </Button>
            <Button href="/coaching/group" variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
          </div>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
