import PageContainer from '@/components/layout/PageContainer'

export default function WhyApplySection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Why the Application Exists
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              The application is not there to create distance for the sake of image. It exists
              because the right fit matters. Different men need different levels of structure,
              correction, accountability, and support.
            </p>
            <p>
              Some men need private coaching. Some need the cohort. Others need the Brotherhood
              first. The application exists to help make that choice clearer, so the next step is
              based on honesty instead of ego.
            </p>
            <p>
              This work is strongest when a man enters the right container at the right time. The
              goal is not to push everyone toward the highest offer. The goal is to place each man
              where he is most likely to move.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The application protects the standard by helping you choose the path that fits the
              work you are actually ready to do.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
