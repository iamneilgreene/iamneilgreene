import type { Metadata } from 'next'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import NGMark from '@/components/brand/NGMark'

export const metadata: Metadata = {
  title: 'Monogram — Neil Greene',
  robots: { index: false },
}

const SIZES = [256, 96, 48, 32, 16] as const

/** Wordmark lockup per the locked reference: spaced sans, bronze rule. */
function Lockup({ dark }: { dark: boolean }) {
  const ink = dark ? 'text-bone-50' : 'text-ink-950'
  const rule = dark ? 'border-bronze-400' : 'border-bronze-600'
  const sub = dark ? 'text-bronze-400' : 'text-bronze-600'
  return (
    <div className={`flex flex-col items-center ${ink}`}>
      <NGMark size={220} />
      <p className="mt-10 font-sans text-3xl font-medium uppercase tracking-[0.32em]">
        Neil Greene
      </p>
      <div className={`mt-4 flex w-full max-w-md items-center gap-4 ${sub}`}>
        <span className={`h-px flex-1 border-t ${rule}`} />
        <span className="font-sans text-sm font-medium uppercase tracking-[0.36em]">Capability</span>
        <span className={`h-px flex-1 border-t ${rule}`} />
      </div>
    </div>
  )
}

export default function LogoPreviewPage() {
  return (
    <main className="min-h-screen bg-ink-950 py-20 text-bone-50">
      <Container>
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-500">
          Identity · locked direction, vector build
        </p>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          The NG monogram.
        </h1>
        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-text-body">
          Built as geometry from the reference locked in the wireframe doc.
          Reference on the left, vector on the right, then the mark run down to
          16px — the favicon test.
        </p>

        {/* Reference vs vector */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <figure className="border border-hairline bg-bone-50 p-8">
            <div className="relative mx-auto aspect-[561/440] w-full max-w-sm">
              <Image src="/brand/ng-reference.png" alt="ChatGPT reference monogram" fill className="object-contain" sizes="24rem" />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-600">
              Reference (raster)
            </figcaption>
          </figure>
          <figure className="border border-hairline bg-bone-50 p-8 text-ink-950">
            <div className="mx-auto flex aspect-[561/440] w-full max-w-sm items-center justify-center">
              <NGMark size={380} />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-600">
              Vector (SVG)
            </figcaption>
          </figure>
        </div>

        {/* Scale run */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="flex flex-wrap items-end gap-10 border border-hairline bg-ink-950 p-8 text-bone-50">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <NGMark size={s} />
                <span className="font-mono text-[0.5625rem] text-slate-600">{s}px</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-10 border border-hairline bg-bone-50 p-8 text-ink-950">
            {SIZES.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <NGMark size={s} />
                <span className="font-mono text-[0.5625rem] text-slate-600">{s}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lockups */}
        <h2 className="mt-20 font-display text-2xl font-semibold">Lockup</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border border-hairline bg-ink-950 px-8 py-16">
            <Lockup dark />
          </div>
          <div className="border border-hairline bg-bone-50 px-8 py-16">
            <Lockup dark={false} />
          </div>
        </div>

        {/* App icon / favicon tiles */}
        <h2 className="mt-20 font-display text-2xl font-semibold">Icon tiles</h2>
        <div className="mt-8 flex flex-wrap items-end gap-8">
          <div className="flex h-32 w-32 items-center justify-center bg-ink-950 text-bone-50 ring-1 ring-hairline">
            <NGMark size={84} />
          </div>
          <div className="flex h-32 w-32 items-center justify-center bg-bone-50 text-ink-950">
            <NGMark size={84} />
          </div>
          <div className="flex h-32 w-32 items-center justify-center rounded-[1.75rem] bg-bone-50 text-ink-950 shadow-xl shadow-black/30">
            <NGMark size={84} />
          </div>
          <div className="flex h-16 w-16 items-center justify-center bg-ink-950 text-bone-50 ring-1 ring-hairline">
            <NGMark size={40} />
          </div>
          <div className="flex h-8 w-8 items-center justify-center bg-ink-950 text-bone-50 ring-1 ring-hairline">
            <NGMark size={20} />
          </div>
        </div>
      </Container>
    </main>
  )
}
