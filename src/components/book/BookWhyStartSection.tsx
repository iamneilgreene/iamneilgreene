import Image from 'next/image'
import PageContainer from '@/components/layout/PageContainer'

export default function BookWhyStartSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 md:items-center">

          {/* Left — prose */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                Entry Point
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                Why Start Here
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
              <p>
                Not every man needs coaching first. Some need a place to reestablish command on
                their own, rebuild consistency, and prove to themselves that they can follow through
                again. That is what Ignite is built for.
              </p>
              <p>
                The book gives working men a practical way to start tightening standards without
                waiting for the perfect season, perfect schedule, or perfect mindset. It creates
                traction first, which often makes the next right move easier to see.
              </p>
              <p>
                For some men, the book is enough to restart momentum. For others, it becomes the
                doorway into the Blueprint, the Brotherhood, or deeper coaching. Either way, it is
                a serious first step.
              </p>
            </div>

            <div className="border border-[#2e2e2e] p-8">
              <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
                A man does not always need a bigger plan first. Sometimes he needs a standard he
                can start living today.
              </p>
            </div>
          </div>

          {/* Right — flat book cover */}
          {/* Drop file at: public/images/ignite-cover.webp */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs">
              <Image
                src="/images/ignite-cover.webp"
                alt="Ignite: Fitness Fuel for Working Dads — book cover"
                width={1600}
                height={2560}
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
