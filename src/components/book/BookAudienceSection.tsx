import PageContainer from '@/components/layout/PageContainer'

const qualifiers = [
  'you are tired of falling off and starting over',
  'you want a practical path, not hype',
  'you are balancing work, family, and real responsibilities',
  'you want to rebuild physical discipline and consistency',
  'you want a first step that can lead into deeper work later',
]

export default function BookAudienceSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Audience
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Who It&rsquo;s For
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#9a9590]">
            <p>
              Ignite is for working men whose responsibilities are real, whose time is limited, and
              whose standards have started slipping under the weight of life. It is for men who are
              tired of restarting, tired of drifting physically, and tired of knowing what they
              should do without actually living it.
            </p>
            <p>
              This book is especially for men who want a practical place to begin again, or begin
              correctly, without pretending they need a perfect routine, endless free time, or
              extreme tactics to rebuild discipline.
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
              Ignite is for the man who knows his standards need to rise, even if his schedule
              never slows down.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
