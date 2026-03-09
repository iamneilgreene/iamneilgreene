import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FinalCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Next Move
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            You Already Know Where Drift Leads
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            The question now is whether you keep negotiating with it, or step back under a
            stronger standard. Whether you need private coaching, a sharper brotherhood, or
            a place to start rebuilding today, the next move is in front of you.
          </p>

          {/* Three CTAs */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/apply" variant="primary" size="lg">
              Apply for Coaching
            </Button>
            <Button href="/community" variant="gold-outline" size="lg">
              Join the Brotherhood
            </Button>
            <Button href="/resources" variant="secondary" size="lg">
              Get the Blueprint
            </Button>
          </div>

          {/* Closing statement */}
          <p className="font-display text-sm italic text-[#9a9590] md:text-base">
            Choose your path. Rebuild what drift has touched. Carry the standard.
          </p>

        </div>
      </PageContainer>

      {/* Bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
