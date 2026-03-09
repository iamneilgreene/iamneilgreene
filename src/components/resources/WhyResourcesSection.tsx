import PageContainer from '@/components/layout/PageContainer'

export default function WhyResourcesSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Why These Resources Exist
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Most men do not need more content. They need a clear entry point. A tool they can
              use. A framework they can apply. A standard they can begin living before they are
              ready for deeper work.
            </p>
            <p>
              These resources exist to create traction. They are built to help men stop circling
              the same problems, stop drifting between bursts of motivation, and start moving with
              more structure and less noise.
            </p>
            <p>
              Some men will use a resource and go no further. Others will realize they need the
              book, the Brotherhood, or coaching. Either way, the point is the same: movement
              before drift gets stronger.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              A strong resource does not just inform a man. It gives him a way to begin.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
