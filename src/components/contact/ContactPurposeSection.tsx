import PageContainer from '@/components/layout/PageContainer'

export default function ContactPurposeSection() {
  return (
    <section className="bg-[#eae5dc] py-20 md:py-28">
      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl">
              What This Page Is For
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-[#3d3530]">
            <p>
              This page is for clear, direct inquiries, speaking requests, partnership
              conversations, media opportunities, and general contact. It exists to make the right
              conversations easier to start without forcing every question through the wrong path.
            </p>
            <p>
              If you are looking to work with Neil through coaching, the Apply page is the better
              route. If you are reaching out for speaking, collaboration, media, or a direct
              question, this is the right place to begin.
            </p>
          </div>

          <div className="border-l-2 border-[#b8975a] pl-5">
            <p className="font-display text-sm italic leading-relaxed text-[#6b6158] md:text-base">
              The clearer the reason for reaching out, the easier it is to move the conversation
              forward.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
