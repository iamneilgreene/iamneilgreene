'use client'

import { useState, useId } from 'react'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import { CTA_PRIMARY } from '@/lib/constants'
import { gapCategory, GAP_LABELS, GAP_DESCRIPTIONS, type GapCategory } from '@/lib/capability'
import { cn } from '@/lib/utils'

/**
 * SECTION 4 — THE RESPONSIBILITY-CAPABILITY GAP
 *
 * A clean two-variable comparison, not a dashboard pretending to be science.
 * The visitor sets what their life currently demands against what they can
 * reliably supply, and reads the same four gap categories the real profile
 * uses — the thresholds come from the shared scoring engine, so this teaser
 * can never drift out of step with the assessment itself.
 */

const CATEGORY_STYLES: Record<GapCategory, { dot: string; text: string }> = {
  no_gap: { dot: 'bg-emerald-600', text: 'text-emerald-800' },
  watch: { dot: 'bg-bronze-500', text: 'text-bronze-600' },
  active: { dot: 'bg-orange-600', text: 'text-orange-800' },
  critical: { dot: 'bg-red-700', text: 'text-red-800' },
}

function Slider({
  label,
  hint,
  value,
  onChange,
  accent,
}: {
  label: string
  hint: string
  value: number
  onChange: (v: number) => void
  accent: 'demand' | 'capability'
}) {
  const id = useId()
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-on-bone-muted"
        >
          {label}
        </label>
        <span className="font-display text-2xl tabular-nums text-ink-on-bone">
          {value.toFixed(1)}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={1}
        max={10}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-bone-300',
          '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bone-100 [&::-webkit-slider-thumb]:shadow',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-bone-100',
          accent === 'demand'
            ? '[&::-webkit-slider-thumb]:bg-ink-800 [&::-moz-range-thumb]:bg-ink-800'
            : '[&::-webkit-slider-thumb]:bg-cobalt-500 [&::-moz-range-thumb]:bg-cobalt-500'
        )}
      />
      <p className="mt-2 text-[0.8125rem] text-ink-on-bone-muted">{hint}</p>
    </div>
  )
}

export default function TheGap() {
  const [demand, setDemand] = useState(8.5)
  const [capability, setCapability] = useState(6.5)

  const category = gapCategory(demand, capability)
  const styles = CATEGORY_STYLES[category]

  // Bars share one 1–10 scale so the two are visually comparable.
  const pct = (v: number) => `${((v - 1) / 9) * 100}%`

  return (
    <section className="border-t border-hairline bg-bone-100 py-24 text-ink-on-bone-body md:py-36">
      <Container>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-lg font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink-on-bone md:text-5xl">
              Where has your responsibility outgrown your capability?
            </h2>

            <p className="mt-8 max-w-md text-[1.0625rem] leading-relaxed">
              Success can increase responsibility faster than capability. The gap
              is where fragility begins.
            </p>

            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-on-bone-muted">
              A new leader whose authority has grown faster than their Mastery.
              A parent whose responsibilities exceed their physical Measure. A
              professional whose role now requires judgment their Mind has not
              yet developed.
            </p>

            <Button href={CTA_PRIMARY.href} variant="on-bone" size="lg" className="mt-9">
              {CTA_PRIMARY.label}
            </Button>
          </div>

          {/* ── The comparison ─────────────────────────────────────── */}
          <div className="border border-hairline-on-bone bg-bone-50 p-6 md:p-9">
            <div className="space-y-7">
              <Slider
                label="Responsibility demand"
                hint="What your life currently requires of you in one area."
                value={demand}
                onChange={setDemand}
                accent="demand"
              />
              <Slider
                label="Your capability"
                hint="What you can reliably supply there today."
                value={capability}
                onChange={setCapability}
                accent="capability"
              />
            </div>

            {/* Two bars on one axis, with the standard marked */}
            <div className="relative mt-10 space-y-2.5" aria-hidden="true">
              <div
                className="absolute -top-4 bottom-0 w-px bg-bronze-500/60"
                style={{ left: pct(8) }}
              >
                <span className="absolute -top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-bronze-600">
                  8.0
                </span>
              </div>
              <div className="h-2.5 w-full bg-bone-200">
                <div className="h-full bg-ink-800" style={{ width: pct(demand) }} />
              </div>
              <div className="h-2.5 w-full bg-bone-200">
                <div className="h-full bg-cobalt-500" style={{ width: pct(capability) }} />
              </div>
            </div>

            <div
              className="mt-8 border-t border-hairline-on-bone pt-6"
              aria-live="polite"
            >
              <div className="flex items-center gap-2.5">
                <span className={cn('h-2 w-2 rounded-full', styles.dot)} />
                <p
                  className={cn(
                    'font-mono text-[0.6875rem] uppercase tracking-[0.16em]',
                    styles.text
                  )}
                >
                  {GAP_LABELS[category]}
                </p>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-on-bone-body">
                {GAP_DESCRIPTIONS[category]}
              </p>
            </div>

            <p className="mt-6 text-[0.75rem] leading-relaxed text-ink-on-bone-muted">
              Low responsibility does not make low capability acceptable. Demand
              affects urgency, not the standard.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
