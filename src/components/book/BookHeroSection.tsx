import Image from 'next/image'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const AMAZON_URL = 'https://amzn.to/4lh5lRX'
// TODO: Replace with actual Blueprint download/page path when ready
const BLUEPRINT_HREF = '/resources'

export default function BookHeroSection() {
  return (
    <section className="relative bg-[#0d0d0d] pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/40 to-transparent" />

      <PageContainer>
        <div className="grid gap-16 md:grid-cols-2 md:items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-8">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Book
            </span>

            <div className="flex flex-col gap-5">
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4f1ec] md:text-5xl lg:text-6xl">
                A Practical Standard for Working Men Who Need to Rebuild Discipline
              </h1>

              {/* Credibility badge */}
              <div className="flex items-center gap-3">
                <span className="block h-px w-6 bg-[#b8975a]" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#b8975a]">
                  Amazon Best Seller
                </span>
              </div>
            </div>

            <span className="block h-px w-14 bg-[#b8975a]" />

            <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
              Ignite: Fitness Fuel for Working Dads is built for men who are tired of falling off,
              starting over, and negotiating with habits they should have mastered by now. It gives
              working men a practical path back to strength, consistency, and physical discipline.
            </p>

            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={AMAZON_URL} variant="primary" size="lg">
                  Get the Book
                </Button>
                <Button href={BLUEPRINT_HREF} variant="gold-outline" size="lg">
                  Get the Blueprint
                </Button>
              </div>
              <div className="pt-1">
                <Link
                  href="/community"
                  className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
                >
                  Join the Brotherhood
                </Link>
              </div>
            </div>
          </div>

          {/* Right — book mockup */}
          {/* Drop file at: public/images/ignite-mockup.webp */}
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <Image
                src="/images/ignite-mockup.webp"
                alt="Ignite: Fitness Fuel for Working Dads"
                width={5000}
                height={5000}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
