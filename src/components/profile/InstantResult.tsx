'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import ScoreBars from './ScoreBars'
import ShareCard from './ShareCard'
import { DIMENSIONS, MOVEMENT, type MKey } from '@/lib/constants'
import {
  bandFor,
  BANDS,
  GAP_LABELS,
  GAP_DESCRIPTIONS,
  STANDARD,
  type CapabilityResult,
} from '@/lib/capability'
import {
  BAND_NARRATIVES,
  THIRTY_DAY_PLANS,
  INTENSITY_BY_BAND,
  IMMEDIATE_ACTION,
} from '@/lib/resultCopy'
import { cn } from '@/lib/utils'

const nameOf = (key: MKey) => DIMENSIONS.find((d) => d.key === key)!.name

/** One personalised sentence, derived from the priority and gap status. */
function immediateInsight(result: CapabilityResult): string {
  const priority = nameOf(result.developmentPriority)
  const gap = result.gaps?.[result.developmentPriority]

  if (gap === 'critical' || gap === 'active') {
    return `Your responsibilities are asking more of your ${priority} than your current profile reliably supports. Strengthening it should create the greatest immediate return.`
  }
  if (result.scores[result.developmentPriority] < 4.0) {
    return `${priority} is the dimension most likely to fail first under real demand. Stabilise it before optimising anything else.`
  }
  if (result.standardMet) {
    return `All four dimensions meet the standard. ${priority} is the one with the least margin, which makes it the most useful place to keep building.`
  }
  return `${priority} is currently doing the most to limit what the rest of your capability can produce.`
}

