'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import { Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'
import {
  Industry,
  PackageType,
  CUSTOM_SERVICE_PILLARS,
  formatINR,
  getIncludedServices,
  getPackagePlan,
  calculateCustomPackageTotal,
  normalizeServiceName,
} from '@/lib/pricing'

const GENERAL_HELP_TOPICS = [
  'Just have a question',
  'I want to discuss a project',
  'I need help with digital marketing',
  'I need creative / content services',
  'I need a website',
  'I need photography / video',
  "I'm interested in a package",
  "I'm planning something for the future",
  'Something else',
]

function ContactFormContent() {
  const searchParams = useSearchParams()

  // 1. Determine explicit mode from URL parameters
  const paramMode = searchParams.get('mode')
  const paramPackage = searchParams.get('package')
  const paramIndustry = searchParams.get('industry')
  const paramServices = searchParams.get('services')

  // Explicit Mode Check: ONLY if mode is 'package' AND a package param is present
  const isExplicitPackageMode = paramMode === 'package' && Boolean(paramPackage)

  const [mode, setMode] = useState<'general' | 'package'>(
    isExplicitPackageMode ? 'package' : 'general'
  )

  // Industry & Package State (only used in Package mode)
  const [industry, setIndustry] = useState<Industry>(() =>
    paramIndustry === 'Interior Design' ? 'Interior Design' : 'Restaurants'
  )

  const resolvePackage = (ind: Industry, pkgParam: string | null): PackageType => {
    if (!pkgParam) return 'Standard'
    const clean = pkgParam.trim().toLowerCase()
    if (clean === 'custom') return 'Custom'
    if (clean === 'starter' || clean === 'foundation') {
      return ind === 'Interior Design' ? 'Foundation' : 'Starter'
    }
    if (clean === 'signature' || clean === 'luxury') {
      return ind === 'Interior Design' ? 'Luxury' : 'Signature'
    }
    return 'Standard'
  }

  const [packageName, setPackageName] = useState<PackageType>(() =>
    resolvePackage(
      paramIndustry === 'Interior Design' ? 'Interior Design' : 'Restaurants',
      paramPackage
    )
  )

  // Custom Selected Services State (Package mode only)
  const [customServices, setCustomServices] = useState<string[]>(() => {
    if (paramServices) {
      const parsed = paramServices
        .split(',')
        .map((s) => normalizeServiceName(s.trim()))
        .filter(Boolean)
      if (parsed.length > 0) return Array.from(new Set(parsed))
    }
    return ['Photography', 'Short-form Videos / Reels', 'Creative Designs']
  })

  // General Enquiry Help Topics (General mode only)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])

  // Shared Form Fields
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  // Validation & Submission States
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null)

  // Synchronize state when URL query params change
  useEffect(() => {
    const isPkg = searchParams.get('mode') === 'package' && Boolean(searchParams.get('package'))
    setMode(isPkg ? 'package' : 'general')

    if (isPkg) {
      const nextIndustry: Industry =
        searchParams.get('industry') === 'Interior Design' ? 'Interior Design' : 'Restaurants'
      setIndustry(nextIndustry)
      setPackageName(resolvePackage(nextIndustry, searchParams.get('package')))

      const svcParam = searchParams.get('services')
      if (svcParam) {
        const parsed = svcParam
          .split(',')
          .map((s) => normalizeServiceName(s.trim()))
          .filter(Boolean)
        if (parsed.length > 0) {
          setCustomServices(Array.from(new Set(parsed)))
        }
      }
    }
  }, [searchParams])

  // Custom Package calculations (Package mode)
  const isCustom = mode === 'package' && packageName === 'Custom'
  const customCalculation = calculateCustomPackageTotal(customServices, industry)

  // Fixed Package details (Package mode)
  const fixedPlan = getPackagePlan(industry, packageName)
  const fixedServices = getIncludedServices(industry, packageName)

  const displayPrice = isCustom
    ? customCalculation.selectedCount > 0
      ? `${formatINR(customCalculation.total)} / month`
      : '₹0 / month'
    : fixedPlan?.price
      ? `${fixedPlan.price} / month`
      : '₹54,999 / month'

  const hasAdSpendNote = isCustom
    ? customCalculation.hasAdSpend
    : packageName === 'Signature' || packageName === 'Luxury'

  // Validation Helpers
  const isNameValid = name.trim().length >= 2
  const isPhoneValid = phone.trim().length >= 7 && /^[\d\s+\-()]{7,20}$/.test(phone.trim())
  const isEmailValid = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const isCustomSelectionValid = mode !== 'package' || !isCustom || customCalculation.selectedCount > 0

  const isFormValid = isNameValid && isPhoneValid && isEmailValid && isCustomSelectionValid

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  const toggleCustomService = (serviceName: string) => {
    const canonical = normalizeServiceName(serviceName)
    setCustomServices((prev) =>
      prev.includes(canonical) ? prev.filter((s) => s !== canonical) : [...prev, canonical]
    )
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setTouched({
      name: true,
      phone: true,
      email: true,
    })

    if (!isFormValid || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    let payload: Record<string, any>

    if (mode === 'package') {
      const finalServices = isCustom ? customServices : fixedServices
      payload = {
        mode: 'package',
        name: name.trim(),
        businessName: businessName.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        industry,
        package: packageName,
        selectedServices: finalServices,
        estimatedPrice: displayPrice,
        projectDetails: message.trim() || undefined,
        honeypot: honeypot.trim() || undefined,
        timestamp: new Date().toISOString(),
      }
    } else {
      payload = {
        mode: 'general',
        name: name.trim(),
        businessName: businessName.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        helpTopics: selectedTopics,
        message: message.trim() || undefined,
        honeypot: honeypot.trim() || undefined,
        timestamp: new Date().toISOString(),
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Something went wrong while sending your enquiry. Please try again.')
      }

      setIsSubmitted(true)
      setSubmittedEnquiryId(json.enquiryId || `XCS-${Date.now().toString().slice(-6)}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setSubmitError(err.message || 'Network error. Please check your connection and retry.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-xcess py-8 sm:py-12 lg:py-16">
      {/* =================================================================== */}
      {/* SUCCESS STATE (Minimal, Cinematic & Editorial Confirmation)         */}
      {/* =================================================================== */}
      {isSubmitted ? (
        <div className="max-w-xl mx-auto py-8 sm:py-10 px-5 sm:px-8 rounded-2xl border border-white/10 bg-[#08080A]/95 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center animate-in fade-in zoom-in-95 duration-400 backdrop-blur-xl">
          {/* Subtle Editorial Confirmation Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#FF4444] mb-4 sm:mb-4.5">
            <Check className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2]" />
          </div>

          {/* Reference ID Badge */}
          <div className="flex items-center justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8E8E93]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
              <span>ENQUIRY REF: <strong className="text-white font-mono">{submittedEnquiryId}</strong></span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#F8F8F8] leading-[1.08]">
            Enquiry Sent.
          </h1>

          {/* Dynamic Confirmation Message */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-[14px] leading-relaxed text-[#B3B3B3] max-w-md mx-auto font-sans">
            Thanks <span className="text-white font-medium">{name}</span> — we have received your enquiry
            {mode === 'package' ? (
              <>
                {' '}for <span className="text-white font-medium">{industry} ({packageName} Package)</span>
              </>
            ) : null}
            . We will review your details and connect with you shortly via WhatsApp / Phone.
          </p>

          {/* Submitted Summary Recap */}
          <div className="mt-6 sm:mt-8 p-4.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#09090C] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-left divide-y divide-white/[0.08]">
            {/* Contact */}
            <div className="pb-3 flex flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#8E8E93] uppercase tracking-[0.18em] text-[9.5px] sm:text-[10.5px] font-bold">CONTACT</span>
              <span className="text-white font-medium text-right text-[12.5px] sm:text-[13.5px]">{phone}</span>
            </div>

            {/* Business if provided */}
            {businessName && (
              <div className="py-3 flex flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#8E8E93] uppercase tracking-[0.18em] text-[9.5px] sm:text-[10.5px] font-bold">BUSINESS</span>
                <span className="text-white font-medium text-right text-[12.5px] sm:text-[13.5px]">{businessName}</span>
              </div>
            )}

            {/* Package Mode Details */}
            {mode === 'package' && (
              <>
                <div className="py-3 flex flex-row items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-[#8E8E93] uppercase tracking-[0.18em] text-[9.5px] sm:text-[10.5px] font-bold">PACKAGE</span>
                  <span className="text-white font-medium text-right text-[12.5px] sm:text-[13.5px]">
                    {industry} — <span className="text-[#8B0000] font-bold">{packageName}</span>
                  </span>
                </div>
                <div className="pt-3 flex flex-row items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-[#8E8E93] uppercase tracking-[0.18em] text-[9.5px] sm:text-[10.5px] font-bold">INVESTMENT</span>
                  <span className="text-[#FF5555] font-bold text-right text-[13px] sm:text-[14px]">{displayPrice}</span>
                </div>
              </>
            )}

            {/* General Mode Topics */}
            {mode === 'general' && selectedTopics.length > 0 && (
              <div className="pt-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs font-mono">
                <span className="text-[#8E8E93] uppercase tracking-[0.18em] text-[9.5px] sm:text-[10.5px] font-bold shrink-0">TOPICS</span>
                <span className="text-neutral-200 text-left sm:text-right text-[12px] sm:text-[13px] leading-relaxed">
                  {selectedTopics.join(' · ')}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[46px] sm:min-h-[48px] px-6 sm:px-8 rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-200 shadow-[0_4px_20px_rgba(139,0,0,0.35)] active:scale-[0.99]"
            >
              <span>Return to Home</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false)
                setSubmitError(null)
                setName('')
                setBusinessName('')
                setPhone('')
                setEmail('')
                setMessage('')
                setHoneypot('')
                setSelectedTopics([])
                setTouched({})
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[46px] sm:min-h-[48px] px-6 sm:px-8 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white font-display text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-200 border border-white/10 cursor-pointer active:scale-[0.99]"
            >
              <span>Submit Another Enquiry</span>
            </button>
          </div>
        </div>
      ) : (
        /* =================================================================== */
        /* TWO-COLUMN EDITORIAL ENQUIRY EXPERIENCE                             */
        /* =================================================================== */
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Editorial Typography & Context                       */}
          {/* ================================================================= */}
          <div className="lg:sticky lg:top-28 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#8B0000]">
                <span>{mode === 'package' ? 'PACKAGE ENQUIRY' : 'START A CONVERSATION'}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold leading-[0.94] tracking-[-0.04em] text-[#F8F8F8]">
                {mode === 'package' ? (
                  <>
                    Let&apos;s build
                    <br />
                    the right package
                    <br />
                    for your business.
                  </>
                ) : (
                  <>
                    Let&apos;s talk
                    <br />
                    about your
                    <br />
                    project.
                  </>
                )}
              </h1>

              <p className="pt-2 max-w-md text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] font-sans">
                {mode === 'package' ? (
                  <>
                    You&apos;ve selected the <strong className="text-white">{packageName}</strong> package for{' '}
                    <strong className="text-white">{industry}</strong>. Review your details below and provide your contact
                    information to get started.
                  </>
                ) : (
                  <>
                    {/* Mobile */}
                    <span className="sm:hidden">
                      Tell us a little about what you&apos;re looking for.
                    </span>

                    {/* Tablet / Desktop */}
                    <span className="hidden sm:inline">
                      Tell us a little about what you&apos;re looking for. Whether you have a clear project in mind or
                      simply want to explore what&apos;s possible, we&apos;re happy to hear from you.
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Reassurance Badge — Hidden on mobile */}
            <div className="hidden sm:block p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#0A0A0C]/90 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-[0.18em] text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>QUICK ENQUIRY</span>
              </div>

              <p className="text-xs sm:text-[13px] leading-relaxed text-[#8E8E93] font-sans">
                {mode === 'package'
                  ? 'No repetitive questionnaires. Your selected package details are already attached.'
                  : 'No long forms. Just the details we need to connect and explore how we can help.'}
              </p>
            </div>

            {/* Direct Coordinates — Hidden on mobile */}
            <div className="hidden sm:flex pt-2 border-t border-white/10 items-center justify-between text-[10.5px] font-mono text-[#666666] uppercase tracking-[0.18em]">
              <span>XCESS MEDIA · 2024</span>
              <span>TWO INDUSTRIES · ONE FOCUS</span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Enquiry Form                                       */}
          {/* ================================================================= */}
          <div className="rounded-2xl border border-white/10 bg-[#08080A]/95 p-4 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-9">
              {/* Hidden Honeypot Field for Spam Protection */}
              <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}>
                <label htmlFor="company_fax">Leave this field blank</label>
                <input
                  type="text"
                  id="company_fax"
                  name="company_fax"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {/* ------------------------------------------------------------- */}
              {/* SECTION 01 — YOUR DETAILS                                     */}
              {/* ------------------------------------------------------------- */}
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 border-b border-white/10 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.10em] sm:tracking-[0.2em] text-[#8B0000]">
                  <span>01 —</span>
                  <h2 className="text-[#F8F8F8] font-display text-[10.5px] sm:text-sm font-semibold tracking-normal sm:tracking-wide uppercase whitespace-nowrap">
                    YOUR DETAILS
                  </h2>
                </div>

                <div className="mt-4 sm:mt-5 grid gap-3.5 sm:gap-5 sm:grid-cols-2">
                  {/* Name (Required) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="input-name" className="block text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.10em] sm:tracking-[0.18em] text-[#8E8E93] whitespace-nowrap">
                        NAME <span className="text-[#FF5555] font-bold">*</span>
                      </label>
                    </div>
                    <input
                      id="input-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                      placeholder="e.g. Rahul Sharma"
                      className={`mt-1.5 sm:mt-2 w-full min-h-[46px] sm:min-h-[48px] rounded-lg border bg-black/40 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-white placeholder:text-[12px] sm:placeholder:text-sm placeholder-neutral-600 outline-none transition-all duration-200 font-sans ${touched.name && !isNameValid
                        ? 'border-[#FF5555] ring-1 ring-[#FF5555]/30'
                        : 'border-white/15 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/40'
                        }`}
                    />
                    {touched.name && !isNameValid && (
                      <p className="mt-1 text-[10.5px] sm:text-[11px] text-[#FF5555] font-sans">Please enter your name.</p>
                    )}
                  </div>

                  {/* Business / Organization (OPTIONAL) */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="input-business" className="block text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.08em] sm:tracking-[0.18em] text-[#8E8E93] whitespace-nowrap">
                        BUSINESS / ORGANIZATION
                      </label>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 whitespace-nowrap">OPTIONAL</span>
                    </div>
                    <input
                      id="input-business"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Saffron Bistro or Studio Luxe"
                      className="mt-1.5 sm:mt-2 w-full min-h-[46px] sm:min-h-[48px] rounded-lg border border-white/15 bg-black/40 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-white placeholder:text-[12px] sm:placeholder:text-sm placeholder-neutral-600 outline-none transition-all duration-200 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/40 font-sans"
                    />
                  </div>

                  {/* Phone / WhatsApp (Required) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="input-phone" className="block text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.08em] sm:tracking-[0.18em] text-[#8E8E93] whitespace-nowrap">
                        PHONE / WHATSAPP <span className="text-[#FF5555] font-bold">*</span>
                      </label>
                    </div>
                    <input
                      id="input-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                      placeholder="+91 98765 43210"
                      className={`mt-1.5 sm:mt-2 w-full min-h-[46px] sm:min-h-[48px] rounded-lg border bg-black/40 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-white placeholder:text-[12px] sm:placeholder:text-sm placeholder-neutral-600 outline-none transition-all duration-200 font-sans ${touched.phone && !isPhoneValid
                        ? 'border-[#FF5555] ring-1 ring-[#FF5555]/30'
                        : 'border-white/15 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/40'
                        }`}
                    />
                    {touched.phone && !isPhoneValid && (
                      <p className="mt-1 text-[10.5px] sm:text-[11px] text-[#FF5555] font-sans">Please enter a valid phone number.</p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="input-email" className="block text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.10em] sm:tracking-[0.18em] text-[#8E8E93] whitespace-nowrap">
                        EMAIL
                      </label>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 whitespace-nowrap">OPTIONAL</span>
                    </div>
                    <input
                      id="input-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                      placeholder="e.g. rahul@example.com"
                      className={`mt-1.5 sm:mt-2 w-full min-h-[46px] sm:min-h-[48px] rounded-lg border bg-black/40 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-white placeholder:text-[12px] sm:placeholder:text-sm placeholder-neutral-600 outline-none transition-all duration-200 font-sans ${touched.email && !isEmailValid
                        ? 'border-[#FF5555] ring-1 ring-[#FF5555]/30'
                        : 'border-white/15 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/40'
                        }`}
                    />
                    {touched.email && !isEmailValid && (
                      <p className="mt-1 text-[10.5px] sm:text-[11px] text-[#FF5555] font-sans">Please provide a valid email address.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* MODE A: GENERAL ENQUIRY (WHAT CAN WE HELP WITH?)              */}
              {/* ============================================================= */}
              {mode === 'general' && (
                <div>
                  <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.10em] sm:tracking-[0.2em] text-[#8B0000] min-w-0">
                      <span className="shrink-0">02 —</span>
                      <h2 className="text-[#F8F8F8] font-display text-[10px] xs:text-[10.5px] sm:text-sm font-semibold tracking-normal sm:tracking-wide uppercase whitespace-nowrap">
                        WHAT CAN WE HELP WITH?
                      </h2>
                    </div>
                    <span className="text-[8.5px] xs:text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 whitespace-nowrap">SELECT ALL THAT APPLY</span>
                  </div>

                  <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                    {GENERAL_HELP_TOPICS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic)
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggleTopic(topic)}
                          className={`p-2.5 sm:p-3 min-h-[42px] sm:min-h-[46px] rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${isSelected
                            ? 'bg-[#8B0000]/15 border-[#8B0000] text-white shadow-[0_0_12px_rgba(139,0,0,0.2)]'
                            : 'bg-black/30 border-white/10 text-[#B3B3B3] hover:border-white/25 hover:text-white'
                            }`}
                        >
                          <span className="font-display text-[11.5px] sm:text-[13px] font-medium leading-tight">
                            {topic}
                          </span>
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ml-2.5 ${isSelected
                              ? 'bg-[#8B0000] border-[#8B0000] text-white'
                              : 'border-white/20 bg-black/40'
                              }`}
                          >
                            {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Helpful note if user selects "I'm interested in a package" in General mode */}
                  {selectedTopics.includes("I'm interested in a package") && (
                    <div className="mt-3.5 sm:mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-[#C0C0C0] font-sans leading-relaxed">
                      <span className="text-[#FF5555] font-mono font-bold uppercase tracking-wider mr-1.5">Note:</span>
                      Not sure which package fits? That&apos;s okay. Tell us a little about what you need and we&apos;ll help you figure it out.
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================= */}
              {/* MODE B: PACKAGE ENQUIRY (YOUR SELECTION)                      */}
              {/* ============================================================= */}
              {mode === 'package' && (
                <div>
                  <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.10em] sm:tracking-[0.2em] text-[#8B0000]">
                      <span>02 —</span>
                      <h2 className="text-[#F8F8F8] font-display text-[10.5px] sm:text-sm font-semibold tracking-normal sm:tracking-wide uppercase whitespace-nowrap">
                        YOUR SELECTION
                      </h2>
                    </div>

                    <Link
                      href="/#packages"
                      className="text-[10px] sm:text-[11px] font-mono font-medium text-neutral-400 hover:text-[#8B0000] transition-colors shrink-0 whitespace-nowrap"
                    >
                      Change selection
                    </Link>
                  </div>

                  {/* CASE A: FIXED PACKAGE (Confirmation Box) */}
                  {!isCustom && (
                    <div className="mt-4 sm:mt-5 rounded-xl border border-white/15 bg-white/[0.02] p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                      <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/10">
                        <div>
                          <span className="font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#8B0000]">
                            {industry.toUpperCase()}
                          </span>
                          <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-tight text-[#F8F8F8]">
                            {packageName} PACKAGE
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white">
                            {fixedPlan?.price || '₹54,999'}
                          </span>
                          <span className="text-[11px] sm:text-xs text-neutral-400 font-sans ml-1">/ month</span>
                        </div>
                      </div>

                      {/* Included Services Bullet Grid */}
                      <div>
                        <span className="block text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#8E8E93] mb-2">
                          INCLUDED IN THIS PLAN:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#D4D4D4] font-sans">
                          {fixedServices.map((svc) => (
                            <li key={svc} className="flex items-center gap-2">
                              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#8B0000]/20 text-[#8B0000]">
                                <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                              </span>
                              <span className="leading-snug">{svc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ad Spend Note if applicable */}
                      {hasAdSpendNote && (
                        <div className="pt-2 border-t border-white/10 text-[11px] sm:text-[11.5px] text-[#A0A0A5] font-sans">
                          <span className="text-[#8B0000] font-bold font-mono">Note:</span> Advertising media spend for Meta &amp; Google Ads is billed separately.
                        </div>
                      )}
                    </div>
                  )}

                  {/* CASE B: CUSTOM PACKAGE (Selectable 9-Service Grid by Pillar) */}
                  {isCustom && (
                    <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5 rounded-xl border border-white/15 bg-white/[0.02] p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div>
                          <span className="font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#8B0000]">
                            {industry.toUpperCase()} · CUSTOM PACKAGE
                          </span>
                          <h3 className="font-display text-base sm:text-lg font-bold text-[#F8F8F8]">
                            Choose the services you need.
                          </h3>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B0000]/15 border border-[#8B0000]/30 text-[10px] font-mono font-bold text-[#FF5555]">
                          <span>
                            {customCalculation.selectedCount}{' '}
                            {customCalculation.selectedCount === 1 ? 'SERVICE' : 'SERVICES'} SELECTED
                          </span>
                        </div>
                      </div>

                      {/* 3 Pillar Groups */}
                      <div className="space-y-3.5 sm:space-y-4">
                        {CUSTOM_SERVICE_PILLARS.map((pillarGroup) => (
                          <div key={pillarGroup.pillar} className="space-y-2">
                            <div className="flex items-center gap-2 text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#8E8E93]">
                              <span className="text-[#8B0000]">{pillarGroup.code} —</span>
                              <span>{pillarGroup.pillar}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                              {pillarGroup.services.map((svc) => {
                                const isChecked = customServices.includes(svc.name)
                                return (
                                  <button
                                    key={svc.id}
                                    type="button"
                                    onClick={() => toggleCustomService(svc.name)}
                                    className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${isChecked
                                      ? 'bg-[#8B0000]/10 border-[#8B0000] text-white shadow-[0_0_12px_rgba(139,0,0,0.2)]'
                                      : 'bg-black/30 border-white/10 text-[#B3B3B3] hover:border-white/25 hover:text-white'
                                      }`}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <span className="font-display text-[12px] sm:text-[13px] font-semibold leading-tight text-white">
                                        {svc.name}
                                      </span>
                                      <span
                                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${isChecked
                                          ? 'bg-[#8B0000] border-[#8B0000] text-white'
                                          : 'border-white/20 bg-black/40'
                                          }`}
                                      >
                                        {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                                      </span>
                                    </div>
                                    <div className="mt-2 pt-1 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                                      <span className="text-neutral-500">BASE</span>
                                      <span className={isChecked ? 'text-[#FF5555] font-bold' : 'text-neutral-400'}>
                                        {formatINR(svc.price)}
                                      </span>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* SMART RECOMMENDATION BOX WHEN ALL 9 SERVICES ARE SELECTED */}
                      {customCalculation.isAllServicesSelected && (
                        <div className="mt-4 rounded-xl border border-[#8B0000]/50 bg-[#0D0D10] p-4.5 sm:p-5 shadow-[0_4px_24px_rgba(139,0,0,0.18)] space-y-3.5 animate-in fade-in duration-300">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/40 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF5555]">
                              RECOMMENDED
                            </span>
                            <span className="text-xs font-mono font-bold text-[#FF5555]">
                              Save {formatINR(customCalculation.recommendedPackage.savingsVsCustom)}/month
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#F0F0F0] font-sans">
                              You have selected all 9 services. Our{' '}
                              <strong className="text-white font-semibold">
                                {customCalculation.recommendedPackage.name}
                              </strong>{' '}
                              package already includes all of these services for{' '}
                              <strong className="text-white font-semibold">
                                {customCalculation.recommendedPackage.priceFormatted}/month
                              </strong>
                              . That&apos;s {formatINR(customCalculation.recommendedPackage.savingsVsCustom)} less than the Custom
                              Package.
                            </p>
                          </div>

                          <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/[0.08]">
                            <div className="text-xs font-mono text-neutral-400">
                              <span className="uppercase tracking-wider">RECOMMENDED:</span>{' '}
                              <span className="text-white font-bold">
                                {customCalculation.recommendedPackage.name.toUpperCase()} —{' '}
                                {customCalculation.recommendedPackage.priceFormatted}/month
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => setPackageName(customCalculation.recommendedPackage.name)}
                              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#8B0000] hover:bg-[#A50000] text-white font-display text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_14px_rgba(139,0,0,0.35)] cursor-pointer"
                            >
                              <span>SWITCH TO {customCalculation.recommendedPackage.name.toUpperCase()}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom Ad Spend Disclosure Note */}
                      {hasAdSpendNote && (
                        <div className="pt-2 border-t border-white/10 text-[11px] sm:text-[11.5px] text-[#A0A0A5] font-sans">
                          <span className="text-[#8B0000] font-bold font-mono">Note:</span> Advertising media spend for Meta &amp; Google Ads is billed separately.
                        </div>
                      )}

                      {/* Zero Services Warning */}
                      {customCalculation.selectedCount === 0 && (
                        <div className="p-2.5 rounded-lg border border-[#FF5555]/30 bg-[#FF5555]/10 flex items-center gap-2 text-xs text-[#FF8888] font-sans">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Please select at least one service to configure your custom package.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* SECTION 03 — PROJECT DETAILS / MESSAGE (Optional Textarea)     */}
              {/* ------------------------------------------------------------- */}
              <div>
                <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.10em] sm:tracking-[0.2em] text-[#8B0000]">
                    <span>03 —</span>
                    <h2 className="text-[#F8F8F8] font-display text-[10.5px] sm:text-sm font-semibold tracking-normal sm:tracking-wide uppercase whitespace-nowrap">
                      {mode === 'package' ? 'PROJECT DETAILS' : 'TELL US MORE'}
                    </h2>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 whitespace-nowrap">OPTIONAL</span>
                </div>

                <div className="mt-3.5 sm:mt-4">
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      mode === 'package'
                        ? "Tell us what you're looking to achieve, launch, improve or create..."
                        : "Tell us what you're thinking about, what you need help with, or what you'd like to discuss..."
                    }
                    className="w-full rounded-lg border border-white/15 bg-black/40 p-3 sm:p-3.5 text-[13px] sm:text-sm text-white placeholder:text-[12px] sm:placeholder:text-sm placeholder-neutral-600 outline-none transition-all duration-200 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]/40 font-sans resize-y min-h-[85px] sm:min-h-[90px]"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION 04 — ESTIMATED INVESTMENT (Package Mode Only)         */}
              {/* ------------------------------------------------------------- */}
              {mode === 'package' && (
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 border-b border-white/10 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.10em] sm:tracking-[0.2em] text-[#8B0000]">
                    <span>04 —</span>
                    <h2 className="text-[#F8F8F8] font-display text-[10.5px] sm:text-sm font-semibold tracking-normal sm:tracking-wide uppercase whitespace-nowrap">
                      ESTIMATED INVESTMENT
                    </h2>
                  </div>

                  <div className="mt-3.5 sm:mt-4 p-4 sm:p-5 rounded-xl border border-white/10 bg-black/50 space-y-2.5 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-mono">
                      <span className="text-[#8E8E93] uppercase tracking-wider">Plan Summary</span>
                      <span className="text-white font-bold">
                        {industry} — {packageName} {isCustom && `(${customCalculation.selectedCount} Services)`}
                      </span>
                    </div>

                    {isCustom && customCalculation.isAllServicesSelected && (
                      <div className="pt-1 flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
                        <span>Individual service value:</span>
                        <span className="line-through text-neutral-500">
                          {formatINR(customCalculation.individualSum)}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/[0.08] flex items-baseline justify-between gap-2">
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#8E8E93] whitespace-nowrap">
                        Estimated Investment
                      </span>
                      <div className="text-right shrink-0">
                        <span className="font-display text-xl sm:text-3xl font-bold tracking-tight text-[#F8F8F8]">
                          {displayPrice.split(' ')[0]}
                        </span>
                        <span className="text-[11px] sm:text-xs text-neutral-400 font-sans ml-1">/ month</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Banner if any */}
              {submitError && (
                <div className="p-3.5 rounded-xl border border-[#FF5555]/40 bg-[#FF5555]/10 flex items-start gap-2.5 text-xs text-[#FF8888] font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission Failed</p>
                    <p className="mt-0.5 text-neutral-300">{submitError}</p>
                  </div>
                </div>
              )}

              {/* Submit CTA Button (No Arrow Icon) */}
              <div className="pt-1 sm:pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || (isCustom && customCalculation.selectedCount === 0)}
                  className={`w-full group inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-300 ease-out cursor-pointer ${isSubmitting || (isCustom && customCalculation.selectedCount === 0)
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                    : 'bg-[#8B0000] hover:bg-[#A50000] text-white shadow-[0_6px_24px_rgba(139,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(139,0,0,0.6)] active:scale-[0.99]'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      <span>SENDING…</span>
                    </>
                  ) : isCustom && customCalculation.selectedCount === 0 ? (
                    <span>SELECT SERVICES TO CONTINUE</span>
                  ) : (
                    <span>SEND ENQUIRY</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] pt-28 pb-16 text-[#F8F8F8]">
      <Navbar activePage="Contact" />
      <Suspense
        fallback={
          <div className="container-xcess py-24 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Loading enquiry form…
          </div>
        }
      >
        <ContactFormContent />
      </Suspense>
    </main>
  )
}
