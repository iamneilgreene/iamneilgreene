import PageContainer from '@/components/layout/PageContainer'

const disqualifiers = [
  'you want content, but not accountability',
  'you want comfort more than correction',
  'you want community without standards',
  'you are attached to staying hidden',
  'you want to be near the room, but not changed by it',
]

export default function BrotherhoodNotFitSection() {
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
              Forged By War Brotherhood is not for men who want passive access, low-stakes
              motivation, or a place to consume content without correction. It is not built for
              men who want to sit near standards while protecting the habits that are breaking
              them.
            </p>
            <p>
              If you are looking for a soft room, anonymous participation, or a way to feel
              inspired without being challenged, this is not the right fit. Brotherhood only works
              when men are willing to be seen, sharpened, and held near a standard stronger than
              their excuses.
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
              Brotherhood loses its value the moment the standard becomes optional.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
