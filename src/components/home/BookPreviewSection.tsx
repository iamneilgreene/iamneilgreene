import Image from 'next/image'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const features = [
  'practical fitness and nutrition guidance',
  'structure built for busy working men and fathers',
  'a foundation for rebuilding consistency',
  'a no-fluff approach to physical discipline',
  'a clear bridge into the broader Forged By War standard',
]

export default function BookPreviewSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-14">

          {/* Header */}
          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Book
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Start With the Book That Puts Structure Back in Your Hands
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Not every man starts with coaching. Some need a place to reestablish command on
              their own first. Ignite: Fitness Fuel for Working Dads was built for working men
              who need a practical way to rebuild strength, consistency, and physical discipline
              without fluff, confusion, or wasted motion.
            </p>
          </div>

          {/* Content grid */}
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">

            {/* Book cover */}
            <div className="flex flex-col gap-6">
              <div className="w-full max-w-xs">
                <Image
                  src="/images/ignite-cover.webp"
                  alt="Ignite: Fitness Fuel for Working Dads"
                  width={1600}
                  height={2560}
                  className="w-full h-auto"
                />
              </div>

              <div className="flex gap-3">
                <Button href="/book" variant="primary" size="md">
                  Get the Book
                </Button>
                <Button href="/resources" variant="gold-outline" size="md">
                  Get the Blueprint
                </Button>
              </div>
            </div>

            {/* Book detail */}
            <div className="flex flex-col gap-7">
              <h3 className="font-display text-2xl font-semibold text-[#f4f1ec]">
                Ignite: Fitness Fuel for Working Dads
              </h3>

              <p className="text-base leading-relaxed text-[#9a9590]">
                This is not motivation in book form. It is a practical standard for men who
                are tired of falling off, starting over, and negotiating with habits they
                should have mastered by now. Ignite gives you a cleaner path back to
                training, nutrition, and the kind of consistency that restores confidence.
              </p>

              <ul className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#9a9590]">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="border-l-2 border-[#b8975a] pl-5 pt-2">
                <p className="font-display text-sm italic text-[#9a9590]">
                  Before a man is led well, he often has to learn how to lead himself again.
                </p>
              </div>
            </div>

          </div>

        </div>
      </PageContainer>
    </section>
  )
}
