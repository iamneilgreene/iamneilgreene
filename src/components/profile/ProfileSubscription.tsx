'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { EmailProfile } from '@/lib/profileEmail'
import Button from '@/components/ui/Button'

export default function ProfileSubscription({ profile }: { profile: EmailProfile }) {
  const [state, setState] = useState<'idle' | 'pending' | 'saved' | 'error'>('idle')
  const busy = useRef(false)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [receipt, setReceipt] = useState('')
  const [error, setError] = useState('')

  return (
    <section className="mt-12 border-t border-hairline pt-8 print:hidden" aria-labelledby="profile-subscription-title">
      <h2 id="profile-subscription-title" className="font-display text-2xl font-semibold text-bone-50">Email your profile.</h2>
      <p className="mt-3 text-base leading-relaxed text-text-body">Get your scores, interpretations, and starting plan by email. Your profile remains available here whether you request a copy or not.</p>
      <p ref={statusRef} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} className="mt-5 text-base text-bone-50">{state === 'saved' ? receipt : error || (state === 'pending' ? 'Sending your profile…' : '')}</p>
      {state !== 'saved' && (
        <form className="mt-6 space-y-5" onSubmit={async (event) => {
          event.preventDefault()
          if (busy.current) return
          busy.current = true
          setState('pending')
          setError('')
          const data = new FormData(event.currentTarget)
          try {
            const response = await fetch('/api/profile-subscription', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: data.get('name'), email: data.get('email'), consent: data.get('consent') === 'on', reminder: data.get('reminder') === 'on', website: data.get('website'), profile }),
              signal: AbortSignal.timeout(60000),
            })
            const result = await response.json()
            if (!response.ok || result.success !== true || result.email !== 'accepted') throw new Error(result.error || 'Your profile email was not confirmed. Please try again later.')
            setReceipt('Your profile email was accepted for delivery. Check your inbox and spam folder.' + (result.confirmationRequired ? ' Confirm your email using the link inside to activate your requested reminder or updates. Nothing is scheduled until you confirm.' : ' You did not request a reminder or educational updates.'))
            setState('saved')
          } catch (failure) {
            setError(failure instanceof Error && failure.name !== 'TimeoutError' ? failure.message : 'The request timed out. Please try again; your profile is still available.')
            setState('error')
          } finally {
            busy.current = false
            window.requestAnimationFrame(() => statusRef.current?.focus())
          }
        }}>
          <fieldset disabled={state === 'pending'} className="space-y-5 disabled:opacity-75">
          <legend className="sr-only">Email your profile</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-text-body">Name
              <input name="name" autoComplete="name" required maxLength={120} className="mt-2 w-full border border-border-input bg-ink-900 px-4 py-3 text-base text-bone-50" />
            </label>
            <label className="block text-sm text-text-body">Email
              <input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2 w-full border border-border-input bg-ink-900 px-4 py-3 text-base text-bone-50" />
            </label>
          </div>
          <div className="hidden" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-text-body">
            <input name="reminder" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cobalt-500" />
            <span>Optional: email me one reminder around 75 days from today to revisit my profile. I will confirm my email first and can cancel anytime.</span>
          </label>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-text-body">
            <input name="consent" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-cobalt-500" />
            <span>Optional: I agree to receive educational emails from Neil Greene. I will confirm my email first. I can unsubscribe using my email preference link or the <Link href="/contact?reason=other" className="underline underline-offset-4">contact page</Link>.</span>
          </label>
          <p className="text-sm leading-relaxed text-text-muted">Your name, email, scores, and responsibility ratings are submitted to send this copy. Your raw answers and written evidence stay in your browser. <Link href="/privacy" className="underline underline-offset-4">Privacy details</Link>.</p>
          <Button type="submit" disabled={state === 'pending'}>{state === 'pending' ? 'Sending…' : 'Email my profile'}</Button>
          </fieldset>
        </form>
      )}
    </section>
  )
}
