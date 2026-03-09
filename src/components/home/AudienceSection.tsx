import PageContainer from '@/components/layout/PageContainer'

const qualifications = [
  'you are tired of knowing better, but not living better',
  'you want structure, not more empty motivation',
  'you are ready to be held to a higher standard',
  'you want strength, clarity, and discipline to show up in every area of life',
  'you are willing to be coached, challenged, and held accountable',
]

export default function AudienceSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      <PageContainer>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left: Headline + body */}
          <div className="flex flex-col gap-7">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Who This Is For
            </span>
            <h2 className="font-display text-3xl font-semibold leading-snug tracking-tight text-[#f4f1ec] md:text-4xl">
              This Is for the Man Who Looks Solid on the Outside, but Knows Something Is Slipping
            </h2>
            <p className="text-base leading-relaxed text-[#9a9590]">
              You carry responsibility. You handle business. You show up for work and for the
              people who depend on you. But somewhere along the way, discipline started giving
              ground. Your body lost sharpness. Your standards slipped in private. Your edge
              dulled under pressure.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Forged By War is for men who are done pretending that &ldquo;holding it
              together&rdquo; is the same as being fully in command. It is for men who want
              structure, accountability, brotherhood, and a standard strong enough to rebuild
              what drift has taken.
            </p>
          </div>

          {/* Right: Qualification list + disqualifier */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                This fits if
              </p>
              <ul className="flex flex-col gap-3">
                {qualifications.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-[#1e1e1e] pb-3 last:border-0">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                    <span className="text-base leading-relaxed text-[#e8e4de]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disqualifier */}
            <div className="border-l-2 border-[#b8975a] pl-5">
              <p className="font-display text-sm italic leading-relaxed text-[#9a9590]">
                If you are looking for comfort, excuses, or motivation without responsibility,
                this is not your place.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
