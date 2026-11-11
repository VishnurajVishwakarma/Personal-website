'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Mail, Send } from 'lucide-react'
import { BRAND, CONTACT_CONTENT } from '@/lib/consulting-content'

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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="mb-6 border-b border-[var(--border-subtle)] pb-5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-primary)]">
          Project & Advisory Inquiry
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
          Share Your Business Context
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Outline your operational challenge, goal, or timeline. You can also write directly to{' '}
          <a
            href={`mailto:${BRAND.email}`}
            className="focus-ring rounded font-medium text-[var(--accent-primary)] underline underline-offset-4"
          >
            {BRAND.email}
          </a>
          .
        </p>
      </div>

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
            className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]"
          >
            Full Name <span className="text-[var(--accent-primary)]">*</span>
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
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]"
          >
            Email Address <span className="text-[var(--accent-primary)]">*</span>
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
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-organization"
            className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]"
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
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-topic"
            className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]"
          >
            Focus Area
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={form.topic}
            onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))}
            className="focus-ring mt-2 h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 text-sm text-[var(--text-primary)]"
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
            className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]"
          >
            Business Challenge or Inquiry Details{' '}
            <span className="text-[var(--accent-primary)]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Describe the operational workflow, system, or business goal you are looking to explore..."
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            className="focus-ring mt-2 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] p-3.5 text-sm leading-6 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={e => setForm(prev => ({ ...prev, consent: e.target.checked }))}
              className="focus-ring mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border-strong)] accent-[var(--accent-primary)]"
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
          className={`mt-5 rounded-xl border p-4 text-sm ${
            status.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              : 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {status.type === 'success' ? (
              <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
            )}
            <div className="space-y-2">
              <p className="leading-6">{status.message}</p>
              {status.showMailtoFallback && (
                <a
                  href={mailtoHref}
                  className="focus-ring inline-flex items-center gap-2 rounded-lg border border-current/25 bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:opacity-90"
                >
                  <Mail size={14} aria-hidden="true" />
                  Send via Email Client Instead
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={15} aria-hidden="true" />
          {submitting ? 'Sending Inquiry...' : CONTACT_CONTENT.primaryCta}
        </button>

        <a
          href={mailtoHref}
          className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
        >
          <Mail size={15} aria-hidden="true" />
          Open in Email App
        </a>
      </div>
    </form>
  )
}

