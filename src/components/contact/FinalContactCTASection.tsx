import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function FinalContactCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Begin Here
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            Start the Right Conversation
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            If you are reaching out for speaking, media, partnerships, or a direct inquiry, use
            this page to begin clearly. If you are looking for coaching, use the Apply page and
            choose the right path.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href="#inquiry" variant="primary" size="lg">
              Send an Inquiry
            </Button>
            <Button href="#inquiry" variant="gold-outline" size="lg">
              Book Neil to Speak
            </Button>
          </div>

          <Link
            href="/apply"
            className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
          >
            Apply for Coaching
          </Link>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
