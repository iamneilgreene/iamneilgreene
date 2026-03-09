import PageContainer from '@/components/layout/PageContainer'

export default function WhyCoachingSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#9a7d45]">
              The Foundation
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              Why Coaching Exists
            </h2>
          </div>

          <span className="block h-px bg-[#cfc8bb]" />

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-[#3d3530]">
              Most men do not need more information. They need interruption, correction, and a
              structure strong enough to stop drift before it hardens into identity.
            </p>
            <p className="text-base leading-relaxed text-[#3d3530]">
              A man can know exactly what to do and still keep losing ground. Not because he
              lacks intelligence, but because knowledge without accountability is easy to
              negotiate with. Coaching exists to close the gap between what a man knows and
              what he is actually living.
            </p>
            <p className="text-base leading-relaxed text-[#3d3530]">
              Forged By War coaching is built for men who need more than motivation. They need
              standards, guidance, pressure, and a level of accountability that makes excuses
              harder to protect.
            </p>
          </div>

          {/* Closing line */}
          <div className="border border-[#cfc8bb] p-8">
            <p className="font-display text-lg font-semibold leading-snug text-[#1a1a1a]">
              When drift is winning, more information rarely changes a man. Structure does.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
