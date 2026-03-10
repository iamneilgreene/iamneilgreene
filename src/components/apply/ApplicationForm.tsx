'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Cal, { getCalApi } from '@calcom/embed-react'

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STAGES = [
  'Father with young kids',
  'Father with teenagers',
  'Professional without kids',
  'Entrepreneur',
  'Executive',
] as const

const AREAS = [
  'Physical health',
  'Discipline / habits',
  'Leadership / purpose',
  'Marriage / relationships',
  'Direction in life',
] as const

const SERIOUSNESS = [
  'Just exploring',
  'Thinking about it',
  'Ready to start soon',
  'Fully committed',
] as const

const INCOME = [
  'Under $100,000',
  '$100,000–$149,999',
  '$150,000–$249,999',
  '$250,000+',
] as const

const FINANCIAL = ['Yes', 'Possibly', 'Not right now'] as const

const ACCOUNTABILITY = ['Yes', 'No'] as const

// TODO: Replace with actual Cal.com strategy call link
const CAL_LINK = 'neilgreene/strategy'

const STEPS = [
  { number: '01', label: 'About You' },
  { number: '02', label: 'Your Situation' },
  { number: '03', label: 'Your Readiness' },
] as const

/* ------------------------------------------------------------------ */
/*  Qualification scoring                                              */
/* ------------------------------------------------------------------ */

