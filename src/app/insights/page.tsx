import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import {
  IndexCard,
  IndexCardContent,
  IndexCardFooter,
  IndexCardHeader,
  IndexCardTitle,
} from '@/components/looseleaf/IndexCard'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
import { StickyNote, StickyNoteContent, StickyNoteTitle } from '@/components/looseleaf/StickyNote'
import type { Accent } from '@/lib/ink/paper/props'
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

const LENS_FLAGS: Accent[] = ['tangerine', 'sky', 'teal', 'grass', 'lemon', 'bubblegum']

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
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="insights-hero-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-[var(--ll-pencil-text)]">
            <Link href="/" className="hover:text-[var(--ll-ink)] hover:underline underline-offset-4">
              Home
            </Link>{' '}
            / <span className="font-medium text-[var(--ll-ink)]">Insights</span>
          </nav>

          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
            {PERSPECTIVES_CONTENT.sectionNumber} / {PERSPECTIVES_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl break-words font-sans text-[clamp(1.7rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
            <Annotate type="highlight" tone="yellow" seed="insights-h1-mark">
              {PERSPECTIVES_CONTENT.title}
            </Annotate>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
            {PERSPECTIVES_CONTENT.intro}
          </p>
        </Paper>
      </section>

      {/* Six Research & Perspective Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 px-1">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink)]">
            Core Thematic Lenses
          </h2>
          <InkBadge variant="outline" size="sm" seed="insights-count-badge">
            6 Focus Areas
          </InkBadge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PERSPECTIVES_CONTENT.categories.map((category, idx) => (
            <IndexCard
              key={category.id}
              flag={LENS_FLAGS[idx % LENS_FLAGS.length]}
              tilt={false}
              seed={`insight-cat-${category.id}`}
              className="h-full"
            >
              <IndexCardHeader>
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-[var(--ll-orange-text)]">
                  {category.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
                  Perspective
                </span>
              </IndexCardHeader>

              <IndexCardContent>
                <IndexCardTitle className="font-sans text-xl font-bold tracking-tight">
                  {category.title}
                </IndexCardTitle>
                <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
                  {category.description}
                </p>
              </IndexCardContent>

              <IndexCardFooter className="block border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ll-pencil-text)]">
                  Questions Explored
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[var(--ll-ink-soft)]">
                  {category.keyQuestions.map(q => (
                    <li key={q} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ll-ink-you)]"
                        aria-hidden="true"
                      />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </IndexCardFooter>
            </IndexCard>
          ))}
        </div>
      </section>

      {/* Published Notes OR Honest Empty Editorial State */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Paper
          stock="paper"
          fastener="clip"
          tilt={false}
          seed="insights-archive-sheet"
          className="px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} aria-hidden="true" className="text-[var(--ll-ink-you)]" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
              Published Essays &amp; Notes
            </h2>
          </div>

          <InkRule variant="dashed" seed="insights-archive-rule" className="my-6" />

          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map(article => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)]"
                >
                  <Paper stock="slip" tilt={false} seed={`article-row-${article.id}`} className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="max-w-3xl">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                          {article.category}
                          {article.publishedAt ? ` · ${article.publishedAt}` : ''}
                        </p>
                        <h3 className="mt-2 font-sans text-2xl font-bold tracking-tight text-[var(--ll-ink)] group-hover:text-[var(--ll-link)]">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">
                          {article.excerpt}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--ll-pencil-text)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--ll-link)]"
                      />
                    </div>
                  </Paper>
                </Link>
              ))}
            </div>
          ) : (
            <StickyNote
              color="yellow"
              tape="corner"
              tilt={false}
              seed="insights-coming-soon-sticky"
              className="p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <InkBadge variant="outline" size="sm" seed="archive-status-badge">
                    <FileText size={13} aria-hidden="true" />
                    Editorial Archive Status
                  </InkBadge>
                  <StickyNoteTitle className="mt-4 font-sans text-2xl font-bold tracking-tight">
                    Articles &amp; working essays coming soon.
                  </StickyNoteTitle>
                  <StickyNoteContent className="mt-2 text-sm leading-7 sm:text-base">
                    Written perspectives across these six themes are published selectively once grounded in practical analysis and field observations. Meanwhile, you can review active initiatives or start a direct conversation.
                  </StickyNoteContent>
                </div>

                <div className="flex flex-wrap gap-3">
                  <InkButton href="/work" variant="outline" size="default" seed="insights-work-btn">
                    Explore My Work
                  </InkButton>
                  <InkButton href="/contact" variant="default" size="default" seed="insights-cta-btn">
                    Discuss a Topic
                    <ArrowRight size={15} aria-hidden="true" />
                  </InkButton>
                </div>
              </div>
            </StickyNote>
          )}
        </Paper>
      </section>
    </SiteShell>
  )
}
