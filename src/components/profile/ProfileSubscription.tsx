'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function ProfileSubscription() {
  const [state, setState] = useState<'idle' | 'pending' | 'saved' | 'error'>('idle')
  const busy = useRef(false)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [error, setError] = useState('')

  return (
    <section className="mt-12 border-t border-hairline pt-8 print:hidden" aria-labelledby="profile-subscription-title">
      <h2 id="profile-subscription-title" className="font-display text-2xl font-semibold text-bone-50">Keep working on capability.</h2>
      <p className="mt-3 text-base leading-relaxed text-text-body">Leave your email if you want future educational updates from Neil. Your profile stays available whether you subscribe or not.</p>
      <p ref={statusRef} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'} className="mt-5 text-base text-bone-50">{state === 'saved' ? 'Your email and permission have been saved. This does not email your profile or schedule a reminder; use the save and calendar options above.' : error || (state === 'pending' ? 'Saving your permission…' : '')}</p>
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
              body: JSON.stringify({ name: data.get('name'), email: data.get('email'), consent: data.get('consent') === 'on', website: data.get('website') }),
              signal: AbortSignal.timeout(30000),
            })
            const result = await response.json()
            if (!response.ok || result.success !== true) throw new Error(result.error || 'Your subscription was not saved. Please try again.')
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
          <legend className="sr-only">Subscribe to educational updates</legend>
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
            <input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-cobalt-500" />
            <span>I agree to receive educational emails from Neil Greene. I can withdraw permission through the <Link href="/contact?reason=other" className="underline underline-offset-4">contact page</Link>.</span>
          </label>
          <p className="text-sm leading-relaxed text-text-muted">Only your name, email, and permission are submitted. Your assessment answers stay in your browser. <Link href="/privacy" className="underline underline-offset-4">Privacy details</Link>.</p>
          <Button type="submit" disabled={state === 'pending'}>{state === 'pending' ? 'Saving…' : 'Subscribe to future updates'}</Button>
          </fieldset>
        </form>
      )}
    </section>
  )
}
