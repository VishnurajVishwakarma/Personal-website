import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Cpu,
  Database,
  Layers3,
  LineChart,
  Mail,
  MapPin,
  Settings2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Reveal, SectionHeading } from '@/components/consulting/MotionPrimitives'
import { SystemsTopologyVisual } from '@/components/consulting/SystemsTopologyVisual'
import { ApproachTimeline } from '@/components/consulting/ApproachTimeline'
import { InitiativeCover } from '@/components/consulting/InitiativeCover'
import {
  ABOUT_CONTENT,
  APPROACH_CONTENT,
  BRAND,
  CONTACT_CONTENT,
  EXPERIENCE_CONTENT,
  EXPERTISE_CONTENT,
  FINANCE_STRATEGY_CONTENT,
  HERO_CONTENT,
  PROJECTS_CONTENT,
  PROOF_CONTENT,
  WHAT_I_DO_CONTENT,
} from '@/lib/consulting-content'

export const metadata: Metadata = {
  title: BRAND.seoTitle,
  description: BRAND.seoDescription,
  alternates: { canonical: '/' },
}

const PILLAR_ICONS = [Cpu, Settings2, Layers3, Database, TrendingUp, Briefcase]

export default function HomePage() {
  return (
    <SiteShell>
      {/* 01 / HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-10 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 font-mono font-medium uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" aria-hidden="true" />
                {HERO_CONTENT.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em] text-[var(--text-muted)]">
                <MapPin size={13} aria-hidden="true" />
                {HERO_CONTENT.location}
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(2.35rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[var(--text-primary)]">
              {HERO_CONTENT.headline}
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-[var(--text-primary)] sm:text-xl">
              {HERO_CONTENT.subheadline}
            </p>

            <div className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-[var(--text-secondary)]">
              <p>{HERO_CONTENT.bodyPrimary}</p>
              <p>{HERO_CONTENT.bodySecondary}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={HERO_CONTENT.primaryCta.href}
                className="focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
              >
                {HERO_CONTENT.primaryCta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={HERO_CONTENT.secondaryCta.href}
                className="focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              >
                {HERO_CONTENT.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-9 border-t border-[var(--border-subtle)] pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Practice Focus
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {HERO_CONTENT.focusAreas.map(area => (
                  <li
                    key={area}
                    className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:pl-2">
            <SystemsTopologyVisual />
          </div>
        </div>
      </section>

      {/* 02 / WHAT I DO (SERVICES PREVIEW) */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              number={WHAT_I_DO_CONTENT.sectionNumber}
              eyebrow={WHAT_I_DO_CONTENT.eyebrow}
              title={WHAT_I_DO_CONTENT.title}
              lead={WHAT_I_DO_CONTENT.lead}
              description={WHAT_I_DO_CONTENT.intro}
            />
            <Link
              href="/services"
              className="focus-ring inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] lg:self-end"
            >
              Explore Consulting Services
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_I_DO_CONTENT.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length]
              return (
                <Reveal key={pillar.id} delay={index * 0.04}>
                  <article className="flex h-full flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-warm)]">
                          {pillar.number}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent-primary)]">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                      <Link
                        href={`/services#${pillar.id}`}
                        className="focus-ring inline-flex items-center gap-1.5 rounded text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)] hover:underline"
                      >
                        See scope & outcomes
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 03 / MY APPROACH */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading
            number={APPROACH_CONTENT.sectionNumber}
            eyebrow={APPROACH_CONTENT.eyebrow}
            title={APPROACH_CONTENT.title}
            description={APPROACH_CONTENT.intro}
          />

          <ApproachTimeline />

          <div className="mt-10 flex flex-col justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 sm:flex-row sm:items-center">
            <p className="max-w-3xl text-sm font-medium leading-6 text-[var(--text-primary)] sm:text-base">
              {APPROACH_CONTENT.closing}
            </p>
            <Link
              href="/contact"
              className="focus-ring inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
            >
              Start With Discovery
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 04 / SELECTED PROJECTS & INITIATIVES */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              number={PROJECTS_CONTENT.sectionNumber}
              eyebrow={PROJECTS_CONTENT.eyebrow}
              title={PROJECTS_CONTENT.title}
              description={PROJECTS_CONTENT.intro}
            />
            <Link
              href="/work"
              className="focus-ring inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] lg:self-end"
            >
              All Work & Case Studies
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {PROJECTS_CONTENT.initiatives.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)]">
                  <div className="grid flex-1 sm:grid-cols-[0.82fr_1.18fr]">
                    <div className="border-b border-[var(--border-subtle)] sm:border-b-0 sm:border-r">
                      <InitiativeCover slug={item.slug} category={item.category} />
                    </div>
                    <div className="flex flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                            {item.number} · {item.category}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                          {item.subtitle}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                          {item.summary}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {item.focusAreas.map(tag => (
                            <li
                              key={tag}
                              className="rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                        <Link
                          href={`/work/${item.slug}`}
                          className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[var(--accent-primary)] hover:underline"
                        >
                          Read Case Overview
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          {item.statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 / 06 / 07 — INTERDISCIPLINARY PERSPECTIVE & EXPERTISE SNAPSHOT */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <SectionHeading
              number={ABOUT_CONTENT.sectionNumber}
              eyebrow="Consulting Perspective"
              title={ABOUT_CONTENT.title}
              description={ABOUT_CONTENT.paragraphs[1]}
            />
            <div className="mt-6 space-y-4 text-base leading-7 text-[var(--text-secondary)]">
              <p>{ABOUT_CONTENT.paragraphs[2]}</p>
              <p>{ABOUT_CONTENT.paragraphs[3]}</p>
            </div>

            <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6">
              <div className="flex items-center gap-2.5">
                <LineChart size={18} className="text-[var(--accent-primary)]" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                  {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
                </p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
                {FINANCE_STRATEGY_CONTENT.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {FINANCE_STRATEGY_CONTENT.lead} {FINANCE_STRATEGY_CONTENT.paragraphs[0]}
              </p>
            </div>

            <div className="mt-7">
              <Link
                href="/about"
                className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                About Vishnuraj, Credentials & Experience
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERTISE_CONTENT.domains.map(domain => (
              <div
                key={domain.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-[var(--text-primary)]">
                  {domain.title}
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--text-secondary)]">
                  {domain.capabilities.map(cap => (
                    <li key={cap} className="flex items-start gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-primary)]"
                        aria-hidden="true"
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 & 08 — EXPERIENCE & VERIFIED EVIDENCE */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                number={EXPERIENCE_CONTENT.sectionNumber}
                eyebrow={EXPERIENCE_CONTENT.eyebrow}
                title={EXPERIENCE_CONTENT.title}
              />
              <div className="mt-8 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                {EXPERIENCE_CONTENT.roles.map((item, idx) => (
                  <article
                    key={item.id}
                    className="grid gap-3 py-5 sm:grid-cols-[44px_1fr_auto] sm:items-start"
                  >
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {item.organization}
                      </h3>
                      <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                        {item.role}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`External reference for ${item.organization}`}
                        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                      >
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[var(--accent-primary)]" aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                  {PROOF_CONTENT.sectionNumber} / {PROOF_CONTENT.eyebrow}
                </p>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                {PROOF_CONTENT.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {PROOF_CONTENT.intro}
              </p>

              <ul className="mt-6 space-y-3 border-t border-[var(--border-subtle)] pt-5">
                {PROOF_CONTENT.evidenceCategories.slice(0, 4).map(cat => (
                  <li key={cat.title} className="text-sm">
                    <Link
                      href={cat.href}
                      className="focus-ring group flex items-start justify-between gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-[var(--bg-secondary)]"
                    >
                      <div>
                        <p className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                          {cat.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                          {cat.status}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-[var(--border-subtle)] pt-4 text-xs italic leading-5 text-[var(--text-muted)]">
                “{PROOF_CONTENT.closingQuote}”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12 / FINAL EXECUTIVE CONTACT CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                  {CONTACT_CONTENT.sectionNumber} / {CONTACT_CONTENT.eyebrow}
                </p>
                <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
                  {CONTACT_CONTENT.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base font-medium text-[var(--text-primary)] sm:text-lg">
                  {CONTACT_CONTENT.lead}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {CONTACT_CONTENT.paragraphs[0]}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 lg:items-end">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)] lg:w-auto"
                >
                  {CONTACT_CONTENT.primaryCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <div className="flex w-full flex-wrap gap-3 lg:w-auto lg:justify-end">
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="focus-ring inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] lg:flex-initial"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Email Directly
                  </a>
                  <a
                    href={BRAND.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] lg:flex-initial"
                  >
                    {CONTACT_CONTENT.secondaryCta}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
