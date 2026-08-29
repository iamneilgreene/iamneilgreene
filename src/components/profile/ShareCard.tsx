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
export default function ShareCard({ result }: { result: CapabilityResult }) {
  const [copied, setCopied] = useState(false)

  const shareText = [
    'I just completed the Four M Capability Profile.',
    ...DIMENSIONS.map((d) => `${d.name}: ${result.scores[d.key].toFixed(1)}`),
    `My development priority: ${nameOf(result.developmentPriority)}`,
    'Responsibility demands capability.',
    'iamneilgreene.com',
  ].join('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard can be blocked by permissions; the card is still readable.
    }
  }

  return (
    <div>
      <div className="border border-hairline-bright bg-ink-950 p-7 md:p-9">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bronze-500">
          The Four M Capability Profile
        </p>

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
              {result.coAdvantage ? 'Co-advantages' : 'Current advantage'}
            </dt>
            <dd className="mt-1 font-display text-lg text-bone-50">
              {nameOf(result.advantage)}
              {result.coAdvantage && ` + ${nameOf(result.coAdvantage)}`}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slate-600">
              Development priority
            </dt>
            <dd className="mt-1 font-display text-lg text-bone-50">
              {nameOf(result.developmentPriority)}
            </dd>
          </div>
        </dl>

        <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate-500">
          {result.standardMet
            ? 'Standard met'
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
        className="mt-4 border border-hairline-bright px-5 py-2.5 text-[0.8125rem] text-text-body transition-colors hover:border-slate-500 hover:text-bone-50"
      >
        {copied ? 'Copied' : 'Copy share text'}
      </button>
    </div>
  )
}
