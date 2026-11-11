import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { PERSPECTIVES_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Insights — Research & Perspectives',
  description:
    'Exploring AI × Business, Technology × Finance, Digital Transformation, Business Intelligence, Innovation & Entrepreneurship, and Long-Term Strategy.',
  alternates: { canonical: '/insights' },
}

async function getPublishedArticles(): Promise<Article[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return []
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('visible', true)
      .order('publishedAt', { ascending: false })
    if (error || !data) return []
    return data as Article[]
  } catch {
    return []
  }
}

export default async function InsightsPage() {
  const articles = await getPublishedArticles()

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--text-muted)]">
            <Link href="/" className="focus-ring rounded hover:text-[var(--text-primary)]">
              Home
            </Link>{' '}
            / <span className="text-[var(--text-primary)]">Insights</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {PERSPECTIVES_CONTENT.sectionNumber} / {PERSPECTIVES_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.1rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {PERSPECTIVES_CONTENT.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {PERSPECTIVES_CONTENT.intro}
          </p>
        </div>
      </section>

      {/* Six Research & Perspective Categories */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mb-10 flex items-center justify-between gap-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Core Thematic Lenses
            </h2>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              6 Focus Areas
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PERSPECTIVES_CONTENT.categories.map(category => (
              <article
                key={category.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 sm:p-7"
              >
                <div>
                  <span className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--accent-warm)]">
                    {category.number}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    Questions Explored
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[var(--text-secondary)]">
                    {category.keyQuestions.map(q => (
                      <li key={q} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-primary)]"
                          aria-hidden="true"
                        />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Published Notes OR Honest Empty Editorial State */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} aria-hidden="true" className="text-[var(--accent-primary)]" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-primary)]">
              Published Essays & Notes
            </h2>
          </div>

          {articles.length > 0 ? (
            <div className="mt-8 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {articles.map(article => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="focus-ring group flex flex-col justify-between gap-4 py-7 sm:flex-row sm:items-center"
                >
                  <div className="max-w-3xl">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                      {article.category}
                      {article.publishedAt ? ` · ${article.publishedAt}` : ''}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent-primary)]"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-8 sm:p-10">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                    <FileText size={13} aria-hidden="true" />
                    Editorial Archive Status
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    Articles & working essays coming soon.
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                    Written perspectives across these six themes are published selectively once grounded in practical analysis and field observations. Meanwhile, you can review active initiatives or start a direct conversation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/work"
                    className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  >
                    Explore My Work
                  </Link>
                  <Link
                    href="/contact"
                    className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent-primary-hover)]"
                  >
                    Discuss a Topic
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  )
}
