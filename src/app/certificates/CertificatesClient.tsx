'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Award, ShieldCheck } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
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
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/about#proof"
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to About & Proof
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {PROOF_CONTENT.sectionNumber} / Credentials Repository
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            Verified Credentials & Recognitions
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            Certificates, academic recognitions, and competition awards are published here strictly when paired with verifiable records.
          </p>
        </header>

        {!loaded ? (
          <div className="mt-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 text-sm text-[var(--text-secondary)]">
            Loading credentials repository...
          </div>
        ) : certs.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certs.map(cert => (
              <article
                key={cert.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]"
              >
                <div className="relative flex h-44 items-center justify-center border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4">
                  {cert.imageUrl ? (
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      className="object-contain p-3"
                    />
                  ) : (
                    <Award size={44} aria-hidden="true" className="text-[var(--accent-primary)]" />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                      {cert.issuer}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                      {cert.title}
                    </h2>
                    {cert.date && (
                      <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                        {cert.date}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex gap-2.5 border-t border-[var(--border-subtle)] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelected(cert)}
                      className="focus-ring flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    >
                      Details
                    </button>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--accent-primary)] px-3.5 py-2 text-xs font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent-primary-hover)]"
                      >
                        <ShieldCheck size={14} aria-hidden="true" />
                        Verify
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Credentials are being compiled with verification links.
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              In keeping with an evidence-first standard, individual award badges and numeric metrics are only published publicly once linked to verifiable source records.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about#education"
                className="focus-ring inline-flex min-h-[42px] items-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              >
                View Academic Profile
              </Link>
              <Link
                href="/work"
                className="focus-ring inline-flex min-h-[42px] items-center rounded-lg bg-[var(--accent-primary)] px-4 text-xs font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent-primary-hover)]"
              >
                Explore Selected Work
              </Link>
            </div>
          </div>
        )}
      </section>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                  {selected.issuer}
                </p>
                <h2
                  id="cert-dialog-title"
                  className="mt-1 text-xl font-semibold text-[var(--text-primary)]"
                >
                  {selected.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close certificate details"
                className="focus-ring rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              {selected.date && <p className="font-mono text-xs">Issued: {selected.date}</p>}
              {selected.credentialId && (
                <p className="font-mono text-xs">Credential ID: {selected.credentialId}</p>
              )}
              {selected.description && <p className="leading-6">{selected.description}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="focus-ring rounded-lg border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
              >
                Close
              </button>
              {selected.verifyUrl && (
                <a
                  href={selected.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold text-[var(--accent-foreground)]"
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  Verify Source
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  )
}

