import type { Metadata } from 'next'
import Image from 'next/image'
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
import { Paper } from '@/components/looseleaf/Paper'
import {
  IndexCard,
  IndexCardContent,
  IndexCardFooter,
  IndexCardHeader,
  IndexCardTitle,
} from '@/components/looseleaf/IndexCard'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import { StickyNote, StickyNoteContent } from '@/components/looseleaf/StickyNote'
import type { Accent } from '@/lib/ink/paper/props'
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
const PILLAR_FLAGS: Accent[] = ['tangerine', 'sky', 'teal', 'grass', 'lemon', 'bubblegum']

export default function HomePage() {
  return (
    <SiteShell>
      {/* 01 / HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 pt-7 pb-8 sm:px-6 sm:pt-12 sm:pb-12 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
          <Paper
            stock="paper"
            tape="both"
            tapeKind="masking"
            tilt={false}
            seed="home-hero-sheet"
            className="px-6 py-8 sm:px-9 sm:py-11"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <InkBadge variant="outline" size="sm" seed="home-eyebrow-badge">
                {HERO_CONTENT.eyebrow}
              </InkBadge>
              <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                <MapPin size={13} aria-hidden="true" />
                {HERO_CONTENT.location}
              </span>
            </div>

            <h1 className="mt-6 break-words font-sans text-[clamp(1.75rem,4.7vw,3.7rem)] font-bold leading-[1.06] tracking-tight text-[var(--ll-ink)]">
              <Annotate type="underline" kind="single" tone="marker" seed="hero-headline-mark">
                {HERO_CONTENT.headline}
              </Annotate>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[var(--ll-ink)] sm:text-xl">
              {HERO_CONTENT.subheadline}
            </p>

            <div className="mt-4 max-w-2xl space-y-3 text-base leading-7 text-[var(--ll-ink-soft)]">
              <p>{HERO_CONTENT.bodyPrimary}</p>
              <p>{HERO_CONTENT.bodySecondary}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <InkButton
                href={HERO_CONTENT.primaryCta.href}
                variant="default"
                size="lg"
                seed="hero-cta-primary"
              >
                {HERO_CONTENT.primaryCta.label}
                <ArrowRight size={16} aria-hidden="true" />
              </InkButton>
              <InkButton
                href={HERO_CONTENT.secondaryCta.href}
                variant="outline"
                size="lg"
                seed="hero-cta-secondary"
              >
                {HERO_CONTENT.secondaryCta.label}
              </InkButton>
            </div>

            <InkRule variant="dashed" seed="hero-focus-rule" className="my-7" />

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
                Practice Focus
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {HERO_CONTENT.focusAreas.map(area => (
                  <li key={area} className="max-w-full">
                    <InkBadge variant="outline" size="sm" seed={`hero-focus-${area}`}>
                      {area}
                    </InkBadge>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <div className="flex flex-col gap-6 lg:pt-1">
            <Paper
              stock="photo"
              rules="none"
              tape="corner"
              tapeKind="masking"
              tilt={false}
              seed="home-portrait-card"
              className="p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <div className="relative mx-auto aspect-[682/885] w-[148px] shrink-0 overflow-hidden rounded-sm border border-[var(--ll-pencil-mark)]/35 bg-[radial-gradient(circle_at_50%_35%,var(--ll-paper)_0%,var(--ll-paper-shade)_100%)] sm:mx-0 dark:bg-[radial-gradient(circle_at_50%_35%,#2b323e_0%,#181c23_100%)]">
                  <Image
                    src="/images/vishnu-portrait.png"
                    alt="Portrait of Vishnuraj Vishwakarma, AI, Business & Technology Consultant"
                    width={682}
                    height={885}
                    priority
                    sizes="(max-width: 640px) 148px, 148px"
                    className="h-full w-full object-contain object-bottom pt-2"
                  />
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                    Principal Consultant · Mumbai
                  </p>
                  <p className="mt-1 font-script text-2xl font-bold leading-snug text-[var(--ll-ink)]">
                    {BRAND.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--ll-ink-soft)]">
                    {BRAND.role}
                  </p>
                  <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                    <InkBadge variant="outline" size="sm" seed="home-portrait-bsc">
                      B.Sc. IT
                    </InkBadge>
                    <InkBadge variant="outline" size="sm" seed="home-portrait-pgdm">
                      PGDM (Pursuing)
                    </InkBadge>
                  </div>
                  <div className="mt-3">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[var(--ll-link)] underline-offset-4 hover:underline"
                    >
                      Background &amp; Credentials
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </Paper>

            <SystemsTopologyVisual />
          </div>
        </div>
      </section>

      {/* 02 / WHAT I DO — CONSULTING SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="slip"
          tape="corner"
          tapeKind="masking"
          tilt={false}
          seed="home-services-header"
          className="px-6 py-8 sm:px-9"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              number={WHAT_I_DO_CONTENT.sectionNumber}
              eyebrow={WHAT_I_DO_CONTENT.eyebrow}
              title={WHAT_I_DO_CONTENT.title}
              lead={WHAT_I_DO_CONTENT.lead}
              description={WHAT_I_DO_CONTENT.intro}
            />
            <InkButton
              href="/services"
              variant="outline"
              size="default"
              seed="home-all-services-btn"
              className="self-start lg:self-end"
            >
              Explore Consulting Services
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </div>
        </Paper>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_I_DO_CONTENT.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index % PILLAR_ICONS.length]
            return (
              <Reveal key={pillar.id} delay={index * 0.04}>
                <IndexCard
                  flag={PILLAR_FLAGS[index % PILLAR_FLAGS.length]}
                  tilt={false}
                  seed={`home-pillar-${pillar.id}`}
                  className="h-full"
                >
                  <IndexCardHeader>
                    <span className="font-mono text-xs font-bold tracking-[0.16em] text-[var(--ll-orange-text)]">
                      {pillar.number}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded border border-[var(--ll-pencil-mark)] bg-[var(--ll-slip)] text-[var(--ll-ink-you)]">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </IndexCardHeader>

                  <IndexCardContent>
                    <IndexCardTitle className="font-sans text-lg font-bold tracking-tight">
                      {pillar.title}
                    </IndexCardTitle>
                    <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                      {pillar.description}
                    </p>
                  </IndexCardContent>

                  <IndexCardFooter className="border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-3.5">
                    <Link
                      href={`/services#${pillar.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ll-link)] underline-offset-4 hover:underline"
                    >
                      See scope &amp; outcomes
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </IndexCardFooter>
                </IndexCard>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 03 / MY APPROACH */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          fastener="clip"
          tilt={false}
          seed="home-approach-sheet"
          className="px-6 py-9 sm:px-10 sm:py-12"
        >
          <SectionHeading
            number={APPROACH_CONTENT.sectionNumber}
            eyebrow={APPROACH_CONTENT.eyebrow}
            title={APPROACH_CONTENT.title}
            description={APPROACH_CONTENT.intro}
          />

          <div className="mt-9">
            <ApproachTimeline />
          </div>

          <StickyNote
            color="yellow"
            tape="corner"
            tilt={false}
            seed="home-approach-closing-sticky"
            className="mt-8 p-5 sm:p-6"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <StickyNoteContent className="max-w-3xl text-sm font-medium leading-6 sm:text-base">
                {APPROACH_CONTENT.closing}
              </StickyNoteContent>
              <InkButton
                href="/contact"
                variant="default"
                size="sm"
                seed="home-approach-cta"
                className="shrink-0"
              >
                Start With Discovery
                <ArrowRight size={14} aria-hidden="true" />
              </InkButton>
            </div>
          </StickyNote>
        </Paper>
      </section>

      {/* 04 / SELECTED PROJECTS & INITIATIVES */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="slip"
          tape="top"
          tapeKind="masking"
          tilt={false}
          seed="home-work-header"
          className="px-6 py-8 sm:px-9"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              number={PROJECTS_CONTENT.sectionNumber}
              eyebrow={PROJECTS_CONTENT.eyebrow}
              title={PROJECTS_CONTENT.title}
              description={PROJECTS_CONTENT.intro}
            />
            <InkButton
              href="/work"
              variant="outline"
              size="default"
              seed="home-all-work-btn"
              className="self-start lg:self-end"
            >
              All Work &amp; Case Studies
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </div>
        </Paper>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {PROJECTS_CONTENT.initiatives.map((item, idx) => (
            <Reveal key={item.slug} delay={idx * 0.05}>
              <Paper
                stock="paper"
                tilt={false}
                seed={`home-init-${item.slug}`}
                className="flex h-full flex-col p-5 sm:p-6"
              >
                <div className="grid flex-1 gap-5 sm:grid-cols-[0.82fr_1.18fr]">
                  <div>
                    <InitiativeCover slug={item.slug} category={item.category} />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                        {item.number} · {item.category}
                      </span>
                      <h3 className="mt-2.5 font-sans text-xl font-bold leading-snug tracking-tight text-[var(--ll-ink)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium text-[var(--ll-ink)]">
                        {item.subtitle}
                      </p>
                      <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                        {item.summary}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {item.focusAreas.map(tag => (
                          <li key={tag} className="max-w-full">
                            <InkBadge
                              variant="outline"
                              size="sm"
                              seed={`home-tag-${item.slug}-${tag}`}
                            >
                              {tag}
                            </InkBadge>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-4">
                      <Link
                        href={`/work/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans text-sm font-bold text-[var(--ll-link)] underline-offset-4 hover:underline"
                      >
                        Read Case Overview
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ll-pencil-text)]">
                        {item.statusLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </Paper>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 / 06 / 07 — INTERDISCIPLINARY PERSPECTIVE & EXPERTISE SNAPSHOT */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Paper
            stock="paper"
            tape="corner"
            tapeKind="masking"
            tilt={false}
            seed="home-perspective-sheet"
            className="flex flex-col justify-between p-6 sm:p-9"
          >
            <div>
              <SectionHeading
                number={ABOUT_CONTENT.sectionNumber}
                eyebrow="Consulting Perspective"
                title={ABOUT_CONTENT.title}
                description={ABOUT_CONTENT.paragraphs[1]}
              />
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--ll-ink-soft)]">
                <p>{ABOUT_CONTENT.paragraphs[2]}</p>
                <p>{ABOUT_CONTENT.paragraphs[3]}</p>
              </div>

              <Paper
                stock="ledger"
                rules="ledger"
                fastener="clip"
                tilt={false}
                seed="home-finance-slip"
                className="mt-7 p-5"
              >
                <div className="flex items-center gap-2.5 text-[var(--ll-ink-you)]">
                  <LineChart size={18} aria-hidden="true" />
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.16em]">
                    {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
                  </p>
                </div>
                <h3 className="mt-2.5 font-sans text-lg font-bold text-[var(--ll-ink)]">
                  {FINANCE_STRATEGY_CONTENT.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">
                  {FINANCE_STRATEGY_CONTENT.lead} {FINANCE_STRATEGY_CONTENT.paragraphs[0]}
                </p>
              </Paper>
            </div>

            <div className="mt-7">
              <InkButton href="/about" variant="outline" size="default" seed="home-about-btn">
                About Vishnuraj, Credentials &amp; Experience
                <ArrowRight size={15} aria-hidden="true" />
              </InkButton>
            </div>
          </Paper>

          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERTISE_CONTENT.domains.map((domain, idx) => (
              <IndexCard
                key={domain.id}
                flag={PILLAR_FLAGS[idx % PILLAR_FLAGS.length]}
                tilt={false}
                seed={`home-domain-${domain.id}`}
              >
                <IndexCardHeader>
                  <span className="font-mono text-[11px] font-bold text-[var(--ll-ink-you)]">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                    Capability
                  </span>
                </IndexCardHeader>
                <IndexCardContent>
                  <IndexCardTitle className="font-sans text-base font-bold uppercase tracking-[0.04em]">
                    {domain.title}
                  </IndexCardTitle>
                  <ul className="mt-3 space-y-1.5 text-sm text-[var(--ll-ink-soft)]">
                    {domain.capabilities.map(cap => (
                      <li key={cap} className="flex items-start gap-2">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-ink-you)]"
                          aria-hidden="true"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </IndexCardContent>
              </IndexCard>
            ))}
          </div>
        </div>
      </section>

      {/* 10 & 08 — EXPERIENCE & VERIFIED EVIDENCE */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Paper
            stock="paper"
            tilt={false}
            seed="home-experience-sheet"
            className="p-6 sm:p-9"
          >
            <SectionHeading
              number={EXPERIENCE_CONTENT.sectionNumber}
              eyebrow={EXPERIENCE_CONTENT.eyebrow}
              title={EXPERIENCE_CONTENT.title}
            />
            <div className="mt-8 divide-y divide-dashed divide-[var(--ll-pencil-mark)]/45 border-y border-dashed border-[var(--ll-pencil-mark)]/45">
              {EXPERIENCE_CONTENT.roles.map((item, idx) => (
                <article
                  key={item.id}
                  className="grid gap-3 py-5 sm:grid-cols-[44px_1fr_auto] sm:items-start"
                >
                  <span className="font-mono text-xs font-bold text-[var(--ll-orange-text)]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-bold text-[var(--ll-ink)]">
                      {item.organization}
                    </h3>
                    <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--ll-ink-you)]">
                      {item.role}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">
                      {item.description}
                    </p>
                  </div>
                  {item.externalUrl && (
                    <InkButton
                      href={item.externalUrl}
                      external
                      variant="outline"
                      size="icon-sm"
                      seed={`home-exp-ext-${item.id}`}
                      aria-label={`External reference for ${item.organization}`}
                    >
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </InkButton>
                  )}
                </article>
              ))}
            </div>
          </Paper>

          <Paper
            stock="pad"
            rules="pad"
            tape="corner"
            tapeKind="masking"
            tilt={false}
            seed="home-proof-pad"
            className="flex flex-col justify-between p-6 sm:p-8"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[var(--ll-ink-you)]">
                <ShieldCheck size={18} aria-hidden="true" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em]">
                  {PROOF_CONTENT.sectionNumber} / {PROOF_CONTENT.eyebrow}
                </p>
              </div>
              <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)]">
                {PROOF_CONTENT.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                {PROOF_CONTENT.intro}
              </p>

              <InkRule variant="dashed" seed="home-proof-rule" className="my-5" />

              <ul className="space-y-3">
                {PROOF_CONTENT.evidenceCategories.slice(0, 4).map(cat => (
                  <li key={cat.title}>
                    <Link
                      href={cat.href}
                      className="group flex items-start justify-between gap-3 rounded-md p-2 -mx-2 transition-colors hover:bg-[var(--ll-paper)]/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                    >
                      <div>
                        <p className="font-sans text-sm font-bold text-[var(--ll-ink)] group-hover:text-[var(--ll-link)]">
                          {cat.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ll-pencil-text)]">
                          {cat.status}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--ll-pencil-text)] group-hover:text-[var(--ll-link)]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-4 text-xs italic leading-5 text-[var(--ll-ink-soft)]">
              &ldquo;{PROOF_CONTENT.closingQuote}&rdquo;
            </p>
          </Paper>
        </div>
      </section>

      {/* 12 / FINAL EXECUTIVE CONTACT CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          fastener="clip"
          tilt={false}
          seed="home-final-cta-sheet"
          className="p-7 sm:p-11 lg:p-14"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
                {CONTACT_CONTENT.sectionNumber} / {CONTACT_CONTENT.eyebrow}
              </p>
              <h2 className="mt-3 break-words font-sans text-[clamp(1.65rem,4vw,2.9rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
                <Annotate type="highlight" tone="yellow" seed="home-cta-highlight">
                  {CONTACT_CONTENT.title}
                </Annotate>
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium text-[var(--ll-ink)] sm:text-lg">
                {CONTACT_CONTENT.lead}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ll-ink-soft)] sm:text-base">
                {CONTACT_CONTENT.paragraphs[0]}
              </p>
            </div>

            <div className="flex flex-col gap-3.5 lg:items-end">
              <InkButton
                href="/contact"
                variant="default"
                size="lg"
                seed="home-final-primary-cta"
                className="w-full lg:w-auto"
              >
                {CONTACT_CONTENT.primaryCta}
                <ArrowRight size={16} aria-hidden="true" />
              </InkButton>
              <div className="flex w-full flex-wrap gap-3 lg:w-auto lg:justify-end">
                <InkButton
                  href={`mailto:${BRAND.email}`}
                  variant="outline"
                  size="default"
                  seed="home-final-email-cta"
                  className="flex-1 lg:flex-initial"
                >
                  <Mail size={15} aria-hidden="true" />
                  Email Directly
                </InkButton>
                <InkButton
                  href={BRAND.linkedinUrl}
                  external
                  variant="outline"
                  size="default"
                  seed="home-final-linkedin-cta"
                  className="flex-1 lg:flex-initial"
                >
                  {CONTACT_CONTENT.secondaryCta}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </InkButton>
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </SiteShell>
  )
}
