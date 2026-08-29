/**
 * The NG monogram — vector build of the locked direction in the wireframe
 * doc ("Selected Brand Monogram — Locked", Variation 1, second refinement).
 *
 * Construction, in reference coordinates (560 × 440):
 *   • N — left stem full height; diagonal falls to the foot of a shorter
 *     right stem whose top sits inside the G ring.
 *   • G — a ~300° ring, opening top-right, closed by a bar pointing inward.
 *   • The diagonal passes THROUGH the ring: a mask cuts the ring on either
 *     side of the diagonal so the letters read as interlocked, not stacked.
 *
 * Single colour via currentColor so it can sit on ink or bone unchanged.
 */

type Props = { size?: number; className?: string; title?: string }

const STROKE = 56
const GAP = 13

// The whole N as one polygon so there are no overlap seams. Diagonal is 85
// wide horizontally at slope 1.055, which is ~58 perpendicular — same
// weight as the stems.
const N = 'M50 30 H135 L304 208 V115 H360 V362 L106 94 V410 H50 Z'
// Diagonal alone, for the interlock mask
const DIAGONAL = 'M50 30 H135 L360 267 V362 L106 94 Z'

export default function NGMark({ size = 64, className, title = 'NG monogram' }: Props) {
  const id = 'ng-ring-mask'
  return (
    <svg
      width={size}
      height={(size * 440) / 560}
      viewBox="0 0 560 440"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="440">
          <rect width="560" height="440" fill="white" />
          {/* the diagonal, fattened by the interlock gap on both sides */}
          <path d={DIAGONAL} fill="black" stroke="black" strokeWidth={GAP * 2} strokeLinejoin="miter" />
          {/* the diagonal's foot sits inside the ring; keep the ring whole there */}
          <rect x="0" y="352" width="560" height="88" fill="white" />
        </mask>
      </defs>

      {/* G ring — from the bar (13°) clockwise round to the top-right terminal (313°) */}
      <path
        d="M513.8 276.7 A163 163 0 1 1 466.2 120.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        mask={`url(#${id})`}
      />
      {/* G bar */}
      <rect x="390" y="249" width="151" height={STROKE} fill="currentColor" />

      {/* N */}
      <path d={N} fill="currentColor" />
    </svg>
  )
}
