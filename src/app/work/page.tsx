import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { InitiativeCover } from '@/components/consulting/InitiativeCover'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import { StickyNote, StickyNoteContent } from '@/components/looseleaf/StickyNote'
import { PROJECTS_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Selected Projects & Initiatives',
  description:
    'Case overviews across Business Intelligence & Decision Systems, Zaprill, Austrange Solutions, and CIEL.',
  alternates: { canonical: '/work' },
}

async function getAdditionalCmsProjects(): Promise<Project[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return []
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('visible', true)
      .order('order')
    if (error || !data) return []
    const canonicalSlugs = new Set<string>(
      PROJECTS_CONTENT.initiatives.map(item => item.slug)
    )
    return (data as Project[]).filter(
      proj => !canonicalSlugs.has((proj.slug || proj.id).toLowerCase())
    )
  } catch {
    return []
  }
}

export default async function WorkPage() {
  const additionalProjects = await getAdditionalCmsProjects()

  return (
    <SiteShell>
      {/* Intro Sheet */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="work-hero-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--ll-pencil-text)]">
            <Link href="/" className="hover:text-[var(--ll-ink)] hover:underline underline-offset-4">
              Home
            </Link>{' '}
            / <span className="font-medium text-[var(--ll-ink)]">Work &amp; Initiatives</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
            {PROJECTS_CONTENT.sectionNumber} / {PROJECTS_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            <Annotate type="highlight" tone="yellow" seed="work-h1-mark">
              {PROJECTS_CONTENT.title}
            </Annotate>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
            {PROJECTS_CONTENT.intro}
          </p>
        </Paper>
      </section>

      {/* Initiatives Stack */}
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {PROJECTS_CONTENT.initiatives.map(item => (
          <article key={item.slug}>
            <Paper
              stock="paper"
              tilt={false}
              seed={`work-card-${item.slug}`}
              className="p-5 sm:p-7 lg:p-9"
            >
              <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
                <div>
                  <InitiativeCover slug={item.slug} category={item.category} />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                        {item.number} · {item.category}
                      </span>
                      <InkBadge variant="outline" size="sm" seed={`work-status-${item.slug}`}>
                        {item.statusLabel}
                      </InkBadge>
                    </div>

                    <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)] sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-base font-medium text-[var(--ll-ink)]">
                      {item.subtitle}
                    </p>

                    <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--ll-ink-soft)] sm:text-base">
                      <p>{item.summary}</p>
                      <p>{item.objective}</p>
                    </div>

                    {item.confidentialityNote && (
                      <StickyNote
                        color="blue"
                        tilt={false}
                        seed={`work-conf-${item.slug}`}
                        className="mt-5"
                      >
                        <StickyNoteContent className="flex items-start gap-2.5 text-xs leading-5">
                          <Lock size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                          <span>{item.confidentialityNote}</span>
                        </StickyNoteContent>
                      </StickyNote>
                    )}

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.focusAreas.map(focus => (
                        <li key={focus} className="max-w-full">
                          <InkBadge
                            variant="outline"
                            size="sm"
                            seed={`work-focus-${item.slug}-${focus}`}
                          >
                            {focus}
                          </InkBadge>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <InkRule variant="dashed" seed={`work-footer-rule-${item.slug}`} className="mb-5" />
                    <div className="flex flex-wrap items-center gap-3">
                      <InkButton
                        href={`/work/${item.slug}`}
                        variant="default"
                        size="default"
                        seed={`work-detail-btn-${item.slug}`}
                      >
                        Explore Case Details
                        <ArrowRight size={15} aria-hidden="true" />
                      </InkButton>

                      {item.externalUrl && (
                        <InkButton
                          href={item.externalUrl}
                          external
                          variant="outline"
                          size="default"
                          seed={`work-ext-btn-${item.slug}`}
                        >
                          {item.externalLabel || 'External Reference'}
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </InkButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </article>
        ))}
      </section>

      {additionalProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Paper stock="slip" tilt={false} seed="work-cms-additional" className="p-6 sm:p-8">
            <h2 className="font-sans text-xl font-bold tracking-tight text-[var(--ll-ink)]">
              Additional Published Systems &amp; Projects
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {additionalProjects.map(project => (
                <Paper
                  key={project.id}
                  stock="paper"
                  tilt={false}
                  seed={`cms-proj-${project.id}`}
                  className="flex flex-col justify-between p-5"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
                      {project.category || 'Systems Project'}
                    </p>
                    <h3 className="mt-2 font-sans text-lg font-bold text-[var(--ll-ink)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">
                      {project.summary || project.description}
                    </p>
                  </div>
                  <InkButton
                    href={`/work/${project.slug || project.id}`}
                    variant="link"
                    size="sm"
                    seed={`cms-proj-link-${project.id}`}
                    className="mt-4 justify-start px-0"
                  >
                    View Case Details
                    <ArrowRight size={14} aria-hidden="true" />
                  </InkButton>
                </Paper>
              ))}
            </div>
          </Paper>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Paper
          stock="index-card"
          rules="index"
          tape="corner"
          tilt={false}
          seed="work-bottom-cta"
          className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)]">
              Exploring a similar system or operational challenge?
            </h2>
            <p className="mt-2 text-sm text-[var(--ll-ink-soft)] sm:text-base">
              Let&apos;s discuss how practical architecture and business strategy apply to your context.
            </p>
          </div>
          <InkButton href="/contact" variant="default" size="default" seed="work-contact-btn">
            Discuss Your Business Challenge
            <ArrowRight size={16} aria-hidden="true" />
          </InkButton>
        </Paper>
      </section>
    </SiteShell>
  )
}