function calculateQualification(data: {
  seriousness: string
  financialAbility: string
  accountability: string
  income: string
  discipline: string
  fiveYearConcern: string
  whyNeil: string
}): 'qualified' | 'lower-fit' {
  let score = 0

  // Seriousness (0-3)
  if (data.seriousness === 'Fully committed') score += 3
  else if (data.seriousness === 'Ready to start soon') score += 2
  else if (data.seriousness === 'Thinking about it') score += 1

  // Financial ability (0-2)
  if (data.financialAbility === 'Yes') score += 2
  else if (data.financialAbility === 'Possibly') score += 1

  // Accountability (0-2)
  if (data.accountability === 'Yes') score += 2

  // Income (0-2) — soft signal, not a hard block
  if (data.income === '$250,000+') score += 2
  else if (data.income === '$150,000–$249,999') score += 1.5
  else if (data.income === '$100,000–$149,999') score += 0.5

  // Text effort (0-1)
  const totalLength =
    data.discipline.length + data.fiveYearConcern.length + data.whyNeil.length
  if (totalLength >= 200) score += 1
  else if (totalLength >= 100) score += 0.5

  return score >= 6 ? 'qualified' : 'lower-fit'
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const inputStyles =
  'w-full bg-[#141414] border border-[#2e2e2e] px-4 py-3.5 text-sm text-[#e8e4de] placeholder:text-[#5a5754] focus:border-[#b8975a] focus:outline-none transition-colors duration-200'

const inputErrorStyles =
  'w-full bg-[#141414] border border-red-800/50 px-4 py-3.5 text-sm text-[#e8e4de] placeholder:text-[#5a5754] focus:border-[#b8975a] focus:outline-none transition-colors duration-200'

const labelStyles =
  'block text-xs font-semibold uppercase tracking-[0.2em] text-[#9a9590] mb-2'

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApplicationForm() {
  // Step state
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'qualified' | 'lower-fit' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Form fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [stage, setStage] = useState('')
  const [area, setArea] = useState('')
  const [discipline, setDiscipline] = useState('')
  const [fiveYearConcern, setFiveYearConcern] = useState('')
  const [whyNeil, setWhyNeil] = useState('')
  const [seriousness, setSeriousness] = useState('')
  const [income, setIncome] = useState('')
  const [financialAbility, setFinancialAbility] = useState('')
  const [accountability, setAccountability] = useState('')

  // Cal.com initialization for qualified outcome
  useEffect(() => {
    if (status === 'qualified') {
      ;(async () => {
        const cal = await getCalApi()
        cal('ui', {
          theme: 'dark',
          cssVarsPerTheme: {
            dark: {
              'cal-brand': '#b8975a',
              'cal-brand-emphasis': '#d4af72',
              'cal-text': '#e8e4de',
              'cal-text-emphasis': '#f4f1ec',
              'cal-border-emphasis': '#2e2e2e',
            },
            light: {
              'cal-brand': '#b8975a',
              'cal-brand-emphasis': '#9a7d45',
            },
          },
          hideEventTypeDetails: false,
        })
      })()
    }
  }, [status])

  /* ---- Step transition ---- */
  function goToStep(next: number) {
    setTransitioning(true)
    setTimeout(() => {
      setStep(next)
      setTransitioning(false)
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  /* ---- Per-step validation ---- */
  function validateStep(): boolean {
    const newErrors: Record<string, boolean> = {}

    if (step === 1) {
      if (!fullName.trim()) newErrors.fullName = true
      if (!email.trim()) newErrors.email = true
      if (!stage) newErrors.stage = true
      if (!area) newErrors.area = true
    } else if (step === 2) {
      if (!discipline.trim()) newErrors.discipline = true
      if (!fiveYearConcern.trim()) newErrors.fiveYearConcern = true
      if (!whyNeil.trim()) newErrors.whyNeil = true
    } else if (step === 3) {
      if (!seriousness) newErrors.seriousness = true
      if (!income) newErrors.income = true
      if (!financialAbility) newErrors.financialAbility = true
      if (!accountability) newErrors.accountability = true
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleContinue() {
    if (!validateStep()) return
    goToStep(step + 1)
  }

  function handleBack() {
    goToStep(step - 1)
  }

  /* ---- Submit ---- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep()) return

    setStatus('submitting')
    setErrorMessage('')

    const qualification = calculateQualification({
      seriousness,
      financialAbility,
      accountability,
      income,
      discipline,
      fiveYearConcern,
      whyNeil,
    })

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          stage,
          area,
          discipline,
          seriousness,
          income,
          financialAbility,
          accountability,
          fiveYearConcern,
          whyNeil,
          qualification,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus(qualification)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      )
    }
  }

  /* ---- Error helper ---- */
  function fieldError(field: string) {
    if (!errors[field]) return null
    return (
      <p className="mt-1.5 text-xs text-red-400">This field is required</p>
    )
  }

  /* ================================================================ */
  /*  Outcome: Qualified                                               */
  /* ================================================================ */
  if (status === 'qualified') {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Checkmark */}
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

            <h1 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Your Application Has Been Received
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-[#9a9590]">
              Thank you for applying. If you are serious about rebuilding discipline,
              strength, and leadership in your life, the next step is a short strategy
              call. Use the calendar below to select a time.
            </p>

            <span className="block h-px w-14 bg-[#b8975a]" />

            <h2 className="font-display text-xl font-semibold text-[#f4f1ec]">
              Book Your Strategy Call
            </h2>
          </div>

          <div className="mt-10 overflow-hidden border border-[#2e2e2e]">
            <Cal
              calLink={CAL_LINK}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                minHeight: '500px',
              }}
              config={{
                layout: 'month_view',
                theme: 'dark',
                name: fullName,
                email: email,
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  /* ================================================================ */
  /*  Outcome: Lower-fit                                               */
  /* ================================================================ */
  if (status === 'lower-fit') {
    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-center gap-8 text-center">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-[#f4f1ec] md:text-4xl">
              Thank You for Your Interest
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-[#9a9590]">
              Based on your answers, the Brotherhood community may be the best place to
              start. It is designed for men who want structure, direction, and a strong
              environment before stepping into higher-level coaching.
            </p>

            <span className="block h-px w-14 bg-[#b8975a]" />

            <Button href="/community" variant="primary" size="lg">
              Join the Brotherhood
            </Button>

            <p className="text-sm text-[#5a5754]">
              Your information has been received. Neil may follow up personally.
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ================================================================ */
  /*  Form wizard                                                      */
  /* ================================================================ */
  return (
    <div ref={containerRef} className="min-h-screen bg-[#0d0d0d]">
      {/* ---- Top bar ---- */}
      <div className="border-b border-[#2e2e2e]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <span className="font-display text-sm font-semibold tracking-wider text-[#f4f1ec]">
            Forged By War
          </span>
          <Link
            href="/apply"
            className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
          >
            Back to Apply
          </Link>
        </div>
      </div>

      {/* ---- Step indicator ---- */}
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-4 md:pt-14">
        <div className="flex items-start justify-center gap-0">
          {STEPS.map((s, i) => {
            const stepNum = i + 1
            const isActive = step === stepNum
            const isCompleted = step > stepNum

            return (
              <div key={s.number} className="flex items-start">
                {/* Step circle + label */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center border text-xs font-semibold transition-all duration-300 ${
                      isCompleted
                        ? 'border-[#b8975a] bg-[#b8975a] text-[#0d0d0d]'
                        : isActive
                          ? 'border-[#b8975a] text-[#b8975a]'
                          : 'border-[#2e2e2e] text-[#5a5754]'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive || isCompleted ? 'text-[#9a9590]' : 'text-[#5a5754]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connecting line */}
                {i < STEPS.length - 1 && (
                  <div className="mt-5 flex w-16 items-center sm:w-24 md:w-32">
                    <div
                      className={`h-px w-full transition-colors duration-300 ${
                        step > stepNum ? 'bg-[#b8975a]' : 'bg-[#2e2e2e]'
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ---- Form area ---- */}
      <div className="mx-auto max-w-2xl px-6 py-10 md:py-14">
        <form onSubmit={handleSubmit}>
          <div
            className={`transition-all duration-300 ${
              transitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {/* ============================================ */}
            {/*  Step 1: About You                           */}
            {/* ============================================ */}
            {step === 1 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-[#f4f1ec] md:text-3xl">
                    Tell Us About Yourself
                  </h1>
                  <p className="text-sm leading-relaxed text-[#9a9590]">
                    Start with the basics so we understand who you are and where you
                    stand.
                  </p>
                  <span className="block h-px w-14 bg-[#b8975a]" />
                </div>

                <div className="flex flex-col gap-6">
                  {/* Name + Email */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelStyles}>
                        Full Name <span className="text-[#b8975a]">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value)
                          setErrors((p) => ({ ...p, fullName: false }))
                        }}
                        placeholder="Your full name"
                        className={errors.fullName ? inputErrorStyles : inputStyles}
                      />
                      {fieldError('fullName')}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelStyles}>
                        Email <span className="text-[#b8975a]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setErrors((p) => ({ ...p, email: false }))
                        }}
                        placeholder="your@email.com"
                        className={errors.email ? inputErrorStyles : inputStyles}
                      />
                      {fieldError('email')}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelStyles}>
                      Phone Number
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

                  {/* Stage + Area */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="stage" className={labelStyles}>
                        What best describes your current stage?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="stage"
                        required
                        value={stage}
                        onChange={(e) => {
                          setStage(e.target.value)
                          setErrors((p) => ({ ...p, stage: false }))
                        }}
                        className={`${errors.stage ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select your stage
                        </option>
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {fieldError('stage')}
                    </div>
                    <div>
                      <label htmlFor="area" className={labelStyles}>
                        Area needing the most rebuilding?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="area"
                        required
                        value={area}
                        onChange={(e) => {
                          setArea(e.target.value)
                          setErrors((p) => ({ ...p, area: false }))
                        }}
                        className={`${errors.area ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select an area
                        </option>
                        {AREAS.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                      {fieldError('area')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/*  Step 2: Your Situation                      */}
            {/* ============================================ */}
            {step === 2 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-[#f4f1ec] md:text-3xl">
                    Where You Are Right Now
                  </h1>
                  <p className="text-sm leading-relaxed text-[#9a9590]">
                    These questions matter. Answer with honesty, not performance.
                  </p>
                  <span className="block h-px w-14 bg-[#b8975a]" />
                </div>

                <div className="flex flex-col gap-8">
                  <div>
                    <label htmlFor="discipline" className={labelStyles}>
                      What has been the hardest part of maintaining discipline in your
                      life lately? <span className="text-[#b8975a]">*</span>
                    </label>
                    <textarea
                      id="discipline"
                      required
                      rows={5}
                      value={discipline}
                      onChange={(e) => {
                        setDiscipline(e.target.value)
                        setErrors((p) => ({ ...p, discipline: false }))
                      }}
                      placeholder="Be specific. The more honest you are, the better we can assess fit."
                      className={`${errors.discipline ? inputErrorStyles : inputStyles} resize-none`}
                    />
                    {fieldError('discipline')}
                  </div>

                  <div>
                    <label htmlFor="fiveYearConcern" className={labelStyles}>
                      If nothing changes in your life over the next 5 years, what
                      concerns you the most? <span className="text-[#b8975a]">*</span>
                    </label>
                    <textarea
                      id="fiveYearConcern"
                      required
                      rows={5}
                      value={fiveYearConcern}
                      onChange={(e) => {
                        setFiveYearConcern(e.target.value)
                        setErrors((p) => ({ ...p, fiveYearConcern: false }))
                      }}
                      placeholder="What is at stake if you continue on the current path?"
                      className={`${errors.fiveYearConcern ? inputErrorStyles : inputStyles} resize-none`}
                    />
                    {fieldError('fiveYearConcern')}
                  </div>

                  <div>
                    <label htmlFor="whyNeil" className={labelStyles}>
                      Why do you want to work with Neil specifically?{' '}
                      <span className="text-[#b8975a]">*</span>
                    </label>
                    <textarea
                      id="whyNeil"
                      required
                      rows={5}
                      value={whyNeil}
                      onChange={(e) => {
                        setWhyNeil(e.target.value)
                        setErrors((p) => ({ ...p, whyNeil: false }))
                      }}
                      placeholder="What drew you to this work and this approach?"
                      className={`${errors.whyNeil ? inputErrorStyles : inputStyles} resize-none`}
                    />
                    {fieldError('whyNeil')}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================ */}
            {/*  Step 3: Your Readiness                      */}
            {/* ============================================ */}
            {step === 3 && (
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-[#f4f1ec] md:text-3xl">
                    Commitment and Readiness
                  </h1>
                  <p className="text-sm leading-relaxed text-[#9a9590]">
                    The right fit matters more than the right answer. Be honest.
                  </p>
                  <span className="block h-px w-14 bg-[#b8975a]" />
                </div>

                <div className="flex flex-col gap-6">
                  {/* Seriousness + Income */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="seriousness" className={labelStyles}>
                        How serious are you about making a change right now?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="seriousness"
                        required
                        value={seriousness}
                        onChange={(e) => {
                          setSeriousness(e.target.value)
                          setErrors((p) => ({ ...p, seriousness: false }))
                        }}
                        className={`${errors.seriousness ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select your level
                        </option>
                        {SERIOUSNESS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {fieldError('seriousness')}
                    </div>
                    <div>
                      <label htmlFor="income" className={labelStyles}>
                        What is your annual personal income?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="income"
                        required
                        value={income}
                        onChange={(e) => {
                          setIncome(e.target.value)
                          setErrors((p) => ({ ...p, income: false }))
                        }}
                        className={`${errors.income ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select your range
                        </option>
                        {INCOME.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      {fieldError('income')}
                    </div>
                  </div>

                  {/* Financial + Accountability */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="financialAbility" className={labelStyles}>
                        If accepted, are you financially able to invest in coaching?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="financialAbility"
                        required
                        value={financialAbility}
                        onChange={(e) => {
                          setFinancialAbility(e.target.value)
                          setErrors((p) => ({ ...p, financialAbility: false }))
                        }}
                        className={`${errors.financialAbility ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {FINANCIAL.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                      {fieldError('financialAbility')}
                    </div>
                    <div>
                      <label htmlFor="accountability" className={labelStyles}>
                        Can you commit to weekly accountability and implementation?{' '}
                        <span className="text-[#b8975a]">*</span>
                      </label>
                      <select
                        id="accountability"
                        required
                        value={accountability}
                        onChange={(e) => {
                          setAccountability(e.target.value)
                          setErrors((p) => ({ ...p, accountability: false }))
                        }}
                        className={`${errors.accountability ? inputErrorStyles : inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {ACCOUNTABILITY.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                      {fieldError('accountability')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---- Error banner ---- */}
          {status === 'error' && (
            <div className="mt-6 border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          {/* ---- Navigation ---- */}
          <div className="mt-10 flex items-center gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-[#9a9590] underline underline-offset-4 hover:text-[#b8975a] transition-colors duration-200"
              >
                Back
              </button>
            )}

            <div className="ml-auto">
              {step < 3 ? (
                <Button
                  type="button"
                  variant="gold-outline"
                  size="lg"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? 'Submitting...'
                    : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>

          {/* ---- Microcopy ---- */}
          {step === 1 && (
            <p className="mt-8 text-center text-xs leading-relaxed text-[#5a5754]">
              Coaching is application-based and reserved for men who are serious about
              rebuilding discipline, strength, and leadership.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
