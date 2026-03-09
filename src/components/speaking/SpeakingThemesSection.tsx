import PageContainer from '@/components/layout/PageContainer'

const themes = [
  {
    title: 'Discipline Under Pressure',
    body: 'How standards hold, or collapse, when pressure rises and comfort starts making decisions.',
  },
  {
    title: 'Leadership Through Standards',
    body: 'Why leadership weakens when private compromise and public expectation no longer match.',
  },
  {
    title: 'Accountability as a Performance Driver',
    body: 'How ownership, correction, and non-negotiable standards change execution across individuals and teams.',
  },
  {
    title: 'Resilience Without Excuses',
    body: 'What it takes to keep moving when pressure is real, comfort is tempting, and drift starts sounding reasonable.',
  },
  {
    title: 'Culture That Holds',
    body: 'How teams and organizations strengthen culture by raising standards, reducing tolerated weakness, and making ownership more visible.',
  },
]

export default function SpeakingThemesSection() {
  return (
    <section className="bg-[#141414] py-20 md:py-28">
      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Speaking Themes
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Speaking Themes
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#9a9590]">
              Neil&rsquo;s talks are built around the standards that shape performance, leadership,
              and culture when pressure rises. These themes are designed to challenge the room,
              sharpen thinking, and move people toward stronger execution.
            </p>
          </div>

          <div className="border border-[#2e2e2e]">
            {themes.map((theme, i) => (
              <div
                key={theme.title}
                className={`grid gap-6 p-8 md:grid-cols-[4rem_1fr_2fr] md:gap-10 md:items-start ${
                  i < themes.length - 1 ? 'border-b border-[#2e2e2e]' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#f4f1ec]">
                  {theme.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9590]">{theme.body}</p>
              </div>
            ))}
          </div>

          <div className="border border-[#2e2e2e] p-8">
            <p className="font-display text-sm italic leading-relaxed text-[#9a9590] md:text-base">
              The theme can be tailored. The standard behind it does not change.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
