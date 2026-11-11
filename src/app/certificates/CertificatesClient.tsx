'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Award, ShieldCheck } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import {
  IndexCard,
  IndexCardContent,
  IndexCardFooter,
  IndexCardHeader,
  IndexCardTitle,
} from '@/components/looseleaf/IndexCard'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
import { StickyNote, StickyNoteContent, StickyNoteTitle } from '@/components/looseleaf/StickyNote'
import { PROOF_CONTENT } from '@/lib/consulting-content'
import { certificatesService } from '@/lib/services'
import type { Certificate } from '@/types'

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder.supabase.co')
)

export function CertificatesClient() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loaded, setLoaded] = useState(!SUPABASE_CONFIGURED)
  const [selected, setSelected] = useState<Certificate | null>(null)

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) return
    certificatesService
      .getAll(true)
      .then(data => setCerts(data || []))
      .catch(() => setCerts([]))
      .finally(() => setLoaded(true))
  }, [])

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="certs-hero-sheet"
          className="px-6 py-9 sm:px-10 sm:py-12"
        >
          <Link
            href="/about#proof"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to About &amp; Proof
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
              {PROOF_CONTENT.sectionNumber} / Credentials Repository
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
              Verified Credentials &amp; Recognitions
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
              Certificates, academic recognitions, and competition awards are published here strictly when paired with verifiable records.
            </p>
          </header>

          <InkRule variant="pencil" seed="certs-header-rule" className="my-8" />

          {!loaded ? (
            <Paper stock="slip" tilt={false} seed="certs-loading-slip" className="p-6 text-sm text-[var(--ll-ink-soft)]">
              Loading credentials repository...
            </Paper>
          ) : certs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certs.map(cert => (
                <IndexCard
                  key={cert.id}
                  flag="teal"
                  tilt={false}
                  seed={`cert-card-${cert.id}`}
                  className="h-full p-5"
                >
                  <IndexCardHeader>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                      {cert.issuer}
                    </span>
                    {cert.date && (
                      <span className="font-mono text-[10px] text-[var(--ll-pencil-text)]">
                        {cert.date}
                      </span>
                    )}
                  </IndexCardHeader>

                  <IndexCardContent>
                    <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded border border-[var(--ll-pencil-mark)]/40 bg-[var(--ll-slip)] p-3">
                      {cert.imageUrl ? (
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <Award size={42} aria-hidden="true" className="text-[var(--ll-ink-you)]" />
                      )}
                    </div>

                    <IndexCardTitle className="font-sans text-lg font-bold leading-snug">
                      {cert.title}
                    </IndexCardTitle>
                  </IndexCardContent>

                  <IndexCardFooter className="gap-2.5 border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-4">
                    <InkButton
                      type="button"
                      variant="outline"
                      size="sm"
                      seed={`cert-detail-${cert.id}`}
                      onClick={() => setSelected(cert)}
                      className="flex-1"
                    >
                      Details
                    </InkButton>
                    {cert.verifyUrl && (
                      <InkButton
                        href={cert.verifyUrl}
                        external
                        variant="default"
                        size="sm"
                        seed={`cert-verify-${cert.id}`}
                      >
                        <ShieldCheck size={14} aria-hidden="true" />
                        Verify
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </InkButton>
                    )}
                  </IndexCardFooter>
                </IndexCard>
              ))}
            </div>
          ) : (
            <StickyNote
              color="yellow"
              tape="corner"
              tilt={false}
              seed="certs-empty-sticky"
              className="p-6 sm:p-8"
            >
              <StickyNoteTitle className="font-sans text-xl font-bold">
                Credentials are being compiled with verification links.
              </StickyNoteTitle>
              <StickyNoteContent className="mt-2 max-w-2xl text-sm leading-6">
                In keeping with an evidence-first standard, individual award badges and numeric metrics are only published publicly once linked to verifiable source records.
              </StickyNoteContent>
              <div className="mt-6 flex flex-wrap gap-3">
                <InkButton href="/about#education" variant="outline" size="sm" seed="certs-edu-btn">
                  View Academic Profile
                </InkButton>
                <InkButton href="/work" variant="default" size="sm" seed="certs-work-btn">
                  Explore Selected Work
                </InkButton>
              </div>
            </StickyNote>
          )}
        </Paper>
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <Paper
            stock="paper"
            tape="top"
            tilt={false}
            seed={`cert-modal-${selected.id}`}
            className="w-full max-w-lg p-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-[var(--ll-pencil-mark)] pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                  {selected.issuer}
                </p>
                <h2
                  id="cert-dialog-title"
                  className="mt-1 font-sans text-xl font-bold text-[var(--ll-ink)]"
                >
                  {selected.title}
                </h2>
              </div>
              <InkButton
                type="button"
                variant="outline"
                size="icon-xs"
                seed="cert-modal-close-x"
                onClick={() => setSelected(null)}
                aria-label="Close certificate details"
              >
                ×
              </InkButton>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[var(--ll-ink-soft)]">
              {selected.date && <p className="font-mono text-xs">Issued: {selected.date}</p>}
              {selected.credentialId && (
                <p className="font-mono text-xs">Credential ID: {selected.credentialId}</p>
              )}
              {selected.description && <p className="leading-6">{selected.description}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <InkButton
                type="button"
                variant="outline"
                size="sm"
                seed="cert-modal-close-btn"
                onClick={() => setSelected(null)}
              >
                Close
              </InkButton>
              {selected.verifyUrl && (
                <InkButton
                  href={selected.verifyUrl}
                  external
                  variant="default"
                  size="sm"
                  seed="cert-modal-verify-btn"
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  Verify Source
                </InkButton>
              )}
            </div>
          </Paper>
        </div>
      )}
    </SiteShell>
  )
}
