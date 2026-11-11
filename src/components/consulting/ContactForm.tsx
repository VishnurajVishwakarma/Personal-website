'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Mail, Send } from 'lucide-react'
import { BRAND, CONTACT_CONTENT } from '@/lib/consulting-content'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'

interface FormState {
  name: string
  email: string
  organization: string
  topic: string
  message: string
  consent: boolean
  website: string // honeypot
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  organization: '',
  topic: CONTACT_CONTENT.inquiryTopics[0],
  message: '',
  consent: false,
  website: '',
}

const INPUT_CLASS =
  'mt-2 h-11 w-full rounded-md border border-[var(--ll-pencil-mark)] bg-[var(--ll-slip)] px-3.5 text-sm text-[var(--ll-ink)] placeholder:text-[var(--ll-pencil-text)] transition-colors focus:border-[var(--ll-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ll-focus)]/30'

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [formStartedAt] = useState<number>(() => Date.now())
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
    showMailtoFallback?: boolean
  }>({ type: 'idle', message: '' })

  const mailtoHref = (() => {
    const subject = encodeURIComponent(
      `[Consulting Inquiry] ${form.topic}${form.organization ? ` — ${form.organization}` : ''}`
    )
    const body = encodeURIComponent(
      [
        form.name ? `Name: ${form.name}` : '',
        form.organization ? `Organization: ${form.organization}` : '',
        form.topic ? `Topic: ${form.topic}` : '',
        '',
        form.message || 'Hello Vishnuraj, I would like to discuss a business challenge.',
      ]
        .filter(line => line !== null)
        .join('\n')
    )
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`
  })()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (form.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }
    if (form.message.trim().length < 15) {
      setStatus({
        type: 'error',
        message: 'Please provide at least a short description of your challenge (15+ characters).',
      })
      return
    }
    if (!form.consent) {
      setStatus({
        type: 'error',
        message: 'Please confirm that you consent to sharing this inquiry for follow-up.',
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          formStartedAt,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        setStatus({
          type: 'error',
          message:
            result.error ||
            'Could not submit your inquiry right now. Please use the direct email option below.',
          showMailtoFallback: true,
        })
        return
      }

      setStatus({
        type: 'success',
        message:
          result.message ||
          'Thank you. Your inquiry has been recorded in the inbox.',
      })
      setForm(INITIAL_FORM)
    } catch {
      setStatus({
        type: 'error',
        message:
          'Network error while submitting the form. You can send your inquiry directly via email.',
        showMailtoFallback: true,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Paper
      stock="paper"
      tape="top"
      tapeKind="masking"
      fastener="clip"
      tilt={false}
      seed="contact-inquiry-sheet"
      className="p-6 sm:p-8"
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
            Project &amp; Advisory Inquiry
          </p>
          <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)]">
            Share Your{' '}
            <Annotate type="underline" kind="single" tone="marker" seed="contact-form-title">
              Business Context
            </Annotate>
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">
            Outline your operational challenge, goal, or timeline. You can also write directly to{' '}
            <a
              href={`mailto:${BRAND.email}`}
              className="font-mono text-xs font-medium text-[var(--ll-link)] underline underline-offset-4 hover:text-[var(--ll-link-hover)]"
            >
              {BRAND.email}
            </a>
            .
          </p>
        </div>

        <InkRule variant="dashed" seed="contact-form-header-rule" className="mb-6" />

        {/* Honeypot field hidden from assistive tech and sighted users */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field blank</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={e => setForm(prev => ({ ...prev, website: e.target.value }))}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]"
            >
              Full Name <span className="text-[var(--ll-marker)]">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]"
            >
              Email Address <span className="text-[var(--ll-marker)]">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="contact-organization"
              className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]"
            >
              Organization / Role (Optional)
            </label>
            <input
              id="contact-organization"
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Company or venture name"
              value={form.organization}
              onChange={e => setForm(prev => ({ ...prev, organization: e.target.value }))}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="contact-topic"
              className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]"
            >
              Focus Area
            </label>
            <select
              id="contact-topic"
              name="topic"
              value={form.topic}
              onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))}
              className={INPUT_CLASS}
            >
              {CONTACT_CONTENT.inquiryTopics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="contact-message"
              className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]"
            >
              Business Challenge or Inquiry Details{' '}
              <span className="text-[var(--ll-marker)]">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Describe the operational workflow, system, or business goal you are looking to explore..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              className="mt-2 w-full rounded-md border border-[var(--ll-pencil-mark)] bg-[var(--ll-slip)] p-3.5 text-sm leading-6 text-[var(--ll-ink)] placeholder:text-[var(--ll-pencil-text)] transition-colors focus:border-[var(--ll-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--ll-focus)]/30"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[var(--ll-ink-soft)]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => setForm(prev => ({ ...prev, consent: e.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--ll-pencil-mark)] accent-[var(--ll-marker)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
              />
              <span>
                I agree that the details submitted here will only be used to review and respond to my inquiry. Do not include confidential financial records or sensitive proprietary secrets in this initial message.
              </span>
            </label>
          </div>
        </div>

        {status.type !== 'idle' && (
          <div
            role={status.type === 'error' ? 'alert' : 'status'}
            className={`mt-5 rounded-lg border p-4 text-sm ${
              status.type === 'success'
                ? 'border-[var(--ll-check-ink)] bg-[var(--ll-sticky-green)] text-[var(--ll-ink)]'
                : 'border-[var(--ll-red)] bg-[var(--ll-sticky-pink)] text-[var(--ll-ink)]'
            }`}
          >
            <div className="flex items-start gap-3">
              {status.type === 'success' ? (
                <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--ll-check-ink)]" />
              ) : (
                <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--ll-red)]" />
              )}
              <div className="space-y-2">
                <p className="leading-6">{status.message}</p>
                {status.showMailtoFallback && (
                  <InkButton
                    href={mailtoHref}
                    variant="outline"
                    size="sm"
                    seed="contact-error-mailto"
                  >
                    <Mail size={14} aria-hidden="true" />
                    Send via Email Client Instead
                  </InkButton>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <InkButton
            type="submit"
            disabled={submitting}
            variant="default"
            size="default"
            seed="contact-submit-btn"
          >
            <Send size={15} aria-hidden="true" />
            {submitting ? 'Sending Inquiry...' : CONTACT_CONTENT.primaryCta}
          </InkButton>

          <InkButton
            href={mailtoHref}
            variant="outline"
            size="default"
            seed="contact-mailto-btn"
          >
            <Mail size={15} aria-hidden="true" />
            Open in Email App
          </InkButton>
        </div>
      </form>
    </Paper>
  )
}
