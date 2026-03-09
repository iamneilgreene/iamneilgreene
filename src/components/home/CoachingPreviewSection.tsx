import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function CoachingPreviewSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-14">

          {/* Header */}
          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Coaching
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Choose the Standard You&rsquo;re Ready to Carry
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Men do not fail because they lack information. They fail because they lack
              structure, accountability, and a standard strong enough to correct them when
              drift returns. Forged By War gives you two ways to rebuild, depending on the
              level of access, challenge, and precision you need.
            </p>
          </div>

          {/* Two offer cards */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Forged By War Private */}
            <div className="flex flex-col gap-7 border border-[#b8975a]/30 bg-[#0f0f0f] p-10 transition-colors duration-200 hover:border-[#b8975a]/60">
              <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                  Flagship Offer
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#f4f1ec] md:text-3xl">
                  Forged By War Private
                </h3>
                <p className="text-sm font-medium uppercase tracking-widest text-[#9a9590]">
                  1-on-1 Coaching
                </p>
              </div>

              <span className="block h-px w-10 bg-[#b8975a]" />

              <p className="text-base leading-relaxed text-[#9a9590]">
                A private coaching engagement for men who want direct access, personalized
                correction, and uncompromising accountability. Built for men who are done
                wasting time, done drifting between intentions and action, and ready to
                rebuild strength, discipline, clarity, and leadership with precision.
              </p>

              <div className="mt-auto">
                <Button href="/coaching/private" variant="primary" size="md">
                  Apply for Private Coaching
                </Button>
              </div>
            </div>

            {/* Forged By War Cohort */}
            <div className="flex flex-col gap-7 border border-[#2e2e2e] bg-[#0f0f0f] p-10 transition-colors duration-200 hover:border-[#b8975a]/40">
              <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#9a9590]">
                  Quarterly Intake
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#f4f1ec] md:text-3xl">
                  Forged By War Cohort
                </h3>
                <p className="text-sm font-medium uppercase tracking-widest text-[#9a9590]">
                  Quarterly Group Coaching
                </p>
              </div>

              <span className="block h-px w-10 bg-[#2e2e2e]" />

              <p className="text-base leading-relaxed text-[#9a9590]">
                A 12-week coaching experience for men who want structure, live guidance,
                real accountability, and the force of a room moving under one standard.
                Built for men who know they need challenge, consistency, and a sharper
                environment to lock back into discipline.
              </p>

              <div className="mt-auto">
                <Button href="/coaching/group" variant="gold-outline" size="md">
                  Apply for the Next Cohort
                </Button>
              </div>
            </div>

          </div>

          {/* Closing line */}
          <div className="border-t border-[#2e2e2e] pt-7 text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              The question is not whether you need more motivation. The question is whether
              you are ready to be held to a higher standard.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
