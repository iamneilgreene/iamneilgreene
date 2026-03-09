import PageContainer from '@/components/layout/PageContainer'

export default function WhyPrivateSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Foundation
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Why Private Coaching Exists
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Some men do not need more content. They need direct correction. They need someone
              close enough to see what drift is costing them, call it clearly, and help rebuild
              what has weakened without delay.
            </p>
            <p>
              Private coaching exists for the man who wants the highest level of access,
              accountability, and precision. The man who is finished wasting time, finished
              negotiating with inconsistency, and ready to rebuild under a standard that reaches
              into the places he can no longer afford to leave unexamined.
            </p>
            <p>
              This is not a loose advisory relationship. It is a direct coaching engagement built
              to shorten drift, tighten standards, sharpen execution, and help a man move faster
              with fewer blind spots.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              When the cost of staying where you are becomes too high, proximity starts to matter.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
