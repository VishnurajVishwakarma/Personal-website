import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { ContactForm } from '@/components/consulting/ContactForm'
import { Paper } from '@/components/looseleaf/Paper'
import { IndexCard } from '@/components/looseleaf/IndexCard'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import { StickyNote, StickyNoteContent } from '@/components/looseleaf/StickyNote'
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
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="contact-hero-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--ll-pencil-text)]">
            <Link href="/" className="hover:text-[var(--ll-ink)] hover:underline underline-offset-4">
              Home
            </Link>{' '}
            / <span className="font-medium text-[var(--ll-ink)]">Contact</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
            {CONTACT_CONTENT.sectionNumber} / {CONTACT_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            <Annotate type="underline" kind="single" tone="marker" seed="contact-h1-mark">
              {CONTACT_CONTENT.title}
            </Annotate>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-[var(--ll-ink)] sm:text-xl">
            {CONTACT_CONTENT.lead}
          </p>
        </Paper>
      </section>

      {/* Contact Body & Inquiry Form */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="space-y-6">
          <Paper stock="pad" rules="pad" tilt={false} seed="contact-notes-pad" className="p-6">
            <div className="space-y-4 text-base leading-7 text-[var(--ll-ink-soft)]">
              {CONTACT_CONTENT.paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </Paper>

          <IndexCard
            flag="sky"
            tilt={false}
            seed="contact-channels-card"
            className="space-y-5 p-6"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                Direct Email
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-2 inline-flex items-center gap-2.5 font-sans text-base font-bold text-[var(--ll-link)] underline-offset-4 hover:underline break-all"
              >
                <Mail size={17} aria-hidden="true" className="shrink-0" />
                {BRAND.email}
              </a>
            </div>

            <InkRule variant="dashed" seed="contact-chan-r1" />

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                Professional Network
              </p>
              <div className="mt-2.5">
                <InkButton
                  href={BRAND.linkedinUrl}
                  external
                  variant="outline"
                  size="sm"
                  seed="contact-linkedin-btn"
                >
                  {CONTACT_CONTENT.secondaryCta}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </InkButton>
              </div>
            </div>

            <InkRule variant="dashed" seed="contact-chan-r2" />

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                Location
              </p>
              <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-[var(--ll-ink)]">
                <MapPin size={15} aria-hidden="true" className="text-[var(--ll-ink-you)]" />
                {CONTACT_CONTENT.location}
              </p>
            </div>
          </IndexCard>

          <StickyNote
            color="yellow"
            tape="corner"
            tilt={false}
            seed="contact-prep-sticky"
            className="space-y-3 text-sm"
          >
            <div className="flex items-center gap-2 font-sans font-bold text-[var(--ll-ink)]">
              <Clock size={16} aria-hidden="true" />
              <span>What helps make an initial discussion productive</span>
            </div>
            <StickyNoteContent className="space-y-1.5 text-xs leading-5">
              <p>· Brief summary of your current workflow or operational bottleneck</p>
              <p>· Key decision or capability you want technology or AI to unlock</p>
              <p>· Whether you are looking for advisory direction, integration, or systems delivery</p>
            </StickyNoteContent>
            <div className="flex items-start gap-2 border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-3 text-xs text-[var(--ll-ink-soft)]">
              <ShieldCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>
                Please share high-level context only in initial outreach; confidential data can wait until mutual agreement.
              </span>
            </div>
          </StickyNote>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </SiteShell>
  )
}
