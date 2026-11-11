import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, LineChart } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { SectionHeading } from '@/components/consulting/MotionPrimitives'
import { ApproachTimeline } from '@/components/consulting/ApproachTimeline'
import {
  APPROACH_CONTENT,
  FINANCE_STRATEGY_CONTENT,
  PROJECTS_CONTENT,
  WHAT_I_DO_CONTENT,
} from '@/lib/consulting-content'

export const metadata: Metadata = {
  title: 'Services — AI Adoption, Operations & Technology Strategy',
  description:
    'Advisory and implementation across AI adoption, business process optimization, digital transformation, business intelligence, technology strategy, and systems development.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  const initiativeMap = new Map(
    PROJECTS_CONTENT.initiatives.map(item => [item.slug, item])
  )

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="focus-ring rounded hover:text-[var(--text-primary)]">
              Home
            </Link>{' '}
            / <span className="text-[var(--text-primary)]">Services</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {WHAT_I_DO_CONTENT.sectionNumber} / {WHAT_I_DO_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {WHAT_I_DO_CONTENT.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-[var(--text-primary)] sm:text-xl">
            {WHAT_I_DO_CONTENT.lead}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
            {WHAT_I_DO_CONTENT.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {WHAT_I_DO_CONTENT.pillars.map(pillar => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="focus-ring rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {pillar.number}. {pillar.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Six Service Pillars */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          {WHAT_I_DO_CONTENT.pillars.map(pillar => (
            <article
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-24 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-[var(--accent-primary)]">
                      PILLAR {pillar.number}
                    </span>
                    <span className="text-[var(--border-strong)]">·</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {pillar.domains.join(' · ')}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
                    {pillar.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--accent-warm)]">
                      Engagement Approach
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {pillar.approachSummary}
                    </p>
                  </div>

                  {pillar.relatedWorkSlugs.length > 0 && (
                    <div className="mt-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Related Work & Initiatives
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2.5">
                        {pillar.relatedWorkSlugs.map(slug => {
                          const work = initiativeMap.get(slug)
                          if (!work) return null
                          return (
                            <Link
                              key={slug}
                              href={`/work/${slug}`}
                              className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                            >
                              {work.shortTitle}
                              <ArrowRight size={13} aria-hidden="true" />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)]">
                      Business Challenges Addressed
                    </h3>
                    <ul className="mt-3.5 space-y-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                      {pillar.problemsAddressed.map(problem => (
                        <li key={problem} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]"
                            aria-hidden="true"
                          />
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-primary)]">
                      Target Business Value (Illustrative Outcomes)
                    </h3>
                    <ul className="mt-3.5 space-y-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                      {pillar.potentialOutcomes.map(outcome => (
                        <li key={outcome} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={16}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-[var(--accent-primary)]"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <SectionHeading
            number={APPROACH_CONTENT.sectionNumber}
            eyebrow={APPROACH_CONTENT.eyebrow}
            title={APPROACH_CONTENT.title}
            description={APPROACH_CONTENT.intro}
          />
          <ApproachTimeline />
          <p className="mt-8 text-base font-medium text-[var(--text-primary)]">
            {APPROACH_CONTENT.closing}
          </p>
        </div>
      </section>

      {/* Finance & Strategy Commercial Lens + Discovery CTA */}
      <section className="bg-[var(--bg-secondary)]/50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                <LineChart size={18} aria-hidden="true" />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em]">
                  {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">
                {FINANCE_STRATEGY_CONTENT.title}
              </h2>
              <p className="mt-3 text-base font-medium text-[var(--text-primary)]">
                {FINANCE_STRATEGY_CONTENT.lead}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {FINANCE_STRATEGY_CONTENT.paragraphs[0]}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                Service Discovery
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                Not sure which capability fits your immediate bottleneck?
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                Start with a focused conversation around your current operations, workflows, and strategic priorities.
              </p>
              <Link
                href="/contact"
                className="focus-ring mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
              >
                Discuss Your Business Challenge
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

