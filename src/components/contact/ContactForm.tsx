'use client'

import { useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const REASONS = [
  { value: 'speaking', label: 'Speaking inquiry' },
  { value: 'organization', label: 'Organization / advisory' },
  { value: 'individual', label: 'Working with Neil' },
  { value: 'community', label: 'DMV community' },
  { value: 'media', label: 'Media or partnership' },
  { value: 'other', label: 'Something else' },
] as const
const inputClass = 'mt-2 w-full border border-border-input bg-ink-900 px-4 py-3 text-base text-bone-50 placeholder:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt-400'

export default function ContactForm() {
  const params = useSearchParams()
  const initial = params.get('reason')
  const [reason, setReason] = useState<string>(REASONS.some((r) => r.value === initial) ? initial! : 'other')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const inFlight = useRef(false)
  const statusRef = useRef<HTMLDivElement>(null)
  const reasonLabel = REASONS.find((r) => r.value === reason)?.label ?? 'Inquiry'
  const mailto = `mailto:hello@iamneilgreene.com?subject=${encodeURIComponent(reasonLabel)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inFlight.current || saved) return
    inFlight.current = true
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reason, message }),
        signal: AbortSignal.timeout(60_000),
      })
      const payload = await response.json()
      if (!response.ok || payload.success !== true || payload.receipt !== 'saved') {
        throw new Error(typeof payload.error === 'string' ? payload.error : 'We could not confirm your inquiry was saved. Your text is still here; please use the email link below.')
      }
      setSaved(true)
    } catch (failure) {
      setError(failure instanceof Error && failure.name === 'Error'
        ? failure.message
        : 'We could not confirm receipt. Your text is still here; please use the email link below and mention this error.')
    } finally {
      setPending(false)
      inFlight.current = false
      window.requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  return (
    <form className="space-y-7" onSubmit={submit} aria-busy={pending}>
      <div ref={statusRef} tabIndex={-1} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt-400">
        {saved && <div role="status" className="border border-hairline bg-ink-850 p-6">
          <h2 className="font-display text-2xl font-semibold text-bone-50">Your inquiry is saved.</h2>
          <p className="mt-3 text-base leading-relaxed text-text-body">Your message and contact details are recorded for Neil to review. This is a saved inquiry, not an email delivery confirmation. You have not been subscribed to educational emails.</p>
        </div>}
        {error && <p role="alert" className="border border-border-input p-5 text-base leading-relaxed text-bone-50">{error}</p>}
      </div>

      <fieldset disabled={pending || saved} className="space-y-7 disabled:opacity-75">
        <legend className="sr-only">Contact details</legend>
        <fieldset>
          <legend className="label">Reason for contact</legend>
          <div className="mt-4 grid gap-px bg-hairline sm:grid-cols-2">
            {REASONS.map((r) => <label key={r.value} className={cn(
              'flex min-h-11 cursor-pointer items-center gap-3 px-5 py-3.5 text-base transition-colors focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-cobalt-400',
              reason === r.value ? 'bg-cobalt-500/10 text-bone-50' : 'bg-ink-900 text-text-muted hover:bg-ink-850 hover:text-text-body'
            )}>
              <input type="radio" name="reason" value={r.value} checked={reason === r.value} onChange={(event) => setReason(event.target.value)} className="h-4 w-4 accent-cobalt-500" />
              {r.label}
            </label>)}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="label">Name</span>
            <input name="name" autoComplete="name" type="text" required maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="Your name" />
          </label>
          <label className="block">
            <span className="label">Email</span>
            <input name="email" autoComplete="email" type="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@example.com" />
          </label>
        </div>
        <label className="block">
          <span className="label">Message</span>
          <textarea name="message" required rows={6} maxLength={4000} value={message} onChange={(event) => setMessage(event.target.value)} className={inputClass} placeholder="What are you carrying, and what would help?" aria-describedby="contact-message-limit" />
          <span id="contact-message-limit" className="mt-2 block text-sm text-text-muted">Up to 4,000 characters. Please leave out passwords and confidential client information.</span>
        </label>
        <Button type="submit" variant="primary" size="lg" disabled={pending || saved}>{pending ? 'Saving inquiry…' : saved ? 'Inquiry saved' : 'Send inquiry'}</Button>
      </fieldset>
      <p role="status" className="sr-only">{pending ? 'Saving your inquiry. Please wait.' : ''}</p>
      {!saved && <div className="border-t border-hairline pt-5 text-sm leading-relaxed text-text-body">
        <p>Your details and message will be stored privately in Neil&apos;s inquiry system so he can respond. Sending does not subscribe you to educational emails.</p>
        <a href={mailto} className="mt-3 inline-flex min-h-11 items-center text-cobalt-300 underline underline-offset-4">Prefer email? Open a draft with these details</a>
        <p className="text-text-muted">If an email app does not open, write to hello@iamneilgreene.com directly. Opening a draft does not send it.</p>
      </div>}
    </form>
  )
}
