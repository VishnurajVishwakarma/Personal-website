import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
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
      <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/insights"
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to Insights
        </Link>

        <header className="mt-8 border-b border-[var(--border-subtle)] pb-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-primary)]">
            {article.category}
            {article.publishedAt ? ` · ${article.publishedAt}` : ''}
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            {article.excerpt}
          </p>
        </header>

        <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-[var(--text-secondary)] sm:text-[1.0625rem]">
          {article.content}
        </div>
      </article>
    </SiteShell>
  )
}
