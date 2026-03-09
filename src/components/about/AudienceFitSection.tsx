import PageContainer from '@/components/layout/PageContainer'

export default function AudienceFitSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Right Fit
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Who Neil Works With
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Coaching block */}
            <div className="flex flex-col gap-5 border border-[#2e2e2e] p-8">
              <span className="block h-px w-8 bg-[#b8975a]" />
              <h3 className="font-display text-xl font-semibold text-[#f4f1ec]">
                For Men Who Are Done Letting Competence Cover Drift
              </h3>
              <p className="text-sm leading-relaxed text-[#9a9590]">
                Neil works with men who carry responsibility, perform at a high level, and know they
                can no longer let busyness, success, or external competence hide what is slipping
                underneath. These are men who want structure, accountability, sharper habits,
                stronger leadership, and a standard that holds when pressure gets real.
              </p>
            </div>

            {/* Speaking block */}
            <div className="flex flex-col gap-5 border border-[#2e2e2e] p-8">
              <span className="block h-px w-8 bg-[#b8975a]" />
              <h3 className="font-display text-xl font-semibold text-[#f4f1ec]">
                For Organizations That Need More Than Inspiration
              </h3>
              <p className="text-sm leading-relaxed text-[#9a9590]">
                Neil also works with leaders, teams, and organizations that want a message grounded
                in discipline, resilience, accountability, leadership, and performance under
                pressure. His work is built for rooms that need stronger ownership, clearer
                standards, and execution that holds when comfort starts costing results.
              </p>
            </div>

          </div>

          {/* Fit qualifier */}
          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              If you want comfort, hype, or inspiration without correction, this work will not fit.
              If you want structure, challenge, and standards that change how people operate, it will.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
