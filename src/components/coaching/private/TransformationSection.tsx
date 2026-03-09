import PageContainer from '@/components/layout/PageContainer'

const transformations = [
  {
    title: 'Discipline Tightens',
    body: 'You stop relying on the version of yourself that only shows up when you feel strong. Standards become clearer, more lived, and harder to negotiate with.',
  },
  {
    title: 'Execution Sharpens',
    body: 'What has been delayed, avoided, or repeatedly restarted begins to move with more consistency, more clarity, and less internal resistance.',
  },
  {
    title: 'Leadership Aligns',
    body: 'Your private standards begin to match the weight you carry in public, which changes how you lead at home, at work, and under pressure.',
  },
  {
    title: 'Strength Returns',
    body: 'Your body, habits, and routines stop reflecting drift and start reflecting self-command again.',
  },
  {
    title: 'Blind Spots Shrink',
    body: 'What you have been too close to see on your own becomes easier to confront, correct, and rebuild.',
  },
]

export default function TransformationSection() {
  return (
    <section className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              The Outcome
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              What Changes Through the Work
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              The goal of private coaching is not to make a man temporarily inspired. It is to
              help him rebuild command where drift has been quietly taking ground. The change is
              not cosmetic. It is structural.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {transformations.map((t, i) => (
              <div
                key={t.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < transformations.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {t.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              The work changes a man by changing what he is willing to tolerate from himself.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
