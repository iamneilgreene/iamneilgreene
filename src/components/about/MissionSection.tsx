import PageContainer from '@/components/layout/PageContainer'

export default function MissionSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/20 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Mission
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Why Forged By War Exists
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-[#9a9590]">
              Too many men are drifting behind competence. They are producing, providing, and
              carrying weight, but quietly losing ground where discipline matters most. Their body
              softens. Their routines fracture. Their private standards weaken. Their leadership
              begins to sound stronger than it is.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Forged By War exists to confront that drift without flattery, noise, or false comfort.
              It was built to give men structure, accountability, brotherhood, and a standard strong
              enough to rebuild what pressure, compromise, neglect, and time have worn down.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              This is not for men who want to be entertained. It is for men who are ready to be
              sharpened. Men who are done negotiating with the parts of life that keep slipping, and
              ready to rebuild with intention, discipline, and force.
            </p>
          </div>

          {/* Mission statement — distinct treatment */}
          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-lg font-semibold leading-snug text-[#f4f1ec] md:text-xl">
              The mission is to help men reclaim command of themselves, so their strength, clarity,
              and leadership stop collapsing in private and start holding under pressure.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
