'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import Button from '@/components/ui/Button'
import InstantResult from './InstantResult'
import { ORDERED_QUESTIONS, DEMAND_QUESTIONS, DEMAND_ANCHORS } from '@/lib/questions'
import { RESPONSE_CHOICES, dimensionScore, buildResult, type Scores } from '@/lib/capability'
import { DIMENSIONS, type MKey } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Stage = 'instruction' | 'questions' | 'demand' | 'generating' | 'result'

const STORAGE_KEY = 'ng.capability-profile.v1'

interface Saved {
  answers: Record<string, number>
  demands: Record<string, number>
  index: number
  stage: Stage
}

/**
 * The Four M Capability Profile assessment.
 *
 * Answers persist to localStorage on every keystroke so a refresh mid-session
 * resumes rather than restarting.
 *
 * NOTE ON PERSISTENCE: this build stores responses in the browser only. There
 * is no server, no database, and no email delivery wired up yet — the email
 * unlock below is explicit with the participant about that rather than
 * pretending to send something.
 */
export default function Assessment() {
  const [stage, setStage] = useState<Stage>('instruction')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [demands, setDemands] = useState<Record<string, number>>({})
  const [restored, setRestored] = useState(false)

  /* ── Resume any unfinished session ──────────────────────────────── */
  useEffect(() => {
    // Deferred to a frame so restoring does not cascade renders synchronously
    // inside the effect body.
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const saved = JSON.parse(raw) as Saved
          if (saved.answers) setAnswers(saved.answers)
          if (saved.demands) setDemands(saved.demands)
          if (typeof saved.index === 'number') setIndex(saved.index)
          if (saved.stage) setStage(saved.stage)
        }
      } catch {
        // A corrupt or unavailable store must never block the assessment.
      }
      setRestored(true)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!restored) return
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ answers, demands, index, stage } satisfies Saved)
      )
    } catch {
      // Private-mode storage failures are non-fatal.
    }
  }, [answers, demands, index, stage, restored])

  /* ── Scoring ────────────────────────────────────────────────────── */
  const result = useMemo(() => {
    const byDimension = (key: MKey) =>
      ORDERED_QUESTIONS.filter((q) => q.dimension === key)
        .map((q) => answers[q.id])
        .filter((v): v is number => typeof v === 'number')

    const scores: Scores = {
      mind: dimensionScore(byDimension('mind')),
      means: dimensionScore(byDimension('means')),
      measure: dimensionScore(byDimension('measure')),
      mastery: dimensionScore(byDimension('mastery')),
    }

    const allDemands = DEMAND_QUESTIONS.every((q) => typeof demands[q.id] === 'number')
    const demandValues = allDemands
      ? {
          mind: demands['demand-mind'],
          means: demands['demand-means'],
          measure: demands['demand-measure'],
          mastery: demands['demand-mastery'],
        }
      : null

    return buildResult(scores, demandValues)
  }, [answers, demands])

  /* ── Question flow ──────────────────────────────────────────────── */
  const total = ORDERED_QUESTIONS.length
  const current = ORDERED_QUESTIONS[index]

  const answer = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [current.id]: value }))
      // Brief confirmation beat before advancing, so the choice registers.
      window.setTimeout(() => {
        if (index + 1 < total) {
          setIndex(index + 1)
        } else {
          setStage('demand')
          setIndex(0)
        }
      }, 190)
    },
    [current, index, total]
  )

  // Desktop keyboard shortcuts, 1–5.
  useEffect(() => {
    if (stage !== 'questions') return
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (n >= 1 && n <= 5) {
        e.preventDefault()
        answer(RESPONSE_CHOICES[n - 1].value)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, answer])

  /* ── Result generation beat ─────────────────────────────────────── */
  useEffect(() => {
    if (stage !== 'generating') return
    const id = window.setTimeout(() => setStage('result'), 1500)
    return () => window.clearTimeout(id)
  }, [stage])

  const restart = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setAnswers({})
    setDemands({})
    setIndex(0)
    setStage('instruction')
  }

  /* ═══ INSTRUCTION ═══════════════════════════════════════════════ */
  if (stage === 'instruction') {
    const inProgress = Object.keys(answers).length > 0
    return (
      <Shell>
        <p className="label label-bronze">The Four M Capability Profile</p>
        <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-bone-50 md:text-5xl">
          Answer the person you are now.
        </h1>
        <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
          <p>
            Answer based on your current reality and how you have generally
            operated over the past 90 days.
          </p>
          <p>
            Do not answer based on your best day, your intentions, or the person
            you hope to become. When a statement does not fit perfectly, choose
            the response that best reflects what is reliably true in your real
            life.
          </p>
        </div>

        <div className="mt-9 border border-hairline bg-ink-850 p-6">
          <p className="label">Response scale</p>
          <ul className="mt-4 space-y-1.5">
            {RESPONSE_CHOICES.map((c) => (
              <li key={c.label} className="text-[0.9375rem] text-text-body">
                {c.label}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.875rem] leading-relaxed text-text-muted">
            <span className="text-bone-50">Usually true</span> is the standard.
            Reserve <span className="text-bone-50">Consistently true</span> for
            behaviour you can genuinely rely on across different situations.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button onClick={() => setStage('questions')} variant="primary" size="lg">
            {inProgress ? 'Continue' : 'Begin'}
          </Button>
          {inProgress && (
            <button
              type="button"
              onClick={restart}
              className="text-sm text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
            >
              Start over
            </button>
          )}
        </div>
      </Shell>
    )
  }

  /* ═══ 24 CAPABILITY QUESTIONS ═══════════════════════════════════ */
  if (stage === 'questions') {
    const chosen = answers[current.id]
    return (
      <Shell progress={(index) / total}>
        <div className="flex items-center justify-between">
          <p className="label">
            {index + 1} of {total}
          </p>
          {index > 0 && (
            <button
              type="button"
              onClick={() => setIndex(index - 1)}
              className="text-[0.8125rem] text-text-muted transition-colors hover:text-text-primary"
            >
              ← Back
            </button>
          )}
        </div>

        {/* The dimension is deliberately never shown: watching a domain score
            build in real time changes how people answer. */}
        <h1 className="mt-10 font-display text-[1.75rem] font-bold leading-[1.28] tracking-[-0.02em] text-bone-50 md:text-[2.125rem] md:leading-[1.24]">
          {current.text}
        </h1>

        <ul className="mt-11 space-y-2.5">
          {RESPONSE_CHOICES.map((choice, i) => (
            <li key={choice.label}>
              <button
                type="button"
                onClick={() => answer(choice.value)}
                className={cn(
                  'group flex w-full items-center gap-4 border px-5 py-4 text-left transition-colors',
                  chosen === choice.value
                    ? 'border-cobalt-500 bg-cobalt-500/10 text-bone-50'
                    : 'border-hairline bg-ink-850 text-text-body hover:border-hairline-bright hover:bg-ink-800'
                )}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-[0.625rem]',
                    chosen === choice.value
                      ? 'border-cobalt-400 text-cobalt-300'
                      : 'border-hairline-bright text-slate-600'
                  )}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-[0.9375rem]">{choice.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-7 hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-600 md:block">
          Tip: press 1–5
        </p>
      </Shell>
    )
  }

  /* ═══ RESPONSIBILITY DEMAND LAYER ═══════════════════════════════ */
  if (stage === 'demand') {
    const q = DEMAND_QUESTIONS[index]
    const value = demands[q.id] ?? 5
    const dimension = DIMENSIONS.find((d) => d.key === q.dimension)!

    const setValue = (v: number) => setDemands((p) => ({ ...p, [q.id]: v }))

    const next = () => {
      // Ensure an untouched slider still records its default.
      setDemands((p) => ({ ...p, [q.id]: p[q.id] ?? 5 }))
      if (index + 1 < DEMAND_QUESTIONS.length) setIndex(index + 1)
      else setStage('generating')
    }

    return (
      <Shell progress={0.86 + (index / DEMAND_QUESTIONS.length) * 0.14}>
        {index === 0 && (
          <div className="mb-10 border-l border-bronze-500/50 pl-5">
            <h2 className="font-display text-xl font-semibold text-bone-50">
              Now, what is your life asking of you?
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-muted">
              Capability matters in every season. Responsibility determines how
              urgently a gap may matter right now. These four answers do not
              change your scores.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="label label-bronze">{dimension.name} demand</p>
          <p className="label">
            {index + 1} of {DEMAND_QUESTIONS.length}
          </p>
        </div>

        <h1 className="mt-8 font-display text-[1.625rem] font-semibold leading-[1.3] tracking-[-0.02em] text-bone-50 md:text-[2rem]">
          {q.text}
        </h1>

        {/* Slider plus explicit buttons: a drag control cannot be the only
            way to answer. */}
        <div className="mt-11">
          <div className="flex items-baseline justify-between">
            <span className="label">Current demand</span>
            <span className="font-display text-4xl tabular-nums text-bone-50">
              {value}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label={`${dimension.name} demand, 1 to 10`}
            className="mt-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-ink-600 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-cobalt-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cobalt-500"
          />

          <div className="mt-5 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setValue(n)}
                aria-label={`Set demand to ${n}`}
                aria-pressed={value === n}
                className={cn(
                  'border py-2 font-mono text-[0.75rem] transition-colors',
                  value === n
                    ? 'border-cobalt-500 bg-cobalt-500/15 text-cobalt-300'
                    : 'border-hairline text-slate-500 hover:border-hairline-bright hover:text-text-body'
                )}
              >
                {n}
              </button>
            ))}
          </div>

          <ul className="mt-5 space-y-1">
            {DEMAND_ANCHORS.map((a) => (
              <li key={a.value} className="text-[0.8125rem] text-slate-500">
                <span className="font-mono text-slate-600">{a.value}</span>{' '}
                &nbsp;{a.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-11 flex items-center gap-5">
          <Button onClick={next} variant="primary" size="lg">
            {index + 1 < DEMAND_QUESTIONS.length ? 'Next' : 'See my profile'}
          </Button>
          {index > 0 && (
            <button
              type="button"
              onClick={() => setIndex(index - 1)}
              className="text-[0.8125rem] text-text-muted transition-colors hover:text-text-primary"
            >
              ← Back
            </button>
          )}
        </div>
      </Shell>
    )
  }

  /* ═══ RESULT GENERATION ═════════════════════════════════════════ */
  if (stage === 'generating') {
    return (
      <Shell>
        <div className="flex min-h-[40svh] flex-col justify-center">
          <ul className="space-y-2">
            {DIMENSIONS.map((d, i) => (
              <li
                key={d.key}
                className="font-mono text-sm uppercase tracking-[0.16em] text-slate-500"
                style={{
                  animation: `fade 0.4s ease ${i * 0.22}s both`,
                }}
              >
                Mapping {d.name}.
              </li>
            ))}
          </ul>
          <p
            className="mt-8 font-display text-2xl font-semibold text-bone-50"
            style={{ animation: 'fade 0.5s ease 1.05s both' }}
          >
            Building your Capability Profile.
          </p>
        </div>
      </Shell>
    )
  }

  /* ═══ RESULT ════════════════════════════════════════════════════ */
  return <InstantResult result={result} onRestart={restart} />
}

/* ── Shared chrome for every assessment screen ──────────────────────── */
function Shell({
  children,
  progress,
}: {
  children: React.ReactNode
  progress?: number
}) {
  return (
    <div className="min-h-svh bg-ink-900 pb-24 pt-24 md:pt-28">
      {progress !== undefined && (
        <div
          className="fixed inset-x-0 top-16 z-30 h-px bg-ink-700 md:top-[4.5rem]"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Assessment progress"
        >
          <div
            className="h-full bg-cobalt-500 transition-[width] duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      <Container width="narrow">
        <div className="py-10 md:py-14">{children}</div>

        <p className="mt-10 text-center text-[0.75rem] text-slate-600">
          <Link href="/capability-profile" className="hover:text-slate-500">
            The Four M Capability Profile
          </Link>{' '}
          · A proprietary self-assessment, not a clinical diagnostic.
        </p>
      </Container>
    </div>
  )
}
