import PageContainer from '@/components/layout/PageContainer'

export default function FounderStorySection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Story
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              This Was Built the Hard Way
            </h2>
          </div>

          <span className="block h-px bg-[#2e2e2e]" />

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-[#9a9590]">
              Forged By War was not built from theory, borrowed language, or polished motivation.
              It was built under pressure, through failure, correction, responsibility, and the
              decision to stop living beneath a standard that should have been non-negotiable.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Neil Greene knows what it looks like to carry weight in public while losing ground in
              private. He knows what drift costs a man when discipline weakens, when excuses start
              sounding reasonable, and when strength is replaced by inconsistency, delay, and
              self-betrayal.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              That is why this work does not begin with hype. It begins with truth, structure, and
              the willingness to rebuild what should have never been surrendered in the first place.
              Forged By War exists because too many men look capable from the outside while quietly
              losing command of their body, habits, leadership, and direction.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Neil built this work for men who are finished pretending that survival is the same as
              strength. Today, his mission is to help men reclaim discipline, rebuild physical and
              mental sharpness, and lead from standards that are lived under pressure, not announced
              in comfort.
            </p>
          </div>

          {/* Closing line */}
          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              He did not build this to talk about discipline. He built it because he learned what
              life becomes without enough of it.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
