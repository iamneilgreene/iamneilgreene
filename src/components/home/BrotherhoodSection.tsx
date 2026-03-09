import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const features = [
  'accountability and brotherhood',
  'live sessions and guided challenges',
  'ongoing structure and direction',
  'a stronger environment than trying to do it alone',
  'a path into deeper coaching when the standard rises',
]

export default function BrotherhoodSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: Headline + intro */}
          <div className="flex flex-col gap-7">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Community
            </span>
            <h2 className="font-display text-3xl font-semibold leading-snug tracking-tight text-[#f4f1ec] md:text-4xl">
              Brotherhood Is What Keeps Standards From Dying in Isolation
            </h2>
            <p className="text-base leading-relaxed text-[#9a9590]">
              Most men do not break because they are incapable. They break because they are
              alone. No standard survives long in isolation. Forged By War Brotherhood is the
              environment for men who need sharper proximity, consistent accountability, and a
              room that refuses to let drift become normal.
            </p>
          </div>

          {/* Right: Offer detail */}
          <div className="flex flex-col gap-7 border border-[#2e2e2e] p-8 lg:p-10">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-semibold text-[#f4f1ec]">
                Forged By War Brotherhood
              </h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9a9590]">
                Skool Community
              </p>
            </div>

            <span className="block h-px bg-[#2e2e2e]" />

            <p className="text-sm leading-relaxed text-[#9a9590]">
              This is not passive content and empty motivation. It is a disciplined
              environment built for men who want accountability, challenge, direction, and a
              brotherhood that keeps them moving forward. Inside, men sharpen each other,
              stay anchored to a higher standard, and build consistency in a room designed
              for growth, correction, and momentum.
            </p>

            <ul className="flex flex-col gap-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#9a9590]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                  {f}
                </li>
              ))}
            </ul>

            <Button href="/community" variant="primary" size="md" className="mt-2 self-start">
              Join the Brotherhood
            </Button>
          </div>

        </div>

        {/* Closing line */}
        <div className="mt-14 border-t border-[#2e2e2e] pt-7">
          <p className="font-display text-base italic text-[#9a9590]">
            You do not rise to your intentions. You rise, or fall, to the environment that surrounds you.
          </p>
        </div>

      </PageContainer>
    </section>
  )
}
