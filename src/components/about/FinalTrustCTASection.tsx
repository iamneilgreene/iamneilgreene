import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

export default function FinalTrustCTASection() {
  return (
    <section className="relative bg-[#0d0d0d] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            The Next Move
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            If the Standard Matters, the Next Move Should Too
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <div className="flex max-w-xl flex-col gap-4">
            <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
              You do not need more noise, more theory, or another voice telling you what you already
              know. You need a standard that can hold under pressure, a structure that corrects
              drift, and a path that moves you back into strength, clarity, and discipline.
            </p>
            <p className="text-base leading-relaxed text-[#9a9590] md:text-lg">
              If that is what you are after, there is a way to begin. Work privately. Step into the
              Brotherhood. Start with the book. Or bring the message into the room.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Button href="/apply" variant="primary" size="lg">
              Work With Neil
            </Button>
            <Button href="/community" variant="gold-outline" size="lg">
              Join the Brotherhood
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book Neil to Speak
            </Button>
            <Button href="/book" variant="ghost" size="lg">
              Get the Book
            </Button>
          </div>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
