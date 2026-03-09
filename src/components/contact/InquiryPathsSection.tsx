import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

// TODO: Wire to contact/speaking inquiry form when ready
const INQUIRY_HREF = '#inquiry-form'
const SPEAKING_HREF = '#inquiry-form'

const paths = [
  {
    title: 'Speaking',
    body: 'For event planners, organizers, leadership teams, and conferences looking to bring Neil Greene into the room.',
    cta: 'Book Neil to Speak',
    href: SPEAKING_HREF,
    variant: 'primary' as const,
  },
  {
    title: 'Partnerships and Collaborations',
    body: 'For aligned opportunities, strategic partnerships, interviews, joint events, or brand conversations.',
    cta: 'Send an Inquiry',
    href: INQUIRY_HREF,
    variant: 'gold-outline' as const,
  },
  {
    title: 'Media and Press',
    body: 'For podcast requests, media features, interviews, and related inquiries.',
    cta: 'Send an Inquiry',
    href: INQUIRY_HREF,
    variant: 'secondary' as const,
  },
  {
    title: 'General Contact',
    body: 'For direct questions or professional inquiries that do not belong under coaching or speaking.',
    cta: 'Send an Inquiry',
    href: INQUIRY_HREF,
    variant: 'secondary' as const,
  },
]

export default function InquiryPathsSection() {
  return (
    <section id="inquiry" className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-12">

          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Inquiry Types
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Choose the Right Inquiry Path
            </h2>
          </div>

          <div className="border border-[#2e2e2e] md:grid md:grid-cols-4 md:divide-x md:divide-[#2e2e2e]">
            {paths.map((path, i) => (
              <div
                key={path.title}
                className={`flex flex-col gap-5 p-8 ${
                  i < paths.length - 1 ? 'border-b border-[#2e2e2e] md:border-b-0' : ''
                }`}
              >
                <span className="font-display text-4xl font-semibold leading-none text-[#2e2e2e]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-semibold text-[#f4f1ec]">
                  {path.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-[#9a9590]">{path.body}</p>
                <Button href={path.href} variant={path.variant} size="sm">
                  {path.cta}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display text-base italic text-[#9a9590]">
              Use the clearest path possible so the conversation starts in the right place.
            </p>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
