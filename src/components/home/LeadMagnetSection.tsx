import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const features = [
  'a clearer standard for daily discipline',
  'practical starting points for strength and consistency',
  'habit correction that closes the gap between knowing and doing',
  'a cleaner path back to structure',
  'a direct bridge into the Forged By War ecosystem',
]

export default function LeadMagnetSection() {
  return (
    <section className="bg-[#0d0d0d] py-20 md:py-28">
      {/* Top accent line */}
      <div className="mb-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/20 to-transparent" />

      <PageContainer>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10 border border-[#2e2e2e] p-10 md:p-14">

            <div className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                Free Resource
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                Start With the Blueprint Before Drift Costs You More
              </h2>
              <p className="text-base leading-relaxed text-[#9a9590]">
                Not every man is ready for coaching today. But many are ready to stop
                bleeding ground today. The Forged Father Blueprint gives you a practical
                starting point to rebuild discipline, sharpen your habits, and reestablish
                structure before more time is lost to drift, inconsistency, and delay.
              </p>
            </div>

            <span className="block h-px bg-[#2e2e2e]" />

            <div className="grid gap-10 md:grid-cols-2">

              <div className="flex flex-col gap-5">
                <h3 className="font-display text-xl font-semibold text-[#f4f1ec]">
                  Forged Father Blueprint
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">
                  This is not another motivational download. It is a practical guide for
                  men who need a stronger starting point, a clearer standard, and a path
                  back to momentum they can actually sustain.
                </p>
              </div>

              <ul className="flex flex-col gap-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#9a9590]">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                    {f}
                  </li>
                ))}
              </ul>

            </div>

            <div className="flex flex-col gap-5">
              <Button href="/resources" variant="primary" size="lg" className="self-start">
                Get the Blueprint
              </Button>

              <div className="border-l-2 border-[#b8975a] pl-5">
                <p className="font-display text-sm italic text-[#9a9590]">
                  A man does not change when he feels like it. He changes when the cost of
                  staying the same becomes too high.
                </p>
              </div>
            </div>

          </div>
        </div>
      </PageContainer>
    </section>
  )
}
