import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const APPLICATION_HREF = '/apply/form'

export default function ApplyHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Apply
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            Choose the Right Level of Support and Start the Work Honestly
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            Not every man needs the same level of access, structure, or accountability. The point of
            this page is simple: choose the path that fits where you are, what is slipping, and how
            much support you are ready to carry.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={APPLICATION_HREF} variant="primary" size="lg">
                Apply for Private Coaching
              </Button>
              <Button href={APPLICATION_HREF} variant="gold-outline" size="lg">
                Apply for the Next Cohort
              </Button>
            </div>
            <div className="pt-1 text-center sm:text-left">
              <Link
                href="/community"
                className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
              >
                Join the Brotherhood
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
