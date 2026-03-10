import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const APPLICATION_HREF = '/apply/form'

export default function FinalApplyCTASection() {
  return (
    <section className="relative bg-[#141414] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Your Move
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            Choose Honestly. Apply Cleanly. Start the Work.
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            The point of this page is not to impress you. It is to help you take the right next
            step. If you know what level of support you need, choose it. If you need the stronger
            room first, choose that. But choose honestly, and move.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href={APPLICATION_HREF} variant="primary" size="lg">
              Apply for Private Coaching
            </Button>
            <Button href={APPLICATION_HREF} variant="gold-outline" size="lg">
              Apply for the Next Cohort
            </Button>
          </div>

          <Link
            href="/community"
            className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
          >
            Join the Brotherhood
          </Link>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
