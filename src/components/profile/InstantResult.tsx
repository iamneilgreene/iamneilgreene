'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import ScoreBars from './ScoreBars'
import ShareCard from './ShareCard'
import ProfileSubscription from './ProfileSubscription'
import { DIMENSIONS, MOVEMENT, type MKey } from '@/lib/constants'
import {
  bandFor,
  retestCalendar,
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

/** Interpret reported patterns without claiming predictive validity. */
function immediateInsight(result: CapabilityResult): string {
  if (result.priorityCandidates.length > 1) {
    return `Your responses do not establish one clear priority among ${result.priorityCandidates.map(nameOf).join(', ')}. Choose a starting point using a specific responsibility you face this month.`
  }
  return `${nameOf(result.developmentPriority)} is a suggested starting point based on your responses. Check it against a recent example before choosing what to work on.`
}

export default function InstantResult({
  result,
  onRestart,
  completedAt,
  storageNotice,
}: {
  storageNotice?: string
  completedAt?: string
  result: CapabilityResult
  onRestart: () => void
}) {
  const [chosenPriority, setChosenPriority] = useState<MKey | null>(null)
  const [choiceStorageIssue, setChoiceStorageIssue] = useState(false)
  const choiceStorageKey = `ng.profile-plan.${completedAt ?? 'legacy'}.${JSON.stringify(result.scores)}.${JSON.stringify(result.demands)}`
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(choiceStorageKey) as MKey | null
        if (saved && result.priorityCandidates.includes(saved)) setChosenPriority(saved)
      } catch {
        setChoiceStorageIssue(true)
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [choiceStorageKey, result.priorityCandidates])
  const choosePriority = (key: MKey) => {
    setChosenPriority(key)
    try {
      window.localStorage.setItem(choiceStorageKey, key)
      setChoiceStorageIssue(false)
    } catch {
      setChoiceStorageIssue(true)
    }
  }
  const [expanded, setExpanded] = useState<MKey | null>(null)

  const priority = chosenPriority ?? result.developmentPriority
  const needsChoice = result.priorityCandidates.length > 1 && !chosenPriority
  const priorityBand = bandFor(result.scores[priority])
  const plan = THIRTY_DAY_PLANS[priority]

  const highScores = DIMENSIONS.filter((d) => result.scores[d.key] >= 9.0)

  return (
    <div className="profile-result min-h-svh bg-ink-900 pb-24 pt-28 md:pt-32">
      <Container width="narrow">
        {/* ═══ FREE INSTANT RESULT ══════════════════════════════════ */}
        <p className="label label-bronze">The Four M Capability Profile</p>
        <h1 className="mt-5 font-display text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] text-bone-50 md:text-5xl">
          Your Capability Profile
        </h1>

        {storageNotice && <p role="status" className="mt-6 border border-border-input p-4 text-base text-text-body">{storageNotice}</p>}
        <div className="mt-11 border border-hairline bg-ink-850 p-6 md:p-9">
          <ScoreBars
            scores={result.scores}
            demands={result.demands}
            highlight={needsChoice ? null : priority}
          />
        </div>

        <p className="mt-6 text-base leading-relaxed text-text-body">
          These are self-reported patterns, not independently verified abilities or a prediction of performance.
          The bands and 8 standard belong to this framework, not a population comparison.
        </p>

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
              {result.advantages.length === 4 ? 'Similar reported scores' : 'Highest reported areas'}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-bone-50">
              {result.advantages.map(nameOf).join(' · ')}
            </p>
          </div>
          <div className="bg-ink-850 p-5">
            <p className="label">
              Suggested starting areas
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-bone-50">
              {result.priorityCandidates.map(nameOf).join(' · ')}
            </p>
          </div>
        </div>

        {/* Responsibility-Capability Gap — category only, never a decimal */}
        {result.largestGap ? (
          <div className="mt-6 border border-hairline bg-ink-850 p-5">
            <p className="label">Responsibility-Capability Gap</p>
            <p className="mt-2 font-display text-xl font-semibold text-bone-50">
              {result.largestGapDimensions.map((key) => `${nameOf(key)}: ${GAP_LABELS[result.gaps![key]]}`).join(' · ')}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">
              {GAP_DESCRIPTIONS[result.largestGap.category]}
            </p>
          </div>
        ) : (
          <div className="mt-6 border border-hairline bg-ink-850 p-5">
            <p className="label">Responsibility-Capability Gap</p>
            <p className="mt-2 font-display text-xl font-semibold text-bone-50">
              {result.demands ? 'No reported gap' : 'Demand not assessed'}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">
              {result.demands ? 'Your reported capability meets or exceeds your reported demand.' : 'Without demand responses, this profile cannot describe a responsibility-capability gap.'}
            </p>
          </div>
        )}

        {result.oneDimensionalRisk && (
          <div className="mt-6 border border-bronze-500/40 bg-bronze-500/[0.06] p-5">
            <p className="label label-bronze">Reported score spread</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-body">
              Your scores differ by at least two points. Look for a real example of
              whether this difference matters to your current responsibilities.
            </p>
          </div>
        )}

        {/* The one insight */}
        <p className="mt-9 font-display text-xl font-semibold leading-relaxed text-bone-50 md:text-2xl">
          {immediateInsight(result)}
        </p>

        {result.priorityCandidates.length > 1 && (
          <fieldset className="mt-8 border-t border-hairline pt-6">
            <legend className="font-display text-xl font-semibold text-bone-50">Choose one plan to start</legend>
            <p className="mt-3 text-base leading-relaxed text-text-body">These areas are close or carry competing signals. A small score difference does not establish which change will help most. Choose the area that fits a concrete responsibility; you can change it below.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {result.priorityCandidates.map((key) => (
                <button key={key} type="button" aria-pressed={chosenPriority === key}
                  onClick={() => choosePriority(key)}
                  className={cn('min-h-11 border border-border-input px-5 py-3 text-base text-bone-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-400', chosenPriority === key ? 'bg-cobalt-500' : 'bg-ink-850 hover:bg-ink-800')}>
                  {nameOf(key)}
                </button>
              ))}
            </div>
            <p role="status" className="mt-3 text-sm text-text-muted">{chosenPriority ? `${nameOf(chosenPriority)} plan selected.` : 'No plan selected yet.'} {choiceStorageIssue && 'Browser storage is unavailable. Your plan choice may reset on reload; save a printed copy.'}</p>
          </fieldset>
        )}
        <p className="mt-10 text-base leading-relaxed text-text-body">Your full profile is available below, in this browser. You can request an email copy below. Save a copy for yourself and add a calendar reminder if you want to return.</p>
        <FullProfile
          result={result} priority={priority} priorityBand={priorityBand} plan={plan}
          expanded={expanded} setExpanded={setExpanded}
          highScores={highScores.map((d) => d.key)} onRestart={onRestart}
          needsChoice={needsChoice} completedAt={completedAt}
        />
      </Container>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   FULL PROFILE
   ═══════════════════════════════════════════════════════════════════════ */

function FullProfile({
  result,
  priority,
  priorityBand,
  plan,
  expanded,
  setExpanded,
  highScores,
  onRestart,
  needsChoice,
  completedAt,
}: {
  result: CapabilityResult
  priority: MKey
  priorityBand: ReturnType<typeof bandFor>
  plan: (typeof THIRTY_DAY_PLANS)[MKey]
  expanded: MKey | null
  setExpanded: (v: MKey | null) => void
  highScores: MKey[]
  onRestart: () => void
  needsChoice: boolean
  completedAt?: string
}) {
  const [evidence, setEvidence] = useState('')
  const reminder = completedAt ? retestCalendar(completedAt) : null
  const retestDate = reminder?.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="mt-14">
      <div className="rule" />

      <h2 className="mt-12 font-display text-3xl font-bold tracking-[-0.02em] text-bone-50 md:text-4xl">
        Your full profile
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
                    <span className="label">{score >= 9 ? `${BANDS[band].label} range, self-reported` : BANDS[band].label}</span>
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
          <label htmlFor="profile-evidence" className="mt-4 block text-sm text-text-body">Optional example (not saved; include it in your printed copy)</label>
          <textarea
            id="profile-evidence"
            rows={3}
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
            placeholder="Optional. A real example, not a summary of your intentions."
            className="mt-4 w-full border border-border-input bg-ink-900 px-4 py-3 text-base text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none print:hidden"
          />
          <p className="hidden whitespace-pre-wrap break-words print:block">{evidence || 'No example recorded.'}</p>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-slate-600">
            A self-reported score can reach 9.0, but Proven and Exceptional are
            designations that evidence earns. Nothing here is independently
            verified.
          </p>
        </section>
      )}

      {!needsChoice ? <>
      {/* ── Primary development priority ───────────────────────────── */}
      <section className="mt-10 border border-cobalt-500/30 bg-cobalt-500/[0.05] p-6 md:p-8">
        <p className="label label-cobalt">Starting area for this plan</p>
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

      </> : <p className="mt-10 text-base text-text-body">Choose a starting area above to see one 30-day plan. All four score interpretations remain available here.</p>}

      {/* ── Share card ─────────────────────────────────────────────── */}
      <section className="mt-12">
        <p className="label">Share card</p>
        <div className="mt-5">
          <ShareCard result={result} selectedPriority={needsChoice ? null : priority} />
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
          {retestDate ?? 'Return in about 75 days'}
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-muted">
          The goal is not to collect a better identity label. It is to produce
          evidence that behaviour and capability changed.
        </p>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 print:hidden">
        <Button type="button" variant="secondary" onClick={() => window.print()}>Print or save profile</Button>
        {reminder && <a className="inline-flex min-h-11 items-center border border-border-input px-5 py-3 text-base text-bone-50 hover:bg-ink-850" href={`data:text/calendar;charset=utf-8,${encodeURIComponent(reminder.calendar)}`} download="capability-retest.ics">Download calendar reminder</a>}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">Printing lets you save a PDF. Import the downloaded file into your calendar to schedule a reminder; nothing is scheduled automatically. Browser storage can be cleared, and a score change alone does not prove capability changed.</p>

      {/* ── Next path ──────────────────────────────────────────────── */}
      <ProfileSubscription profile={{ scores: result.scores, demands: result.demands, selectedPriority: needsChoice ? null : priority, completedAt }} />
      <section className="mt-12">
        <p className="label">Where to go next</p>
        <ul className="mt-5 grid gap-px bg-hairline sm:grid-cols-2">
          {[
            { href: needsChoice ? '/ideas' : `/ideas/${priority}`, label: needsChoice ? 'Explore Ideas' : `Ideas on ${nameOf(priority)}` },
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
