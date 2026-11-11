import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { ContactForm } from '@/components/consulting/ContactForm'
import { BRAND, CONTACT_CONTENT } from '@/lib/consulting-content'

export const metadata: Metadata = {
  title: 'Contact — Discuss Your Business Challenge',
  description:
    'Connect with Vishnuraj Vishwakarma in Mumbai, India to discuss AI adoption, operational automation, business intelligence, and technology strategy.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="focus-ring rounded hover:text-[var(--text-primary)]">
              Home
            </Link>{' '}
            / <span className="text-[var(--text-primary)]">Contact</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {CONTACT_CONTENT.sectionNumber} / {CONTACT_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {CONTACT_CONTENT.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-[var(--text-primary)] sm:text-xl">
            {CONTACT_CONTENT.lead}
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)]/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
          <div className="space-y-6">
            <div className="space-y-4 text-base leading-7 text-[var(--text-secondary)]">
              {CONTACT_CONTENT.paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 space-y-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Direct Email
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="focus-ring mt-2 inline-flex items-center gap-2.5 rounded text-base font-semibold text-[var(--accent-primary)] hover:underline break-all"
                >
                  <Mail size={17} aria-hidden="true" className="shrink-0" />
                  {BRAND.email}
                </a>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Professional Network
                </p>
                <a
                  href={BRAND.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring mt-2 inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  {CONTACT_CONTENT.secondaryCta}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Location
                </p>
                <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                  <MapPin size={15} aria-hidden="true" className="text-[var(--accent-primary)]" />
                  {CONTACT_CONTENT.location}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 space-y-3 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <Clock size={16} aria-hidden="true" className="text-[var(--accent-primary)]" />
                <span>What helps make an initial discussion productive</span>
              </div>
              <ul className="space-y-2 text-xs leading-5 text-[var(--text-secondary)]">
                <li>· Brief summary of your current workflow or operational bottleneck</li>
                <li>· Key decision or capability you want technology or AI to unlock</li>
                <li>· Whether you are looking for advisory direction, integration, or systems delivery</li>
              </ul>
              <div className="flex items-start gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs text-[var(--text-muted)]">
                <ShieldCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--accent-warm)]" />
                <span>
                  Please share high-level context only in initial outreach; confidential data can wait until mutual agreement.
                </span>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

