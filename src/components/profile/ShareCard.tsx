'use client'

import { useState } from 'react'
import { DIMENSIONS, PHILOSOPHY, type MKey } from '@/lib/constants'
import { STANDARD, type CapabilityResult } from '@/lib/capability'

const nameOf = (key: MKey) => DIMENSIONS.find((d) => d.key === key)!.name

/**
 * The shareable result card.
 *
 * Carries the four scores, the advantage, and the development priority — and
 * nothing else. Responsibility demand answers, the gap decimal, the email, and
 * any evidence text stay private by construction: they are never rendered
 * here, so they cannot leak through a screenshot or a copied string.
 */
export default function ShareCard({ result, selectedPriority = null }: { result: CapabilityResult; selectedPriority?: MKey | null }) {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  const shareText = [
    'My Four M Capability Profile: self-reported, not independently verified.',
    ...DIMENSIONS.map((d) => `${d.name}: ${result.scores[d.key].toFixed(1)}`),
    selectedPriority ? `My chosen starting area: ${nameOf(selectedPriority)}` : `Suggested starting areas: ${result.priorityCandidates.map(nameOf).join(', ')}`,
    'The 8 standard belongs to this framework; scores are not a population comparison.',
    'Responsibility demands capability.',
    'iamneilgreene.com',
  ].join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopyFailed(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
      setCopyFailed(true)
    }
  }

  return (
    <div>
      <div className="border border-hairline-bright bg-ink-950 p-7 md:p-9">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bronze-500">
          The Four M Capability Profile
        </p>

        <p className="mt-3 text-sm leading-relaxed text-text-body">Self-reported, not independently verified. The 8 standard belongs to this framework; these scores do not compare you with other people.</p>
        <ul className="mt-7 space-y-3">
          {DIMENSIONS.map((d) => (
            <li
              key={d.key}
              className="flex items-baseline justify-between border-b border-hairline pb-2"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slate-500">
                {d.name}
              </span>
              <span className="font-display text-2xl tabular-nums text-bone-50">
                {result.scores[d.key].toFixed(1)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-7 grid grid-cols-2 gap-5">
          <div>
            <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slate-600">
              Highest reported areas
            </dt>
            <dd className="mt-1 font-display text-lg text-bone-50">
              {result.advantages.map(nameOf).join(' · ')}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slate-600">
              {selectedPriority ? 'Chosen starting area' : 'Suggested starting areas'}
            </dt>
            <dd className="mt-1 font-display text-lg text-bone-50">
              {selectedPriority ? nameOf(selectedPriority) : result.priorityCandidates.map(nameOf).join(' · ')}
            </dd>
          </div>
        </dl>

        <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-500">
          {result.standardMet
            ? 'Self-reported 8 standard met'
            : `Building toward the ${STANDARD.toFixed(1)} standard`}
        </p>

        <div className="mt-7 flex items-baseline justify-between border-t border-hairline pt-5">
          <span className="font-display text-[0.9375rem] italic text-bronze-400">
            {PHILOSOPHY}
          </span>
          <span className="font-mono text-[0.625rem] text-slate-600">
            iamneilgreene.com
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={copy}
        className="mt-4 min-h-11 border border-border-input px-5 py-2.5 text-sm text-text-body transition-colors hover:border-slate-500 hover:text-bone-50"
      >
        {copied ? 'Copied' : 'Copy share text'}
      </button>
      <p role="status" className="mt-3 text-sm text-text-body">{copied ? 'Share text copied.' : copyFailed ? 'Clipboard access was unavailable. Select and copy the text below.' : 'Sharing includes your scores. Share only what you are comfortable making public.'}</p>
      {copyFailed && <label className="mt-3 block text-sm text-text-body">Share text
        <textarea readOnly value={shareText} rows={9} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full border border-border-input bg-ink-900 p-3 text-base text-bone-50" />
      </label>}
    </div>
  )
}
