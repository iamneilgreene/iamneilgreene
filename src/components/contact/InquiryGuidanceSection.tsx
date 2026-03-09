import PageContainer from '@/components/layout/PageContainer'

const guidelines = [
  'who you are',
  'what the inquiry is about',
  'event, media, or partnership details if relevant',
  'preferred timeline',
  'what outcome or conversation you are looking for',
]

export default function InquiryGuidanceSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer>
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#6b6158]">
                How to Reach Out
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
                What to Include in Your Message
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#3d3530]">
              A strong inquiry saves time on both sides. If you reach out with clarity, the next
              step becomes easier to see and easier to answer.
            </p>
            <ul className="flex flex-col gap-3">
              {guidelines.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#6b6158]">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-[#b8975a]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="border border-[#cfc8bb] p-8">
              <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
                Clarity earns faster movement.
              </p>
            </div>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-[#3d3530]">
              <p>
                If you are reaching out about coaching, the right starting point is the Apply page.
                That is where the process begins and where the right path is chosen.
              </p>
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
