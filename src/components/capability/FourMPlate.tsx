'use client'

import { DIMENSIONS, type MKey } from '@/lib/constants'
import { cn } from '@/lib/utils'

/**
 * The Four M instrument, drawn flat.
 *
 * Replaced the WebGL core: a rotating object added spectacle without adding
 * explanation, which fails the brief's own first principle ("clarity wins
 * ties. If it only decorates, remove it"). This is the same argument as an
 * engraved plate: four quadrants, one standard, one system. It weighs
 * nothing, ships everywhere, and looks drafted rather than rendered.
 *
 * `active` singles out one quadrant while the others recede. `null` is the
 * assembled state: all four lit evenly around the standard.
 */
export default function FourMPlate({
  active = null,
  className,
}: {
  active?: MKey | null
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative aspect-square border border-ink-600 bg-ink-950',
        className
      )}
      role="img"
      aria-label="The four capability dimensions: Mind, Means, Measure, Mastery, held to one standard"
    >
      {/* Corner ticks — drafting marks, not decoration: they mark the plate
          as a measured figure */}
      {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r',
        'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((pos) => (
        <span
          key={pos}
          className={cn('absolute h-4 w-4 border-bronze-500', pos)}
          style={{ margin: '-1px' }}
          aria-hidden="true"
        />
      ))}

      {/* The quadrants */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {DIMENSIONS.map((d, i) => {
          const lit = active === null || active === d.key
          const singled = active === d.key
          return (
            <div
              key={d.key}
              className={cn(
                'relative flex flex-col justify-between p-5 transition-all duration-500 ease-out md:p-7',
                i === 0 && 'border-b border-r border-ink-700',
                i === 1 && 'border-b border-ink-700',
                i === 2 && 'border-r border-ink-700',
                singled && 'bg-ink-900'
              )}
            >
              <div
                className={cn(
                  'flex items-baseline justify-between',
                  i < 2 && 'order-last'
                )}
              >
                <span
                  className={cn(
                    'font-mono text-[0.625rem] tabular-nums transition-colors duration-500',
                    lit ? 'text-bronze-500' : 'text-ink-600'
                  )}
                >
                  0{i + 1}
                </span>
                <span
                  className={cn(
                    'font-mono text-[0.5625rem] uppercase tracking-[0.14em] transition-colors duration-500',
                    singled ? 'text-cobalt-300' : 'text-transparent'
                  )}
                >
                  Active
                </span>
              </div>

              <div>
                <p
                  className={cn(
                    'font-display text-lg font-bold uppercase sm:text-xl tracking-[-0.01em] transition-colors duration-500 md:text-2xl',
                    lit ? 'text-bone-50' : 'text-slate-600'
                  )}
                >
                  {d.name}
                </p>
                <p
                  className={cn(
                    'mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] transition-colors duration-500',
                    lit ? 'text-slate-500' : 'text-ink-600'
                  )}
                >
                  {d.question}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* The standard, held at the centre where the four meet */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="flex h-16 w-16 items-center justify-center border border-bronze-500 bg-ink-950 md:h-20 md:w-20">
          <div className="text-center">
            <p className="font-mono text-sm font-medium tabular-nums text-bone-50 md:text-base">
              8.0
            </p>
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-bronze-500">
              Standard
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
