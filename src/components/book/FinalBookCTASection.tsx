import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const AMAZON_URL = 'https://amzn.to/4lh5lRX'
// TODO: Replace with actual Blueprint download/page path when ready
const BLUEPRINT_HREF = '/resources'

export default function FinalBookCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Get the Book
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            Start With the Book. Raise the Standard.
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            If you are tired of falling off, starting over, and letting life keep lowering your
            physical standards, Ignite gives you a practical first step. Read it. Use it. Then
            decide how far you want to take the work.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href={AMAZON_URL} variant="primary" size="lg">
              Get the Book
            </Button>
            <Button href={BLUEPRINT_HREF} variant="gold-outline" size="lg">
              Get the Blueprint
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
