import { DIMENSIONS, type MKey } from '@/lib/constants'
import { bandFor, BANDS, STANDARD, type Scores } from '@/lib/capability'
import { cn } from '@/lib/utils'

/**
 * Four aligned bars on one 1–10 scale, with the 8.0 standard drawn across
 * all four.
 *
 * Deliberately not a radar chart: radar exaggerates visual difference and
 * makes precise comparison harder, and the spec rules it out as the primary
 * visualisation. Band names are rendered as text beside every score so the
 * reading never depends on colour alone.
 */
export default function ScoreBars({
  scores,
  demands,
  highlight,
  onBone = false,
}: {
  scores: Scores
  /** When present, draws the responsibility demand as a marker on each bar. */
  demands?: Record<MKey, number> | null
  highlight?: MKey | null
  onBone?: boolean
}) {
  const pct = (v: number) => ((v - 1) / 9) * 100

  return (
    <div className="relative">
      {/* The standard line, drawn once across the full stack */}
      <div
        className="pointer-events-none absolute bottom-6 top-0 z-10 w-px bg-bronze-500/50"
        style={{ left: `calc(${pct(STANDARD)}% )` }}
        aria-hidden="true"
      />

      <ul className="space-y-5">
        {DIMENSIONS.map((d) => {
          const score = scores[d.key]
          const band = bandFor(score)
          const isHighlight = highlight === d.key
          const demand = demands?.[d.key]

          return (
            <li key={d.key}>
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={cn(
                    'font-mono text-[0.6875rem] uppercase tracking-[0.16em]',
                    isHighlight
                      ? onBone
                        ? 'text-ink-on-bone'
                        : 'text-bone-50'
                      : onBone
                        ? 'text-ink-on-bone-muted'
                        : 'text-slate-500'
                  )}
                >
                  {d.name}
                </span>
                <span className="flex items-baseline gap-3">
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem] uppercase tracking-[0.14em]',
                      onBone ? 'text-ink-on-bone-muted' : 'text-slate-500'
                    )}
                  >
                    {BANDS[band].label}
                  </span>
                  <span
                    className={cn(
                      'font-display text-2xl tabular-nums',
                      onBone ? 'text-ink-on-bone' : 'text-bone-50'
                    )}
                  >
                    {score.toFixed(1)}
                  </span>
                </span>
              </div>

              <div
                className={cn(
                  'relative mt-2 h-2.5 w-full',
                  onBone ? 'bg-bone-200' : 'bg-ink-700'
                )}
                role="img"
                aria-label={`${d.name}: ${score.toFixed(1)} out of 10, ${BANDS[band].label}${
                  demand ? `. Responsibility demand ${demand} out of 10` : ''
                }`}
              >
                <div
                  className={cn(
                    'h-full transition-[width] duration-700 ease-out',
                    score >= STANDARD ? 'bg-cobalt-500' : 'bg-slate-500'
                  )}
                  style={{ width: `${pct(score)}%` }}
                />

                {/* Responsibility demand marker — what life is asking here */}
                {demand !== undefined && (
                  <span
                    className={cn(
                      'absolute -top-1 h-4.5 w-px',
                      onBone ? 'bg-ink-800' : 'bg-bone-200'
                    )}
                    style={{ left: `${pct(demand)}%`, height: '1.125rem' }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <div
        className={cn(
          'mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em]',
          onBone ? 'text-ink-on-bone-muted' : 'text-slate-600'
        )}
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 bg-bronze-500/60" aria-hidden="true" />
          8.0 standard
        </span>
        {demands && (
          <span className="flex items-center gap-1.5">
            <span
              className={cn('h-3 w-px', onBone ? 'bg-ink-800' : 'bg-bone-200')}
              aria-hidden="true"
            />
            Responsibility demand
          </span>
        )}
      </div>
    </div>
  )
}
