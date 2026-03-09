import PageContainer from '@/components/layout/PageContainer'

const qualifiers = [
  'you want the highest level of support inside Forged By War',
  'you are ready for direct feedback and correction',
  'you are serious about rebuilding, not browsing',
  'you want structure that holds when pressure rises',
  'you are willing to be held to a standard, not merely encouraged',
]

export default function FitSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Right Man
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Who This Is For
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Forged By War Private is for men who carry real responsibility and know they can no
              longer afford to let drift hide behind performance, busyness, or competence. These
              are men who are functioning, producing, and carrying weight, but know something
              underneath is slipping.
            </p>
            <p>
              This is for the man who wants direct correction, real accountability, and a standard
              strong enough to reach into the areas where self-negotiation has gone on too long.
              He does not need more theory. He needs clarity, structure, and someone close enough
              to challenge what he has been tolerating.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#b8975a]">
              This is for you if
            </p>
            <ul className="flex flex-col gap-3">
              {qualifiers.map((q) => (
                <li key={q} className="flex items-start gap-3 text-sm text-[#9a9590]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              Private coaching is for men who are ready to stop managing appearances and start
              rebuilding substance.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
