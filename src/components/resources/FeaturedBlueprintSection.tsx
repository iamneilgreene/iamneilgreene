import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Wire to Blueprint email opt-in form or landing page when ready
const BLUEPRINT_HREF = '#blueprint'

const features = [
  'a clearer standard for daily discipline',
  'practical starting points for strength and consistency',
  'habit correction that closes the gap between knowing and doing',
  'a cleaner path back to structure',
  'a direct bridge into the Forged By War ecosystem',
]

export default function FeaturedBlueprintSection() {
  return (
    <section id="blueprint" className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20 md:items-start">

          {/* Left — Blueprint document preview */}
          <div className="border border-[#b8975a]/30 bg-[#141414] p-8 flex flex-col gap-6">
            <div className="border-b border-[#2e2e2e] pb-4">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#b8975a]">
                Forged By War
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl font-semibold text-[#f4f1ec]">
                Forged Father Blueprint
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9a9590]">
                Practical Framework
              </p>
            </div>
            <div className="flex flex-col pt-2">
              {['Daily Discipline Standard', 'Strength & Consistency', 'Habit Correction', 'Cleaner Path Back to Structure', 'Bridge Into Forged By War'].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 border-b border-[#2e2e2e] py-3"
                >
                  <span className="font-display text-xs font-semibold text-[#b8975a]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-[#9a9590]">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="block h-px w-6 bg-[#b8975a]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b8975a]">
                Free Download
              </span>
            </div>
          </div>

          {/* Right — copy and CTA */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                Featured Resource
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                Start With the Forged Father Blueprint
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-base leading-relaxed text-[#9a9590]">
              <p>
                The Forged Father Blueprint is the clearest starting point for men who know
                something is slipping and need a practical way to regain structure. It is built to
                help you reset standards, sharpen discipline, and take back ground before more time
                is lost to drift.
              </p>
              <p>
                This is not another motivational download. It is a practical framework for men who
                need stronger habits, clearer priorities, and a cleaner first step into rebuilding.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#b8975a]">
                Inside the Blueprint
              </p>
              <ul className="flex flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#9a9590]">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5 pt-2">
              <Button href={BLUEPRINT_HREF} variant="primary" size="lg" className="self-start">
                Get the Blueprint
              </Button>
              <div className="border-l-2 border-[#b8975a] pl-5">
                <p className="font-display text-sm italic leading-relaxed text-[#9a9590]">
                  The Blueprint is built for men who do not need more inspiration. They need a
                  place to start that actually moves them.
                </p>
              </div>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
