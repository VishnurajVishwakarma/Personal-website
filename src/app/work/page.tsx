import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { InitiativeCover } from '@/components/consulting/InitiativeCover'
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
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="focus-ring rounded hover:text-[var(--text-primary)]">
              Home
            </Link>{' '}
            / <span className="text-[var(--text-primary)]">Work & Initiatives</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {PROJECTS_CONTENT.sectionNumber} / {PROJECTS_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {PROJECTS_CONTENT.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {PROJECTS_CONTENT.intro}
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          {PROJECTS_CONTENT.initiatives.map(item => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]"
            >
              <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
                <div className="border-b border-[var(--border-subtle)] lg:border-b-0 lg:border-r">
                  <InitiativeCover slug={item.slug} category={item.category} />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                        {item.number} · {item.category}
                      </span>
                      <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]">
                        {item.statusLabel}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)] sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-base font-medium text-[var(--text-primary)]">
                      {item.subtitle}
                    </p>

                    <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                      <p>{item.summary}</p>
                      <p>{item.objective}</p>
                    </div>

                    {item.confidentialityNote && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-3.5 text-xs leading-5 text-[var(--text-muted)]">
                        <Lock size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>{item.confidentialityNote}</span>
                      </div>
                    )}

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.focusAreas.map(focus => (
                        <li
                          key={focus}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                        >
                          {focus}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
                    <Link
                      href={`/work/${item.slug}`}
                      className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
                    >
                      Explore Case Details
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>

                    {item.externalUrl && (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                      >
                        {item.externalLabel || 'External Reference'}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {additionalProjects.length > 0 && (
        <section className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              Additional Published Systems & Projects
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {additionalProjects.map(project => (
                <article
                  key={project.id}
                  className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                      {project.category || 'Systems Project'}
                    </p>
                    <h3 className="mt-2.5 text-lg font-semibold text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                      {project.summary || project.description}
                    </p>
                  </div>
                  <Link
                    href={`/work/${project.slug || project.id}`}
                    className="focus-ring mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-primary)] hover:underline"
                  >
                    View Case Details
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-16 sm:flex-row sm:items-center sm:px-8 lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              Exploring a similar system or operational challenge?
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">
              Let&apos;s discuss how practical architecture and business strategy apply to your context.
            </p>
          </div>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
          >
            Discuss Your Business Challenge
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}

