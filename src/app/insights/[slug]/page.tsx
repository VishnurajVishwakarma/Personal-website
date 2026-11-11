import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import { InkRule } from '@/components/looseleaf/InkRule'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/types'

export const dynamic = 'force-dynamic'

async function getArticle(slug: string): Promise<Article | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return null
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('visible', true)
      .single()
    if (error || !data) return null
    return data as Article
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt || undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed={`article-sheet-${article.slug}`}
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to Insights
          </Link>

          <header className="mt-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--ll-ink-you)]">
              {article.category}
              {article.publishedAt ? ` · ${article.publishedAt}` : ''}
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[1.1] tracking-tight text-[var(--ll-ink)]">
              {article.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--ll-ink-soft)]">
              {article.excerpt}
            </p>
          </header>

          <InkRule variant="pencil" seed={`article-rule-${article.slug}`} className="my-8" />

          <div className="whitespace-pre-wrap text-base leading-8 text-[var(--ll-ink-soft)] sm:text-[1.0625rem]">
            {article.content}
          </div>
        </Paper>
      </article>
    </SiteShell>
  )
}
