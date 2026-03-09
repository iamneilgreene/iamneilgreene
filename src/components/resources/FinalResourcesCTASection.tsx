import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'
import Link from 'next/link'

// TODO: Wire to Blueprint email opt-in form or landing page when ready
const BLUEPRINT_HREF = '#blueprint'

export default function FinalResourcesCTASection() {
  return (
    <section className="relative bg-[#141414] py-24 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/30 to-transparent" />

      <PageContainer>
        <div className="flex flex-col items-center gap-10 text-center">

          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
            Start Here
          </span>

          <h2 className="font-display text-4xl font-semibold tracking-tight text-[#f4f1ec] md:text-5xl">
            Start With a Tool That Actually Moves You
          </h2>

          <span className="block h-px w-14 bg-[#b8975a]" />

          <p className="max-w-xl text-base leading-relaxed text-[#9a9590] md:text-lg">
            If you need a practical first step, begin with the Forged Father Blueprint. If you need
            a deeper standard, move into the book. If you need a stronger room, step into the
            Brotherhood. The point is not to collect content. The point is to move.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-center">
            <Button href={BLUEPRINT_HREF} variant="primary" size="lg">
              Get the Blueprint
            </Button>
            <Button href="/book" variant="gold-outline" size="lg">
              Get the Book
            </Button>
          </div>

          <Link
            href="/community"
            className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
          >
            Join the Brotherhood
          </Link>

        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
