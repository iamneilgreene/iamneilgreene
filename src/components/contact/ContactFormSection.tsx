'use client'

import { useState, useRef, useEffect } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import Button from '@/components/ui/Button'

const INQUIRY_TYPES = [
  'Speaking',
  'Partnerships and Collaborations',
  'Media and Press',
  'General Contact',
] as const

type InquiryType = (typeof INQUIRY_TYPES)[number]

interface ContactFormProps {
  preselectedType?: InquiryType
}

export default function ContactFormSection({ preselectedType }: ContactFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [inquiryType, setInquiryType] = useState<InquiryType | ''>(preselectedType ?? '')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (preselectedType) setInquiryType(preselectedType)
  }, [preselectedType])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          inquiryType,
          message,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setInquiryType('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      )
    }
  }

  const inputStyles =
    'w-full bg-[#141414] border border-[#2e2e2e] px-4 py-3.5 text-sm text-[#e8e4de] placeholder:text-[#5a5754] focus:border-[#b8975a] focus:outline-none transition-colors duration-200'
  const labelStyles = 'block text-xs font-semibold uppercase tracking-[0.2em] text-[#9a9590] mb-2'

  return (
    <section id="inquiry-form" className="relative bg-[#141414] py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/20 to-transparent" />

      <PageContainer width="narrow">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#b8975a]">
              Inquiry Form
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Send Your Inquiry
            </h2>
            <span className="block h-px w-14 bg-[#b8975a]" />
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-6 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-[#b8975a]">
                <svg
                  className="h-8 w-8 text-[#b8975a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#f4f1ec]">
                Inquiry Received
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-[#9a9590]">
                Your message has been received. If this inquiry requires a response, expect to hear
                back within a reasonable timeframe. Clarity earns faster movement.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-[#b8975a] underline underline-offset-4 hover:text-[#d4af72] transition-colors duration-200"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelStyles}>
                    First Name <span className="text-[#b8975a]">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your first name"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelStyles}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your last name"
                    className={inputStyles}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelStyles}>
                    Email <span className="text-[#b8975a]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelStyles}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={inputStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className={labelStyles}>
                  Inquiry Type <span className="text-[#b8975a]">*</span>
                </label>
                <select
                  id="inquiryType"
                  required
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Select an inquiry type
                  </option>
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelStyles}>
                  Message <span className="text-[#b8975a]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Who you are, what the inquiry is about, relevant details, preferred timeline, and what outcome you are looking for."
                  className={`${inputStyles} resize-none`}
                />
              </div>

              {status === 'error' && (
                <div className="border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </PageContainer>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b8975a]/15 to-transparent" />
    </section>
  )
}
