'use client'
import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button'

type Preferences = { kind: 'verify' | 'manage'; confirmed?: boolean; verified?: boolean; reminder: boolean; marketing: boolean; dueAt?: string | null }
export default function EmailPreferences() {
  const credentials = useRef<{ kind: string; token: string } | null>(null)
  const [preferences, setPreferences] = useState<Preferences | null>(null)
  const [message, setMessage] = useState('Loading your private link…')
  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)
  const status = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const values = new URLSearchParams(window.location.hash.slice(1))
    const kind = values.has('verify') ? 'verify' : 'manage'
    const token = values.get(kind)
    const controller = new AbortController()
    async function load() {
      if (!token) { setError(true); setMessage('Open the private link in your profile email. If it is unavailable, contact hello@iamneilgreene.com.'); return }
      credentials.current = { kind, token }
      // Fragments are never sent in HTTP requests or referrers. Keep the fragment
      // for refresh/recovery; never copy it into analytics or server URLs.
      try {
        const response = await fetch('/api/email/preferences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind, token, action: 'inspect' }), signal: controller.signal })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setPreferences(data.preferences); setMessage('')
      } catch (failure) {
        if (controller.signal.aborted) return
        setError(true); setMessage(failure instanceof Error ? failure.message : 'Your preferences could not be loaded. Try this email link again later.')
      }
    }
    void load()
    return () => controller.abort()
  }, [])
  async function act(action: string) {
    if (busy.current || !credentials.current) return
    busy.current = true; setPending(true); setError(false); setMessage('Saving your choices…')
    try {
      const response = await fetch('/api/email/preferences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...credentials.current, action }), signal: AbortSignal.timeout(30000) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      if (action === 'confirm') { setPreferences(current => current ? { ...current, confirmed: true } : current); setMessage('Your email is confirmed and your selected choices are saved. Use the management link in your email if you want to cancel later.') }
      else { setPreferences(data.preferences); setMessage(action === 'cancel-reminder' ? 'Your reminder is cancelled.' : action === 'unsubscribe' ? 'You are unsubscribed from educational updates.' : 'Your reminder is cancelled and you are unsubscribed from educational updates.') }
    } catch (failure) { setError(true); setMessage(failure instanceof Error ? failure.message : 'Your changes could not be confirmed. Please try again.') }
    finally { busy.current = false; setPending(false); window.requestAnimationFrame(() => status.current?.focus()) }
  }
  const date = preferences?.dueAt ? new Date(preferences.dueAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : null
  return <section className="mt-10 border-t border-hairline pt-8">
    <p ref={status} tabIndex={-1} role={error ? 'alert' : 'status'} className="text-base leading-relaxed text-bone-50">{message}</p>
    {preferences && <>
      <h2 className="mt-6 font-display text-2xl text-bone-50">{preferences.kind === 'verify' ? (preferences.confirmed ? 'Confirmed request' : 'Review your request') : 'Current preferences'}</h2>
      <dl className="mt-6 space-y-6 text-text-body"><div><dt className="font-semibold text-bone-50">One capability reminder</dt><dd className="mt-2">{preferences.reminder ? `${preferences.kind === 'verify' && !preferences.confirmed ? 'Will be scheduled after confirmation' : 'Scheduled'}${date ? ` for around ${date}` : ''}.` : (preferences.kind === 'verify' ? 'No new reminder requested.' : 'No reminder requested or scheduled.')}</dd></div><div><dt className="font-semibold text-bone-50">Educational updates</dt><dd className="mt-2">{preferences.marketing ? (preferences.kind === 'verify' && !preferences.confirmed ? 'Requested, awaiting confirmation.' : 'Subscribed.') : (preferences.kind === 'verify' ? 'No educational updates requested in this request.' : 'Not subscribed.')}</dd></div></dl>
      {preferences.kind === 'verify' && !preferences.confirmed && <div className="mt-8"><Button disabled={pending} onClick={() => act('confirm')}>Confirm email and choices</Button><p className="mt-4 text-sm leading-relaxed text-text-muted">Opening this page does not confirm anything. If you did not make this request, leave it unconfirmed. The link expires after 48 hours.</p></div>}
      {preferences.kind === 'manage' && <div className="mt-8 flex flex-wrap gap-4">{preferences.reminder && <Button variant="secondary" disabled={pending} onClick={() => act('cancel-reminder')}>Cancel reminder</Button>}{preferences.marketing && <Button variant="secondary" disabled={pending} onClick={() => act('unsubscribe')}>Unsubscribe from updates</Button>}<Button variant="secondary" className="max-w-full whitespace-normal text-left" disabled={pending} onClick={() => act('stop-all')}>Stop both and cancel pending requests</Button></div>}
    </>}
    <p className="mt-8 text-sm leading-relaxed text-text-muted">Changes stop future sends. A message already handed to the email provider cannot be recalled. For help or data deletion, email <a className="text-cobalt-300 underline underline-offset-4" href="mailto:hello@iamneilgreene.com">hello@iamneilgreene.com</a>.</p>
  </section>
}
