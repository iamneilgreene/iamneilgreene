import PageContainer from '@/components/layout/PageContainer'

const disqualifiers = [
  'you want community, but not coaching',
  'you are not ready for live accountability',
  'you want inspiration without follow-through',
  'you are looking for a flexible excuse-friendly environment',
  'you want access to the room, but not pressure to change',
]

export default function GroupNotFitSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a9590]">
              A Clear Line
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Who This Is Not For
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Forged By War Cohort is not for men who want passive access, loose community, or a
              place to consume motivation without correction. It is not built for men who want to
              sit near standards without submitting to them.
            </p>
            <p>
              If you are looking for low-commitment participation, comfort without challenge, or
              a room where you can stay hidden behind busyness and good intentions, this is not
              the right fit. The cohort is built for men who are ready to be seen, challenged,
              and moved forward inside a serious container.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9a9590]">
              This is not for you if
            </p>
            <ul className="flex flex-col gap-3">
              {disqualifiers.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-[#9a9590]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#2e2e2e]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The cohort works because the room has weight. Remove the standard, and you remove
              the point.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
