import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FinalPrivateCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Highest Standard
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            If You&rsquo;re Ready for the Highest Standard, Apply Accordingly
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            Private coaching is for men who are done negotiating with drift and ready for direct
            correction, close accountability, and a standard that holds where it matters most. If
            that is the level of work you are ready for, the next move is simple. Apply.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/apply/form" variant="primary" size="lg">
              Apply for Private Coaching
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
