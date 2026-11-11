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
import { Paper } from '@/components/looseleaf/Paper'
import {
  IndexCard,
  IndexCardContent,
  IndexCardHeader,
  IndexCardTitle,
} from '@/components/looseleaf/IndexCard'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import type { Accent } from '@/lib/ink/paper/props'
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

const DOMAIN_FLAGS: Accent[] = ['tangerine', 'sky', 'teal', 'grass', 'lemon', 'bubblegum']

export default function AboutPage() {
  return (
    <SiteShell>
      {/* 05 / ABOUT HERO & NARRATIVE */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper
          stock="paper"
          tape="top"
          tapeKind="masking"
          tilt={false}
          seed="about-narrative-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-[var(--ll-pencil-text)]">
            <Link href="/" className="hover:text-[var(--ll-ink)] hover:underline underline-offset-4">
              Home
            </Link>{' '}
            / <span className="font-medium text-[var(--ll-ink)]">About</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="lg:sticky lg:top-28">
              <Paper
                stock="photo"
                tape="corner"
                tapeKind="masking"
                tilt={-1}
                seed="about-portrait-frame"
                className="p-3 sm:p-4"
              >
                <div className="relative aspect-[682/885] w-full overflow-hidden rounded-sm border border-[var(--ll-pencil-mark)]/30 bg-[radial-gradient(circle_at_50%_35%,var(--ll-paper)_0%,var(--ll-paper-shade)_100%)] dark:bg-[radial-gradient(circle_at_50%_35%,#2b323e_0%,#181c23_100%)]">
                  <Image
                    src="/images/vishnu-portrait.png"
                    alt="Portrait of Vishnuraj Vishwakarma, AI, Business & Technology Consultant"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 34vw"
                    className="object-contain object-bottom pt-3"
                  />
                </div>
                <div className="pt-3.5 pb-1">
                  <p className="font-script text-xl font-bold leading-snug text-[var(--ll-ink)]">
                    {BRAND.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                    {BRAND.role}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--ll-pencil-text)]">
                    <MapPin size={13} aria-hidden="true" />
                    {BRAND.location}
                  </p>
                </div>
              </Paper>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <InkButton
                  href={`mailto:${BRAND.email}`}
                  variant="outline"
                  size="sm"
                  seed="about-email-btn"
                  className="flex-1"
                >
                  <Mail size={14} aria-hidden="true" />
                  Email
                </InkButton>
                <InkButton
                  href={BRAND.linkedinUrl}
                  external
                  variant="outline"
                  size="sm"
                  seed="about-linkedin-btn"
                  className="flex-1"
                >
                  LinkedIn
                  <ArrowUpRight size={14} aria-hidden="true" />
                </InkButton>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
                {ABOUT_CONTENT.sectionNumber} / {ABOUT_CONTENT.eyebrow}
              </p>
              <h1 className="mt-4 break-words font-sans text-[clamp(1.7rem,4.4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
                <Annotate type="underline" kind="single" tone="marker" seed="about-h1-mark">
                  {ABOUT_CONTENT.title}
                </Annotate>
              </h1>

              <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ll-ink-soft)] sm:text-[1.0625rem]">
                {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                  <p
                    key={paragraph}
                    className={
                      idx === 0 || idx === ABOUT_CONTENT.paragraphs.length - 1
                        ? 'font-medium text-[var(--ll-ink)]'
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <InkRule variant="dashed" seed="about-edu-rule" className="my-9" />

              {/* Academic Credentials */}
              <div id="education" className="scroll-mt-28">
                <div className="flex items-center gap-2 text-[var(--ll-ink-you)]">
                  <GraduationCap size={18} aria-hidden="true" />
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                    Academic Qualifications
                  </h2>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {ABOUT_CONTENT.education.map((edu, idx) => (
                    <IndexCard
                      key={edu.degree}
                      flag={idx === 0 ? 'sky' : 'tangerine'}
                      tilt={false}
                      seed={`about-edu-${edu.degree}`}
                      className="h-full"
                    >
                      <IndexCardHeader>
                        <InkBadge variant="outline" size="sm" seed={`edu-status-${idx}`}>
                          {edu.status}
                        </InkBadge>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                          Academic
                        </span>
                      </IndexCardHeader>
                      <IndexCardContent>
                        <IndexCardTitle className="font-sans text-base font-bold leading-snug">
                          {edu.degree}
                        </IndexCardTitle>
                        <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                          {edu.focus}
                        </p>
                      </IndexCardContent>
                    </IndexCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </section>

      {/* 06 / BUSINESS & TECHNOLOGY EXPERTISE */}
      <section id="expertise" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Paper stock="slip" tilt={false} seed="about-expertise-sheet" className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionHeading
            number={EXPERTISE_CONTENT.sectionNumber}
            eyebrow={EXPERTISE_CONTENT.eyebrow}
            title={EXPERTISE_CONTENT.title}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE_CONTENT.domains.map((domain, idx) => (
              <IndexCard
                key={domain.id}
                flag={DOMAIN_FLAGS[idx % DOMAIN_FLAGS.length]}
                tilt={false}
                seed={`about-domain-${domain.id}`}
              >
                <IndexCardHeader>
                  <span className="font-mono text-[11px] font-semibold text-[var(--ll-ink-you)]">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                    Domain
                  </span>
                </IndexCardHeader>
                <IndexCardContent>
                  <IndexCardTitle className="font-sans text-lg font-bold tracking-tight">
                    {domain.title}
                  </IndexCardTitle>
                  <ul className="mt-3.5 space-y-2 text-sm text-[var(--ll-ink-soft)]">
                    {domain.capabilities.map(capability => (
                      <li key={capability} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-ink-you)]"
                          aria-hidden="true"
                        />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </IndexCardContent>
              </IndexCard>
            ))}
          </div>
        </Paper>
      </section>

      {/* 07 / FINANCE & STRATEGY */}
      <section id="finance-strategy" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Paper
          stock="ledger"
          rules="ledger"
          tape="corner"
          tilt={false}
          seed="about-finance-ledger"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionHeading
                number={FINANCE_STRATEGY_CONTENT.sectionNumber}
                eyebrow={FINANCE_STRATEGY_CONTENT.eyebrow}
                title={FINANCE_STRATEGY_CONTENT.title}
                lead={FINANCE_STRATEGY_CONTENT.lead}
              />
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--ll-ink-soft)]">
                {FINANCE_STRATEGY_CONTENT.paragraphs.map(text => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>

            <Paper
              stock="paper"
              fastener="clip"
              tilt={false}
              seed="about-finance-focus-card"
              className="p-6 sm:p-7"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                Areas of Focus
              </p>
              <InkRule variant="dashed" seed="finance-focus-rule" className="my-4" />
              <ul className="space-y-3">
                {FINANCE_STRATEGY_CONTENT.areasOfFocus.map((area, idx) => (
                  <li
                    key={area}
                    className="flex items-center gap-4 border-b border-dashed border-[var(--ll-pencil-mark)]/40 pb-2.5 text-sm font-medium text-[var(--ll-ink)] last:border-none last:pb-0"
                  >
                    <span className="font-mono text-xs font-bold text-[var(--ll-orange-text)]">
                      0{idx + 1}
                    </span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </Paper>
          </div>
        </Paper>
      </section>

      {/* 10 / PROFESSIONAL EXPERIENCE */}
      <section id="experience" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Paper stock="paper" tilt={false} seed="about-experience-wrap" className="px-6 py-10 sm:px-10 sm:py-12">
          <SectionHeading
            number={EXPERIENCE_CONTENT.sectionNumber}
            eyebrow={EXPERIENCE_CONTENT.eyebrow}
            title={EXPERIENCE_CONTENT.title}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {EXPERIENCE_CONTENT.roles.map((role, idx) => (
              <Paper
                key={role.id}
                stock="slip"
                tilt={false}
                seed={`about-role-${role.id}`}
                className="flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-[var(--ll-pencil-text)]">
                      0{idx + 1}
                    </span>
                    {role.externalUrl && (
                      <InkButton
                        href={role.externalUrl}
                        external
                        variant="link"
                        size="xs"
                        seed={`role-ext-${role.id}`}
                        className="px-0"
                      >
                        Reference
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </InkButton>
                    )}
                  </div>
                  <h3 className="mt-2 font-sans text-xl font-bold tracking-tight text-[var(--ll-ink)]">
                    {role.organization}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                    {role.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--ll-ink-soft)]">
                    {role.description}
                  </p>
                </div>
                <div className="mt-5 border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-3.5">
                  <InkBadge variant="outline" size="sm" seed={`role-ctx-${role.id}`}>
                    {role.contextNote}
                  </InkBadge>
                </div>
              </Paper>
            ))}
          </div>
        </Paper>
      </section>

      {/* 08 & 11 / PROOF, RECOGNITION & CURRENT FOCUS */}
      <section id="proof" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <Paper stock="paper" tilt={false} seed="about-proof-sheet" className="p-6 sm:p-8">
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
                  className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                >
                  <Paper stock="slip" tilt={false} seed={`proof-item-${item.title}`} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-sans text-sm font-bold text-[var(--ll-ink)] group-hover:text-[var(--ll-link)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[var(--ll-ink-soft)]">
                          {item.detail}
                        </p>
                      </div>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[var(--ll-pencil-text)] group-hover:text-[var(--ll-link)]"
                      />
                    </div>
                  </Paper>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <InkButton
                href="/certificates"
                variant="outline"
                size="default"
                seed="about-certs-btn"
              >
                <Award size={15} aria-hidden="true" className="text-[var(--ll-ink-you)]" />
                Open Credentials Repository
              </InkButton>
            </div>
          </Paper>

          <Paper
            stock="pad"
            rules="pad"
            tape="top"
            tilt={false}
            seed="about-focus-pad"
            className="flex flex-col justify-between p-6 sm:p-8"
          >
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
                {CURRENT_FOCUS_CONTENT.sectionNumber} / {CURRENT_FOCUS_CONTENT.eyebrow}
              </p>
              <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)] sm:text-3xl">
                {CURRENT_FOCUS_CONTENT.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-7 text-[var(--ll-ink-soft)]">
                {CURRENT_FOCUS_CONTENT.paragraphs.map((p, idx) => (
                  <p
                    key={p}
                    className={
                      idx === CURRENT_FOCUS_CONTENT.paragraphs.length - 1
                        ? 'font-bold text-[var(--ll-ink)]'
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-[var(--ll-pencil-mark)]/50 pt-6">
              <InkButton
                href="/contact"
                variant="default"
                size="default"
                seed="about-focus-cta"
                className="w-full"
              >
                Discuss Your Business Challenge
                <ArrowRight size={16} aria-hidden="true" />
              </InkButton>
            </div>
          </Paper>
        </div>
      </section>
    </SiteShell>
  )
}
