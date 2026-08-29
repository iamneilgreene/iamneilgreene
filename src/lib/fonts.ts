import { Literata, Geist, Geist_Mono } from 'next/font/google'

/**
 * Three-level typographic system per the Modern Command visual lock:
 * editorial serif for philosophy statements, contemporary grotesk for
 * body/UI, monospace strictly as a technical accent.
 */

/**
 * Display — the Sage + Ruler voice.
 *
 * Literata rather than the obvious editorial serifs. Three constraints
 * decided it:
 *
 *   1. It has to carry weight. The philosophy statements are the argument,
 *      and a low-contrast text serif set light goes limp at display size.
 *      Literata's `wght` runs to 900 and its sturdy, slightly squared serifs
 *      hold at 700 without turning into a fashion masthead.
 *   2. It has to survive light-on-dark. Ink carries 60%+ of the surface, and
 *      hairline-contrast didones shimmer and thin out against it.
 *   3. It has to read institutional, not literary and not old-money. The
 *      brief bans both "academic professor with no lived action" and
 *      "luxury-flex", which rules out the cozy book serifs on one side and
 *      the high-contrast display serifs on the other.
 *
 * No `weight` array: this pulls the variable face so `wght` and `opsz` stay
 * continuous. The Question section animates `wght` directly.
 */
export const literata = Literata({
  subsets: ['latin'],
  variable: '--font-display-face',
  display: 'swap',
  style: ['normal', 'italic'],
})

/** Body / UI — modern grotesk. Clarity and technical precision. */
export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

/** Technical accent — labels, metrics, diagrams. Never the dominant voice. */
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const fontVariables = `${literata.variable} ${geist.variable} ${geistMono.variable}`
