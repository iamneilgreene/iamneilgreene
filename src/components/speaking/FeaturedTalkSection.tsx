import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FeaturedTalkSection() {
  return (
    <section id="featured-talk" className="relative bg-[#0d0d0d] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />

      <PageContainer>
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
                Featured Talk
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
                See Neil Greene Speak
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#9a9590] md:text-right">
              Use this featured clip to experience Neil&rsquo;s delivery, presence, and message
              before booking him for your event.
            </p>
          </div>

          {/* 16:9 Video Container */}
          {/* TODO: Replace placeholder with actual video embed URL (YouTube, Vimeo, or hosted video) */}
          <div className="relative w-full border border-[#2e2e2e]" style={{ paddingTop: '56.25%' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d0d0d]">
              <div className="flex h-16 w-16 items-center justify-center border border-[#2e2e2e]">
                <svg
                  className="ml-1 h-6 w-6 text-[#b8975a]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e2e2e]">
                Video placeholder
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#f4f1ec]">
                Forged By Fire | Featured Speaking Clip
              </p>
              <p className="text-sm leading-relaxed text-[#9a9590]">
                See Neil Greene in motion during a live speaking appearance from Forged By Fire,
                where he challenged the room around discipline, pressure, and the standards
                required to change.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="md" className="shrink-0">
              Book Neil to Speak
            </Button>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
