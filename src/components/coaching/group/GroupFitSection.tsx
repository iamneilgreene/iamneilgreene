import PageContainer from '@/components/layout/PageContainer'

const qualifiers = [
  'you want real coaching, but not full private access',
  'you work well inside a serious group environment',
  'you want accountability and correction over 12 focused weeks',
  'you are ready to move with structure and consistency',
  'you want a stronger room than trying to rebuild alone',
]

export default function GroupFitSection() {
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
              Forged By War Cohort is for men who want more than community and more structure
              than they have been able to create on their own. These are men who are serious about
              rebuilding, want real coaching, and know they move better when they are inside a
              defined container with standards, challenge, and accountability.
            </p>
            <p>
              This is for the man who does not need full private access, but does need live
              guidance, correction, momentum, and a room that keeps him moving when old patterns
              would normally pull him back. He wants serious coaching, measurable movement, and
              the force of shared standards working in his favor.
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
              The cohort is for men who know they do better when the standard around them is
              stronger than the excuses inside them.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
