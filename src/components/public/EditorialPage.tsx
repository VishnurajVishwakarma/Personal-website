import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'

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
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/"
          className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Vishnuraj Vishwakarma
        </Link>
        <header className="max-w-3xl py-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-primary)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {intro}
          </p>
        </header>
        {children}
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
      <div className="max-w-2xl rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-base leading-7 text-[var(--text-secondary)]">
        This collection is intentionally selective. New publications and analytical notes will appear here once ready for release.
      </div>
    )
  }

  return (
    <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
      {items.map(item => {
        const content = (
          <>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-primary)]">
                {item.category || item.researchArea || item.publication || 'Publication'}{' '}
                {item.publishedAt || item.year ? `· ${item.publishedAt || item.year}` : ''}
              </p>
              <h2 className="mt-2.5 text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                {item.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                {item.description || item.excerpt || item.summary}
              </p>
            </div>
            {basePath && (
              <ArrowUpRight
                aria-hidden="true"
                className="shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]"
              />
            )}
          </>
        )
        return basePath ? (
          <Link
            key={item.id}
            href={`${basePath}/${item.slug}`}
            className="focus-ring group flex items-start justify-between gap-6 py-7"
          >
            {content}
          </Link>
        ) : (
          <article
            key={item.id}
            className="flex items-start justify-between gap-6 py-7"
          >
            {content}
          </article>
        )
      })}
    </div>
  )
}
