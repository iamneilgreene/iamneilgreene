import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function ContactHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-8">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Contact
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
            Reach Out With Clarity
          </h1>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
            For speaking, partnerships, media, or general inquiries, use this page to start the
            conversation clearly. If you are looking for coaching, the Apply page is the best place
            to begin.
          </p>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#inquiry-form" variant="primary" size="lg">
                Send an Inquiry
              </Button>
              <Button href="#inquiry-form" variant="gold-outline" size="lg">
                Book Neil to Speak
              </Button>
            </div>
            <div className="pt-1">
              <Link
                href="/apply"
                className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
              >
                Apply for Coaching
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
