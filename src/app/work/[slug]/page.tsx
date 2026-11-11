import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { InitiativeCover } from '@/components/consulting/InitiativeCover'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { StickyNote, StickyNoteContent } from '@/components/looseleaf/StickyNote'
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
        {/* Case Hero Sheet */}
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
          <Paper
            stock="paper"
            tape="both"
            tapeKind="masking"
            fastener="clip"
            tilt={false}
            seed={`case-hero-${initiative.slug}`}
            className="px-6 py-9 sm:px-10 sm:py-12"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to Work &amp; Initiatives
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                {initiative.number} · {initiative.category}
              </span>
              <InkBadge variant="outline" size="sm" seed={`case-status-${initiative.slug}`}>
                {initiative.statusLabel}
              </InkBadge>
            </div>

            <h1 className="mt-4 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.4vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
              {initiative.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl font-medium text-[var(--ll-ink)]">
              {initiative.subtitle}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ll-ink-soft)]">
              {initiative.summary} {initiative.objective}
            </p>

            <InkRule variant="dashed" seed={`case-meta-rule-${initiative.slug}`} className="my-7" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                  Role &amp; Context
                </p>
                <p className="mt-1.5 text-sm font-bold text-[var(--ll-ink)]">
                  {initiative.roleContext}
                </p>
              </div>
              <div className="lg:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                  Focus Areas
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {initiative.focusAreas.map(focus => (
                    <li key={focus} className="max-w-full">
                      <InkBadge
                        variant="outline"
                        size="sm"
                        seed={`case-focus-${initiative.slug}-${focus}`}
                      >
                        {focus}
                      </InkBadge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(initiative.externalUrl || initiative.secondaryUrl) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {initiative.externalUrl && (
                  <InkButton
                    href={initiative.externalUrl}
                    external
                    variant="default"
                    size="default"
                    seed={`case-ext1-${initiative.slug}`}
                  >
                    {initiative.externalLabel || 'Official Reference'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </InkButton>
                )}
                {initiative.secondaryUrl && (
                  <InkButton
                    href={initiative.secondaryUrl}
                    external
                    variant="outline"
                    size="default"
                    seed={`case-ext2-${initiative.slug}`}
                  >
                    {initiative.secondaryLabel || 'Open Platform'}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </InkButton>
                )}
              </div>
            )}
          </Paper>
        </section>

        {/* Case Details Grid */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          {initiative.confidentialityNote && (
            <StickyNote
              color="blue"
              tilt={false}
              seed={`case-conf-${initiative.slug}`}
              className="mb-8"
            >
              <StickyNoteContent className="flex items-start gap-3 text-sm leading-6">
                <Lock size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                <p>{initiative.confidentialityNote}</p>
              </StickyNoteContent>
            </StickyNote>
          )}

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <InitiativeCover slug={initiative.slug} category={initiative.category} />
            </div>

            <div className="space-y-6">
              <Paper stock="paper" tilt={false} seed={`case-s1-${initiative.slug}`} className="p-6 sm:p-7">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                  01 / Challenge &amp; Business Context
                </h2>
                <p className="mt-3 text-base leading-7 text-[var(--ll-ink-soft)]">
                  {initiative.caseStudy.contextAndChallenge}
                </p>
              </Paper>

              <Paper stock="index-card" rules="index" tilt={false} seed={`case-s2-${initiative.slug}`} className="p-6 sm:p-7">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                  02 / Approach
                </h2>
                <ul className="mt-3.5 space-y-2.5 text-base leading-7 text-[var(--ll-ink-soft)]">
                  {initiative.caseStudy.consultingApproach.map(step => (
                    <li key={step} className="flex items-start gap-2.5">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-ink-you)]"
                        aria-hidden="true"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </Paper>

              <Paper stock="graph" rules="graph" tilt={false} seed={`case-s3-${initiative.slug}`} className="p-6 sm:p-7">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                  03 / Solution Architecture
                </h2>
                <ul className="mt-3.5 space-y-2.5 text-base leading-7 text-[var(--ll-ink-soft)]">
                  {initiative.caseStudy.systemArchitecture.map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-orange-text)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Paper>

              <Paper stock="slip" tilt={false} seed={`case-s4-${initiative.slug}`} className="p-6 sm:p-7">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                  04 / Key Learnings &amp; Direction
                </h2>
                <p className="mt-3 text-base leading-7 text-[var(--ll-ink-soft)]">
                  {initiative.caseStudy.keyLearningsAndDirection}
                </p>
              </Paper>
            </div>
          </div>
        </section>

        {/* Next Initiative Bar */}
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
          <Paper
            stock="paper"
            tape="corner"
            tilt={false}
            seed={`case-next-${initiative.slug}`}
            className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
                Next Initiative
              </p>
              <Link
                href={`/work/${nextInitiative.slug}`}
                className="mt-1 inline-flex items-center gap-2 font-sans text-lg font-bold text-[var(--ll-ink)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
              >
                {nextInitiative.title}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <InkButton
              href="/contact"
              variant="default"
              size="default"
              seed={`case-cta-${initiative.slug}`}
            >
              Discuss a Related Challenge
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </Paper>
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
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper stock="paper" tape="both" tilt={false} seed={`cms-case-hero-${cms.id}`} className="px-6 py-10 sm:px-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Work &amp; Initiatives
          </Link>

          <p className="mt-7 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
            {cms.category || 'Case Study'}
          </p>
          <h1 className="mt-3 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.4vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            {cms.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
            {cms.summary || cms.description}
          </p>
        </Paper>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {cms.imageUrl && (
          <Paper stock="photo" tape="corner" tilt={false} seed={`cms-photo-${cms.id}`} className="mb-10 p-3">
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src={cms.imageUrl}
                alt={cms.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Paper>
        )}

        {blocks.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map(([label, value]) => (
              <Paper
                key={label}
                stock="paper"
                tilt={false}
                seed={`cms-block-${cms.id}-${label}`}
                className="p-6"
              >
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                  {label}
                </h2>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--ll-ink-soft)]">
                  {value}
                </p>
              </Paper>
            ))}
          </div>
        )}

        {cms.stack?.length > 0 && (
          <Paper stock="slip" tilt={false} seed={`cms-stack-${cms.id}`} className="mt-8 p-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
              Technology &amp; Capabilities
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cms.stack.map(tool => (
                <li key={tool}>
                  <InkBadge variant="outline" size="sm" seed={`cms-tool-${cms.id}-${tool}`}>
                    {tool}
                  </InkBadge>
                </li>
              ))}
            </ul>
          </Paper>
        )}
      </section>
    </SiteShell>
  )
}
