import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  GraduationCap,
  Mail,
  MapPin,
} from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { SectionHeading } from '@/components/consulting/MotionPrimitives'
import {
  ABOUT_CONTENT,
  BRAND,
  CURRENT_FOCUS_CONTENT,
  EXPERIENCE_CONTENT,
  EXPERTISE_CONTENT,
  FINANCE_STRATEGY_CONTENT,
  PROOF_CONTENT,
} from '@/lib/consulting-content'

export const metadata: Metadata = {
  title: 'About — Background, Expertise & Experience',
  description:
    'Vishnuraj Vishwakarma: B.Sc. IT, pursuing PGDM, combining Information Technology, AI, business operations, finance, and strategy in Mumbai, India.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <SiteShell>
      {/* 05 / ABOUT HERO & NARRATIVE */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="focus-ring rounded hover:text-[var(--text-primary)]">
              Home
            </Link>{' '}
            / <span className="text-[var(--text-primary)]">About</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#0B0E13]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/vishnuraj-original.jpg"
                    alt="Portrait of Vishnuraj Vishwakarma, AI, Business & Technology Consultant"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 34vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="border-t border-white/10 bg-[#0B0E13] px-5 py-4 text-[#F4F1EA]">
                  <p className="text-sm font-semibold">{BRAND.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF]">
                    {BRAND.role}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#B4BCC8]">
                    <MapPin size={13} aria-hidden="true" />
                    {BRAND.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="focus-ring inline-flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                >
                  <Mail size={14} aria-hidden="true" />
                  Email
                </a>
                <a
                  href={BRAND.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                >
                  LinkedIn
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                {ABOUT_CONTENT.sectionNumber} / {ABOUT_CONTENT.eyebrow}
              </p>
              <h1 className="mt-4 text-[clamp(2.1rem,4.4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
                {ABOUT_CONTENT.title}
              </h1>

              <div className="mt-7 space-y-5 text-base leading-8 text-[var(--text-secondary)] sm:text-[1.0625rem]">
                {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                  <p
                    key={paragraph}
                    className={
                      idx === 0 || idx === ABOUT_CONTENT.paragraphs.length - 1
                        ? 'font-medium text-[var(--text-primary)]'
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Academic Credentials */}
              <div id="education" className="mt-10 scroll-mt-24">
                <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                  <GraduationCap size={18} aria-hidden="true" />
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                    Academic Qualifications
                  </h2>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {ABOUT_CONTENT.education.map(edu => (
                    <article
                      key={edu.degree}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5"
                    >
                      <span className="inline-block rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                        {edu.status}
                      </span>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--text-primary)]">
                        {edu.degree}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {edu.focus}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 / BUSINESS & TECHNOLOGY EXPERTISE */}
      <section
        id="expertise"
        className="scroll-mt-20 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading
            number={EXPERTISE_CONTENT.sectionNumber}
            eyebrow={EXPERTISE_CONTENT.eyebrow}
            title={EXPERTISE_CONTENT.title}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE_CONTENT.domains.map(domain => (
              <article
                key={domain.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-base font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                  {domain.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                  {domain.capabilities.map(capability => (
                    <li key={capability} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]"
                        aria-hidden="true"
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / FINANCE & STRATEGY */}
      <section
        id="finance-strategy"
        className="scroll-mt-20 border-b border-[var(--border-subtle)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionHeading
                number={FINANCE_STRATEGY_CONTENT.sectionNumber}
                eyebrow={FINANCE_STRATEGY_CONTENT.eyebrow}
                title={FINANCE_STRATEGY_CONTENT.title}
                lead={FINANCE_STRATEGY_CONTENT.lead}
              />
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                {FINANCE_STRATEGY_CONTENT.paragraphs.map(text => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                Areas of Focus
              </p>
              <ul className="mt-5 divide-y divide-[var(--border-subtle)]">
                {FINANCE_STRATEGY_CONTENT.areasOfFocus.map((area, idx) => (
                  <li
                    key={area}
                    className="flex items-center gap-4 py-3.5 text-sm font-medium text-[var(--text-primary)]"
                  >
                    <span className="font-mono text-xs text-[var(--accent-warm)]">
                      0{idx + 1}
                    </span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10 / PROFESSIONAL EXPERIENCE */}
      <section
        id="experience"
        className="scroll-mt-20 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading
            number={EXPERIENCE_CONTENT.sectionNumber}
            eyebrow={EXPERIENCE_CONTENT.eyebrow}
            title={EXPERIENCE_CONTENT.title}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {EXPERIENCE_CONTENT.roles.map((role, idx) => (
              <article
                key={role.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                    {role.externalUrl && (
                      <a
                        href={role.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`External profile for ${role.organization}`}
                        className="focus-ring inline-flex items-center gap-1 rounded text-xs font-medium text-[var(--accent-primary)] hover:underline"
                      >
                        Reference
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {role.organization}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                    {role.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {role.description}
                  </p>
                </div>
                <p className="mt-5 border-t border-[var(--border-subtle)] pt-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {role.contextNote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 08 & 11 / PROOF, RECOGNITION & CURRENT FOCUS */}
      <section id="proof" className="scroll-mt-20 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                number={PROOF_CONTENT.sectionNumber}
                eyebrow={PROOF_CONTENT.eyebrow}
                title={PROOF_CONTENT.title}
                description={PROOF_CONTENT.intro}
              />

              <div className="mt-7 space-y-3">
                {PROOF_CONTENT.evidenceCategories.map(item => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="focus-ring group block rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent-primary)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                          {item.detail}
                        </p>
                      </div>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  href="/certificates"
                  className="focus-ring inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                >
                  <Award size={15} aria-hidden="true" className="text-[var(--accent-primary)]" />
                  Open Credentials Repository
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-7 sm:p-9">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                  {CURRENT_FOCUS_CONTENT.sectionNumber} / {CURRENT_FOCUS_CONTENT.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-3xl">
                  {CURRENT_FOCUS_CONTENT.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
                  {CURRENT_FOCUS_CONTENT.paragraphs.map((p, idx) => (
                    <p
                      key={p}
                      className={
                        idx === CURRENT_FOCUS_CONTENT.paragraphs.length - 1
                          ? 'font-medium text-[var(--text-primary)]'
                          : undefined
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
                >
                  Discuss Your Business Challenge
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

