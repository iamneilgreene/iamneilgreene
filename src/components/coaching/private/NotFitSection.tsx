import PageContainer from '@/components/layout/PageContainer'

const disqualifiers = [
  'you want inspiration without correction',
  'you are not ready for direct accountability',
  'you want to stay comfortable while asking for change',
  'you are looking for access, but not commitment',
  'you are still more attached to excuses than results',
]

export default function NotFitSection() {
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
              Forged By War Private is not for men looking for comfort, passive motivation, or
              surface-level encouragement. It is not for men who want access without correction,
              proximity without accountability, or results without responsibility.
            </p>
            <p>
              If you are looking for a place to browse, delay, perform interest, or stay protected
              from direct truth, this is not the right fit. Private coaching is built for men who
              are ready to be challenged, examined, and held to a higher standard than the one
              they have been tolerating.
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
              The standard is high on purpose. Anything lower would protect the very drift this
              work is built to break.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
