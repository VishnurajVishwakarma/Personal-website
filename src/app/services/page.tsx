import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, LineChart } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { SectionHeading } from '@/components/consulting/MotionPrimitives'
import { ApproachTimeline } from '@/components/consulting/ApproachTimeline'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import { StickyNote, StickyNoteContent, StickyNoteTitle } from '@/components/looseleaf/StickyNote'
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
      {/* Hero Paper Sheet */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="services-hero-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--ll-pencil-text)]">
            <Link href="/" className="hover:text-[var(--ll-ink)] hover:underline underline-offset-4">
              Home
            </Link>{' '}
            / <span className="text-[var(--ll-ink)] font-medium">Services</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
            {WHAT_I_DO_CONTENT.sectionNumber} / {WHAT_I_DO_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            <Annotate type="underline" kind="single" tone="marker" seed="services-h1-mark">
              {WHAT_I_DO_CONTENT.title}
            </Annotate>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-[var(--ll-ink)] sm:text-xl">
            {WHAT_I_DO_CONTENT.lead}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ll-ink-soft)]">
            {WHAT_I_DO_CONTENT.intro}
          </p>

          <InkRule variant="dashed" seed="services-jump-rule" className="my-7" />

          <div className="flex flex-wrap gap-2.5">
            {WHAT_I_DO_CONTENT.pillars.map(pillar => (
              <InkButton
                key={pillar.id}
                href={`#${pillar.id}`}
                variant="outline"
                size="sm"
                seed={`jump-${pillar.id}`}
              >
                {pillar.number}. {pillar.title}
              </InkButton>
            ))}
          </div>
        </Paper>
      </section>

      {/* Six Service Pillars */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {WHAT_I_DO_CONTENT.pillars.map((pillar, idx) => (
          <article key={pillar.id} id={pillar.id} className="scroll-mt-28">
            <Paper
              stock={idx % 2 === 0 ? 'paper' : 'slip'}
              fastener={idx % 3 === 0 ? 'clip' : false}
              tape={idx % 3 !== 0 ? 'corner' : false}
              tapeKind="masking"
              tilt={false}
              seed={`pillar-sheet-${pillar.id}`}
              className="p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <InkBadge variant="outline" size="sm" seed={`pillar-num-${pillar.id}`}>
                      PILLAR {pillar.number}
                    </InkBadge>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                      {pillar.domains.join(' · ')}
                    </span>
                  </div>

                  <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)] sm:text-3xl">
                    {pillar.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-[var(--ll-ink-soft)]">
                    {pillar.description}
                  </p>

                  <StickyNote
                    color="yellow"
                    tilt={false}
                    seed={`pillar-approach-${pillar.id}`}
                    className="mt-6"
                  >
                    <StickyNoteTitle className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
                      Engagement Approach
                    </StickyNoteTitle>
                    <StickyNoteContent className="text-sm leading-6">
                      {pillar.approachSummary}
                    </StickyNoteContent>
                  </StickyNote>

                  {pillar.relatedWorkSlugs.length > 0 && (
                    <div className="mt-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                        Related Work &amp; Initiatives
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2.5">
                        {pillar.relatedWorkSlugs.map(slug => {
                          const work = initiativeMap.get(slug)
                          if (!work) return null
                          return (
                            <InkButton
                              key={slug}
                              href={`/work/${slug}`}
                              variant="outline"
                              size="sm"
                              seed={`pillar-work-${pillar.id}-${slug}`}
                            >
                              {work.shortTitle}
                              <ArrowRight size={13} aria-hidden="true" />
                            </InkButton>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <Paper
                    stock="pad"
                    rules="pad"
                    tilt={false}
                    seed={`pillar-problems-${pillar.id}`}
                    className="p-5 sm:p-6"
                  >
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ll-ink)]">
                      Business Challenges Addressed
                    </h3>
                    <ul className="mt-3.5 space-y-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                      {pillar.problemsAddressed.map(problem => (
                        <li key={problem} className="flex items-start gap-2.5">
                          <span
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-orange-text)]"
                            aria-hidden="true"
                          />
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </Paper>

                  <Paper
                    stock="index-card"
                    rules="index"
                    tilt={false}
                    seed={`pillar-outcomes-${pillar.id}`}
                    className="p-5 sm:p-6"
                  >
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ll-ink-you)]">
                      Target Business Value (Illustrative Outcomes)
                    </h3>
                    <ul className="mt-3.5 space-y-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                      {pillar.potentialOutcomes.map(outcome => (
                        <li key={outcome} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={16}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-[var(--ll-ink-you)]"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </Paper>
                </div>
              </div>
            </Paper>
          </article>
        ))}
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          tilt={false}
          seed="services-approach-wrap"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <SectionHeading
            number={APPROACH_CONTENT.sectionNumber}
            eyebrow={APPROACH_CONTENT.eyebrow}
            title={APPROACH_CONTENT.title}
            description={APPROACH_CONTENT.intro}
          />
          <div className="mt-8">
            <ApproachTimeline />
          </div>
          <p className="mt-8 font-sans text-base font-bold text-[var(--ll-ink)]">
            {APPROACH_CONTENT.closing}
          </p>
        </Paper>
      </section>

      {/* Finance & Strategy Commercial Lens + Discovery CTA */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <Paper
            stock="ledger"
            rules="ledger"
            tape="corner"
            tilt={false}
            seed="services-finance-lens"
            className="flex flex-col justify-center p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 text-[var(--ll-ink-you)]">
              <LineChart size={18} aria-hidden="true" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.18em]">
                {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
              </span>
            </div>
            <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)] sm:text-3xl">
              {FINANCE_STRATEGY_CONTENT.title}
            </h2>
            <p className="mt-3 text-base font-medium text-[var(--ll-ink)]">
              {FINANCE_STRATEGY_CONTENT.lead}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--ll-ink-soft)] sm:text-base">
              {FINANCE_STRATEGY_CONTENT.paragraphs[0]}
            </p>
          </Paper>

          <Paper
            stock="slip"
            fastener="clip"
            tilt={false}
            seed="services-discovery-cta-card"
            className="flex flex-col justify-between p-6 sm:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                Service Discovery
              </p>
              <h3 className="mt-2 font-sans text-xl font-bold text-[var(--ll-ink)]">
                Not sure which capability fits your immediate bottleneck?
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ll-ink-soft)]">
                Start with a focused conversation around your current operations, workflows, and strategic priorities.
              </p>
            </div>
            <InkButton
              href="/contact"
              variant="default"
              size="default"
              seed="services-discovery-cta-btn"
              className="mt-6 w-full"
            >
              Discuss Your Business Challenge
              <ArrowRight size={16} aria-hidden="true" />
            </InkButton>
          </Paper>
        </div>
      </section>
    </SiteShell>
  )
}
