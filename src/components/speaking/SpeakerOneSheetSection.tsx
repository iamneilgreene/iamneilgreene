import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Replace with actual PDF file path when speaker one-sheet asset is ready
const ONE_SHEET_HREF = '/one-sheet'

export default function SpeakerOneSheetSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Speaker One-Sheet
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Need the Details in One Place?
            </h2>
          </div>

          <p className="text-base leading-relaxed text-[#9a9590]">
            Download Neil Greene&rsquo;s speaker one-sheet for a quick overview of his message,
            speaking themes, audience fit, and booking relevance. Built for event planners,
            leadership teams, and organizers who need a clean asset to review or share internally.
          </p>

          <div className="flex flex-col gap-5">
            <Button href={ONE_SHEET_HREF} variant="primary" size="lg" className="self-start">
              Download Speaker One-Sheet
            </Button>
            <p className="text-sm text-[#9a9590]">
              A simple, shareable overview for planning conversations and internal review.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
