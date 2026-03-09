import PageContainer from '@/components/layout/PageContainer'

const futureResources = [
  'practical discipline guides',
  'performance reset tools',
  'accountability frameworks',
  'tactical habit-building resources',
  'leadership and self-command tools',
]

export default function FutureResourcesSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#6b6158]">
                Coming
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
                More Tools. Same Standard.
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-[#3d3530]">
              <p>
                The Resources page is built to grow, but not to become noise. Every future guide,
                framework, and tool will serve the same purpose, helping men move from drift into
                structure with practical resources they can actually use.
              </p>
              <p>
                Some tools will be short and tactical. Others will go deeper. But all of them will
                be built around one conviction: a man does not change because he consumes more
                content. He changes when he applies the right tool with enough honesty to let it
                correct him.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#6b6158]">
                Future resources may include
              </p>
              <ul className="flex flex-col gap-3">
                {futureResources.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-[#6b6158]">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#cfc8bb]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#cfc8bb] p-8">
              <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
                The library may expand. The standard will not.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