export default function InstantResult({
  result,
  onRestart,
}: {
  result: CapabilityResult
  onRestart: () => void
}) {
  const [unlocked, setUnlocked] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [expanded, setExpanded] = useState<MKey | null>(null)

  const priority = result.developmentPriority
  const priorityBand = bandFor(result.scores[priority])
  const plan = THIRTY_DAY_PLANS[priority]

  const highScores = DIMENSIONS.filter((d) => result.scores[d.key] >= 9.0)

  return (
    <div className="min-h-svh bg-ink-900 pb-24 pt-28 md:pt-32">
      <Container width="narrow">
        {/* ═══ FREE INSTANT RESULT ══════════════════════════════════ */}
        <p className="label label-bronze">The Four M Capability Profile</p>
        <h1 className="mt-5 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-5xl">
          Your Capability Profile
        </h1>

        <div className="mt-11 border border-hairline bg-ink-850 p-6 md:p-9">
          <ScoreBars
            scores={result.scores}
            demands={result.demands}
            highlight={priority}
          />
        </div>

        {/* Standard status — never an average */}
        <div className="mt-8 border border-hairline bg-ink-850/60 p-5">
          <p className="label label-bronze">Standard</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-bone-50">
            {result.standardMet ? 'Met' : 'Not yet met'}
          </p>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-text-muted">
            The standard is met only when all four dimensions reach {STANDARD.toFixed(1)}{' '}
            or higher.
          </p>
        </div>

        {/* Advantage / constraint */}
        <div className="mt-6 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          <div className="bg-ink-850 p-5">
            <p className="label">
              {result.coAdvantage ? 'Co-advantages' : 'Current advantage'}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-bone-50">
              {nameOf(result.advantage)}
              {result.coAdvantage && ` + ${nameOf(result.coAdvantage)}`}
            </p>
          </div>
          <div className="bg-ink-850 p-5">
            <p className="label">
              {result.constraint ? 'Current constraint' : 'Development priority'}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-bone-50">
              {nameOf(result.constraint ?? priority)}
            </p>
          </div>
        </div>

        {/* Responsibility-Capability Gap — category only, never a decimal */}
        {result.largestGap ? (
          <div className="mt-6 border border-hairline bg-ink-850 p-5">
            <p className="label">Responsibility-Capability Gap</p>
            <p className="mt-2 font-display text-xl font-semibold text-bone-50">
              {GAP_LABELS[result.largestGap.category]} ·{' '}
              {nameOf(result.largestGap.dimension)}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">
              {GAP_DESCRIPTIONS[result.largestGap.category]}
            </p>
          </div>
        ) : (
          <div className="mt-6 border border-hairline bg-ink-850 p-5">
            <p className="label">Responsibility-Capability Gap</p>
            <p className="mt-2 font-display text-xl font-semibold text-bone-50">
              No current gap
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">
              Your current capability appears to meet or exceed the responsibility
              demand you described.
            </p>
          </div>
        )}

        {result.oneDimensionalRisk && (
          <div className="mt-6 border border-bronze-500/40 bg-bronze-500/[0.06] p-5">
            <p className="label label-bronze">One-dimensional risk detected</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-body">
              Your strongest dimension is materially ahead of your weakest. That
              imbalance can become a constraint when responsibility lands on the
              underdeveloped area.
            </p>
          </div>
        )}

        {/* The one insight */}
        <p className="mt-9 font-display text-xl font-semibold leading-relaxed text-bone-50 md:text-2xl">
          {immediateInsight(result)}
        </p>

        {result.closeDevelopmentAreas && (
          <p className="mt-4 text-[0.875rem] leading-relaxed text-text-muted">
            Two close development areas:{' '}
            {nameOf(result.closeDevelopmentAreas[0])} and{' '}
            {nameOf(result.closeDevelopmentAreas[1])}. They are closely matched,
            so the one with higher responsibility demand was prioritised.
          </p>
        )}

        {/* ═══ EMAIL UNLOCK ═════════════════════════════════════════ */}
        {!unlocked ? (
          <div className="mt-12 border border-hairline bg-ink-850 p-6 md:p-9">
            <h2 className="font-display text-2xl font-semibold text-bone-50">
              Unlock my full profile
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
              Get your complete score interpretation, 30-day development plan,
              recommended resources, and retest reminder.
            </p>

            <form
              className="mt-7 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setUnlocked(true)
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">First name</span>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full border border-hairline-bright bg-ink-900 px-4 py-3 text-[0.9375rem] text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none"
                    placeholder="Your first name"
                  />
                </label>
                <label className="block">
                  <span className="label">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border border-hairline-bright bg-ink-900 px-4 py-3 text-[0.9375rem] text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                Unlock my full profile
              </Button>
            </form>

            {/* Honesty about the current build. This copy is temporary and
                should be replaced when a database and email provider are
                connected. */}
            <p className="mt-6 border-t border-hairline pt-5 text-[0.75rem] leading-relaxed text-slate-600">
              Preview build: this form does not yet send anything or store your
              details on a server. Your responses stay in this browser only.
            </p>
          </div>
        ) : (
          <FullProfile
            result={result}
            firstName={firstName}
            priority={priority}
            priorityBand={priorityBand}
            plan={plan}
            expanded={expanded}
            setExpanded={setExpanded}
            highScores={highScores.map((d) => d.key)}
            onRestart={onRestart}
          />
        )}
      </Container>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   FULL PROFILE
   ═══════════════════════════════════════════════════════════════════════ */

function FullProfile({
  result,
  firstName,
  priority,
  priorityBand,
  plan,
  expanded,
  setExpanded,
  highScores,
  onRestart,
}: {
  result: CapabilityResult
  firstName: string
  priority: MKey
  priorityBand: ReturnType<typeof bandFor>
  plan: (typeof THIRTY_DAY_PLANS)[MKey]
  expanded: MKey | null
  setExpanded: (v: MKey | null) => void
  highScores: MKey[]
  onRestart: () => void
}) {
  const retestDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 75)
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })()

  return (
    <div className="mt-14">
      <div className="rule" />

      <h2 className="mt-12 font-display text-3xl font-bold tracking-[-0.02em] text-bone-50 md:text-4xl">
        {firstName ? `${firstName}, your` : 'Your'} full profile
      </h2>

      {/* ── Per-dimension narratives ───────────────────────────────── */}
      <section className="mt-10">
        <p className="label">Score narratives</p>
        <ul className="mt-5 space-y-px bg-hairline">
          {DIMENSIONS.map((d) => {
            const score = result.scores[d.key]
            const band = bandFor(score)
            return (
              <li key={d.key} className="bg-ink-850 p-5 md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-normal uppercase tracking-[-0.01em] text-bone-50">
                    {d.name}
                  </h3>
                  <span className="flex items-baseline gap-3">
                    <span className="label">{BANDS[band].label}</span>
                    <span className="font-display text-xl tabular-nums text-bone-50">
                      {score.toFixed(1)}
                    </span>
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-body">
                  {BAND_NARRATIVES[d.key][band]}
                </p>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ── Evidence gate for 9.0+ ─────────────────────────────────── */}
      {highScores.length > 0 && (
        <section className="mt-10 border border-hairline bg-ink-850 p-6">
          <p className="label label-bronze">What supports this score?</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-body">
            You scored 9.0 or higher in{' '}
            {highScores.map((k) => nameOf(k)).join(' and ')}. What is one
            concrete example from the past 12 months where this capability
            produced a meaningful outcome under real demand?
          </p>
          <textarea
            rows={3}
            placeholder="Optional. A real example, not a summary of your intentions."
            className="mt-4 w-full border border-hairline-bright bg-ink-900 px-4 py-3 text-[0.9375rem] text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none"
          />
          <p className="mt-3 text-[0.75rem] leading-relaxed text-slate-600">
            A self-reported score can reach 9.0, but Proven and Exceptional are
            designations that evidence earns. Nothing here is independently
            verified.
          </p>
        </section>
      )}

      {/* ── Primary development priority ───────────────────────────── */}
      <section className="mt-10 border border-cobalt-500/30 bg-cobalt-500/[0.05] p-6 md:p-8">
        <p className="label label-cobalt">Primary development priority</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-bone-50">
          {nameOf(priority)}
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-body">
          {INTENSITY_BY_BAND[priorityBand]}
        </p>

        <div className="mt-6 border-t border-cobalt-500/20 pt-5">
          <p className="label">This week</p>
          <p className="mt-2 text-[1.0625rem] leading-relaxed text-bone-50">
            {IMMEDIATE_ACTION[priority]}
          </p>
        </div>
      </section>

      {/* ── The 30-day plan ────────────────────────────────────────── */}
      <section className="mt-10">
        <p className="label">30-day development plan</p>
        <div className="mt-5 border border-hairline bg-ink-850 p-6 md:p-8">
          <h3 className="font-display text-xl font-normal text-bone-50">
            {plan.objective}
          </h3>
          <p className="mt-2 text-[0.875rem] italic text-text-muted">{plan.why}</p>

          <ol className="mt-7 space-y-6">
            {plan.actions.map((a, i) => (
              <li key={a.title} className="flex gap-4">
                <span className="font-mono text-[0.625rem] text-slate-600">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="font-display text-lg font-normal text-bone-50">
                    {a.title}
                  </h4>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-body">
                    {a.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 border-t border-hairline pt-5">
            <p className="label">30-day evidence</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-body">
              {plan.evidence}
            </p>
          </div>
        </div>

        {/* The other three stay collapsed — one plan at a time. */}
        <div className="mt-4 space-y-px bg-hairline">
          {DIMENSIONS.filter((d) => d.key !== priority).map((d) => (
            <div key={d.key} className="bg-ink-900">
              <button
                type="button"
                onClick={() => setExpanded(expanded === d.key ? null : d.key)}
                aria-expanded={expanded === d.key}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-850"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-500">
                  {d.name} plan
                </span>
                <span className="text-slate-600" aria-hidden="true">
                  {expanded === d.key ? '−' : '+'}
                </span>
              </button>
              {expanded === d.key && (
                <div className="border-t border-hairline px-5 py-5">
                  <p className="text-[0.9375rem] text-bone-50">
                    {THIRTY_DAY_PLANS[d.key].objective}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {THIRTY_DAY_PLANS[d.key].actions.map((a) => (
                      <li key={a.title} className="text-[0.875rem] text-text-muted">
                        <span className="text-text-body">{a.title}.</span>{' '}
                        {a.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Share card ─────────────────────────────────────────────── */}
      <section className="mt-12">
        <p className="label">Share card</p>
        <div className="mt-5">
          <ShareCard result={result} />
        </div>
        <p className="mt-3 text-[0.75rem] leading-relaxed text-slate-600">
          Your responsibility demand answers, gap figures, and any evidence you
          wrote are never included here.
        </p>
      </section>

      {/* ── Retest ─────────────────────────────────────────────────── */}
      <section className="mt-12 border border-hairline bg-ink-850 p-6">
        <p className="label label-bronze">Retest window</p>
        <p className="mt-2 font-display text-xl font-semibold text-bone-50">
          {retestDate}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
          The goal is not to collect a better identity label. It is to produce
          evidence that behaviour and capability changed.
        </p>
      </section>

      {/* ── Next path ──────────────────────────────────────────────── */}
      <section className="mt-12">
        <p className="label">Where to go next</p>
        <ul className="mt-5 grid gap-px bg-hairline sm:grid-cols-2">
          {[
            { href: `/ideas/${priority}`, label: `Ideas on ${nameOf(priority)}` },
            { href: '/work/individuals', label: 'Work with Neil' },
            { href: '/books', label: 'Exposed & Ignite' },
            { href: '/community', label: 'The DMV community' },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block bg-ink-900 px-5 py-4 text-[0.9375rem] text-text-body transition-colors hover:bg-ink-850 hover:text-bone-50"
              >
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 border-t border-hairline pt-8 text-center">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bronze-500">
          {MOVEMENT}
        </p>
        <button
          type="button"
          onClick={onRestart}
          className={cn(
            'mt-6 text-[0.8125rem] text-slate-600 underline-offset-4',
            'transition-colors hover:text-text-muted hover:underline'
          )}
        >
          Retake the profile
        </button>
      </div>
    </div>
  )
}
