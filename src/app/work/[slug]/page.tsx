import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { InitiativeCover } from '@/components/consulting/InitiativeCover'
import { PROJECTS_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'
import type { Project } from '@/types'

export const dynamicParams = true

function findCanonicalInitiative(slug: string) {
  return PROJECTS_CONTENT.initiatives.find(
    item => item.slug === slug.toLowerCase()
  )
}

async function getCmsProject(slug: string): Promise<Project | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return null
  try {
    const isUuid = /^[0-9a-f-]{30,}$/i.test(slug)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq(isUuid ? 'id' : 'slug', slug)
      .single()
    if (error || !data || data.visible === false) return null
    return data as Project
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return PROJECTS_CONTENT.initiatives.map(item => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const initiative = findCanonicalInitiative(slug)
  if (initiative) {
    return {
      title: `${initiative.title}`,
      description: `${initiative.subtitle} ${initiative.summary}`,
      alternates: { canonical: `/work/${initiative.slug}` },
    }
  }

  const cms = await getCmsProject(slug)
  if (!cms) return {}

  return {
    title: cms.title,
    description: cms.summary || cms.description,
    alternates: { canonical: `/work/${cms.slug || cms.id}` },
    openGraph: {
      title: cms.title,
      description: cms.summary || cms.description,
      images: cms.imageUrl ? [cms.imageUrl] : undefined,
    },
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const initiative = findCanonicalInitiative(slug)

  if (initiative) {
    const currentIndex = PROJECTS_CONTENT.initiatives.findIndex(
      item => item.slug === initiative.slug
    )
    const nextInitiative =
      PROJECTS_CONTENT.initiatives[
        (currentIndex + 1) % PROJECTS_CONTENT.initiatives.length
      ]

    return (
      <SiteShell>
        <section className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Back to Work & Initiatives
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                {initiative.number} · {initiative.category}
              </span>
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-[11px] text-[var(--text-secondary)]">
                {initiative.statusLabel}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
              {initiative.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl font-medium text-[var(--text-primary)]">
              {initiative.subtitle}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
              {initiative.summary} {initiative.objective}
            </p>

            <div className="mt-8 grid gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Role & Context
                </p>
                <p className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                  {initiative.roleContext}
                </p>
              </div>
              <div className="sm:col-span-1 lg:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Focus Areas
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {initiative.focusAreas.map(focus => (
                    <li
                      key={focus}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                    >
                      {focus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(initiative.externalUrl || initiative.secondaryUrl) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {initiative.externalUrl && (
                  <a
                    href={initiative.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
                  >
                    {initiative.externalLabel || 'Official Reference'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
                {initiative.secondaryUrl && (
                  <a
                    href={initiative.secondaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
                  >
                    {initiative.secondaryLabel || 'Open Platform'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
            {initiative.confidentialityNote && (
              <div className="mb-8 flex items-start gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">
                <Lock size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--accent-warm)]" />
                <p>{initiative.confidentialityNote}</p>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]">
                <InitiativeCover slug={initiative.slug} category={initiative.category} />
              </div>

              <div className="space-y-6">
                <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                    01 / Challenge & Business Context
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                    {initiative.caseStudy.contextAndChallenge}
                  </p>
                </article>

                <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                    02 / Approach
                  </h2>
                  <ul className="mt-3.5 space-y-2.5 text-base leading-7 text-[var(--text-secondary)]">
                    {initiative.caseStudy.consultingApproach.map(step => (
                      <li key={step} className="flex items-start gap-2.5">
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]"
                          aria-hidden="true"
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                    03 / Solution Architecture
                  </h2>
                  <ul className="mt-3.5 space-y-2.5 text-base leading-7 text-[var(--text-secondary)]">
                    {initiative.caseStudy.systemArchitecture.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7">
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                    04 / Key Learnings & Direction
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                    {initiative.caseStudy.keyLearningsAndDirection}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8 lg:px-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Next Initiative
              </p>
              <Link
                href={`/work/${nextInitiative.slug}`}
                className="focus-ring mt-1 inline-flex items-center gap-2 rounded text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
              >
                {nextInitiative.title}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <Link
              href="/contact"
              className="focus-ring inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-colors hover:bg-[var(--accent-primary-hover)]"
            >
              Discuss a Related Challenge
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </SiteShell>
    )
  }

  // Fallback to dynamic CMS project from Supabase
  const cms = await getCmsProject(slug)
  if (!cms) notFound()

  const blocks = [
    ['Problem', cms.problem],
    ['Objective', cms.objective],
    ['Role', cms.role],
    ['Approach', cms.approach],
    ['Business Impact', cms.businessImpact],
    ['Evidence & Results', cms.results],
  ].filter(([, value]) => Boolean(value))

  return (
    <SiteShell>
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <Link
            href="/work"
            className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Work & Initiatives
          </Link>

          <p className="mt-8 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {cms.category || 'Case Study'}
          </p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {cms.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {cms.summary || cms.description}
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)]/50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
          {cms.imageUrl && (
            <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]">
              <Image
                src={cms.imageUrl}
                alt={cms.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {blocks.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {blocks.map(([label, value]) => (
                <article
                  key={label}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6"
                >
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                    {label}
                  </h2>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--text-secondary)]">
                    {value}
                  </p>
                </article>
              ))}
            </div>
          )}

          {cms.stack?.length > 0 && (
            <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                Technology & Capabilities
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cms.stack.map(tool => (
                  <li
                    key={tool}
                    className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  )
}

