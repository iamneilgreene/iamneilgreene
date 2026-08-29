'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

/**
 * Routed contact form with a reason-for-contact selector, pre-selected from
 * the `?reason=` parameter that the speaking, organizations, and community
 * pages link with.
 *
 * NOTE: no submission endpoint is wired up in this build. Rather than
 * pretending to send, the form says so plainly and offers a mailto fallback,
 * so nobody believes a message went somewhere it did not.
 */

const REASONS = [
  { value: 'speaking', label: 'Speaking inquiry' },
  { value: 'organization', label: 'Organization / advisory' },
  { value: 'individual', label: 'Working with Neil' },
  { value: 'community', label: 'DMV community' },
  { value: 'media', label: 'Media or partnership' },
  { value: 'other', label: 'Something else' },
] as const

export default function ContactForm() {
  const params = useSearchParams()
  const initial = params.get('reason')
  const [reason, setReason] = useState<string>(
    REASONS.some((r) => r.value === initial) ? (initial as string) : 'speaking'
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const mailto = `mailto:hello@iamneilgreene.com?subject=${encodeURIComponent(
    REASONS.find((r) => r.value === reason)?.label ?? 'Inquiry'
  )}&body=${encodeURIComponent(message)}`

  if (sent) {
    return (
      <div className="border border-hairline bg-ink-900 p-8 text-center">
        <p className="label label-bronze">Not sent</p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-bone-50">
          This form is not connected yet.
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted">
          Rather than silently discard your message, here it is as an email you
          can send directly.
        </p>
        <a
          href={mailto}
          className="mt-6 inline-flex items-center gap-2 border border-hairline-bright px-5 py-2.5 text-sm text-bone-50 transition-colors hover:border-slate-500"
        >
          Open in your email client
        </a>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 block w-full text-[0.8125rem] text-slate-600 transition-colors hover:text-text-muted"
        >
          Back to the form
        </button>
      </div>
    )
  }

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <fieldset>
        <legend className="label">Reason for contact</legend>
        <div className="mt-4 grid gap-px bg-hairline sm:grid-cols-2">
          {REASONS.map((r) => (
            <label
              key={r.value}
              className={cn(
                'cursor-pointer px-5 py-3.5 text-[0.9375rem] transition-colors',
                reason === r.value
                  ? 'bg-cobalt-500/10 text-bone-50'
                  : 'bg-ink-900 text-text-muted hover:bg-ink-850 hover:text-text-body'
              )}
            >
              <input
                type="radio"
                name="reason"
                value={r.value}
                checked={reason === r.value}
                onChange={() => setReason(r.value)}
                className="sr-only"
              />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label">Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-hairline-bright bg-ink-900 px-4 py-3 text-[0.9375rem] text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none"
            placeholder="Your name"
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

      <label className="block">
        <span className="label">Message</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full border border-hairline-bright bg-ink-900 px-4 py-3 text-[0.9375rem] text-bone-50 placeholder:text-slate-600 focus:border-cobalt-500 focus:outline-none"
          placeholder="What are you carrying, and what would help?"
        />
      </label>

      <Button type="submit" variant="primary" size="lg">
        Send
      </Button>

      <p className="border-t border-hairline pt-5 text-[0.75rem] leading-relaxed text-slate-600">
        Preview build: no submission endpoint is connected yet. Submitting will
        hand you a pre-filled email instead of pretending to deliver.
      </p>
    </form>
  )
}
