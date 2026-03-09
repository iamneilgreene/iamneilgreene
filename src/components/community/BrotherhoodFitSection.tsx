import PageContainer from '@/components/layout/PageContainer'

const qualifiers = [
  'you need a stronger environment than trying to do this alone',
  'you want accountability and forward movement without full coaching yet',
  'you know isolation has been feeding inconsistency',
  'you want a room built on standards, not noise',
  'you want a clear path into deeper work when the time is right',
]

export default function BrotherhoodFitSection() {
  return (
    <section className="relative bg-[#eae5dc] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              The Right Man
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Who This Is For
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#3d3530]">
            <p>
              Forged By War Brotherhood is for men who know isolation has been costing them more
              than they want to admit. They do not need to keep pretending they can rebuild
              everything alone. They need a stronger environment, sharper accountability, and a
              room that keeps them moving when discipline would normally start slipping again.
            </p>
            <p>
              This is for the man who wants real brotherhood, real standards, and real forward
              movement, but is not yet stepping into private coaching or the cohort. He wants
              proximity to the standard, reinforcement of better habits, and a place where drift
              is harder to protect.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9a7d45]">
              This is for you if
            </p>
            <ul className="flex flex-col gap-3">
              {qualifiers.map((q) => (
                <li key={q} className="flex items-start gap-3 text-sm text-[#6b6158]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              The Brotherhood is for men who know they may not need the highest level of access
              yet, but they do need a stronger room.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
