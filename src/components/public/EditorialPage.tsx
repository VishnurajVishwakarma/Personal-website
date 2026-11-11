import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import { InkRule } from '@/components/looseleaf/InkRule'

export function EditorialPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed={`editorial-header-${eyebrow}`}
          className="px-6 py-9 sm:px-10 sm:py-12"
        >
          <Link
            href="/"
            className="inline-flex min-h-[40px] items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Vishnuraj Vishwakarma
          </Link>

          <header className="max-w-3xl pt-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ll-ink-you)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-sans text-4xl font-bold tracking-tight text-[var(--ll-ink)] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
              {intro}
            </p>
          </header>

          <InkRule variant="pencil" seed={`editorial-rule-${eyebrow}`} className="my-8" />

          {children}
        </Paper>
      </div>
    </SiteShell>
  )
}

export function EditorialList({
  items,
  basePath,
}: {
  items: any[]
  basePath?: string
}) {
  if (!items.length) {
    return (
      <Paper
        stock="slip"
        tilt={false}
        seed="editorial-empty-slip"
        className="max-w-2xl p-6 text-base leading-7 text-[var(--ll-ink-soft)]"
      >
        This collection is intentionally selective. New publications and analytical notes will appear here once ready for release.
      </Paper>
    )
  }

  return (
    <div className="space-y-4">
      {items.map(item => {
        const content = (
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
                {item.category || item.researchArea || item.publication || 'Publication'}{' '}
                {item.publishedAt || item.year ? `· ${item.publishedAt || item.year}` : ''}
              </p>
              <h2 className="mt-2 font-sans text-2xl font-bold text-[var(--ll-ink)] group-hover:text-[var(--ll-link)]">
                {item.title}
              </h2>
              <p className="mt-2.5 max-w-3xl text-sm leading-7 text-[var(--ll-ink-soft)]">
                {item.description || item.excerpt || item.summary}
              </p>
            </div>
            {basePath && (
              <ArrowUpRight
                aria-hidden="true"
                className="shrink-0 text-[var(--ll-pencil-text)] group-hover:text-[var(--ll-link)]"
              />
            )}
          </div>
        )

        return basePath ? (
          <Link
            key={item.id}
            href={`${basePath}/${item.slug}`}
            className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
          >
            <Paper stock="slip" tilt={false} seed={`ed-item-${item.id}`} className="p-5 sm:p-6">
              {content}
            </Paper>
          </Link>
        ) : (
          <article key={item.id}>
            <Paper stock="slip" tilt={false} seed={`ed-item-${item.id}`} className="p-5 sm:p-6">
              {content}
            </Paper>
          </article>
        )
      })}
    </div>
  )
}
