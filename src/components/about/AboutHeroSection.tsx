import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function AboutHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      {/* Top gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            About Neil Greene
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            He Built the Standard He Once Needed
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Neil Greene built Forged By War for men who are tired of drift, finished with
            self-betrayal, and ready to rebuild discipline, strength, clarity, and leadership under
            a standard that holds when pressure rises.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button href="/apply" variant="primary" size="lg">
              Work With Neil
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
