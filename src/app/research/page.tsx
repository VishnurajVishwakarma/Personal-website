import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { EditorialList } from '@/components/public/EditorialPage'
import { PERSPECTIVES_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'
import type { ResearchPublication } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Research & Publications',
  description:
    'Research and inquiry across AI, business systems, technology, finance, and analytics.',
  alternates: { canonical: '/research' },
}

async function getResearch(): Promise<ResearchPublication[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return []
  try {
    const { data, error } = await supabase
      .from('research_publications')
      .select('*')
      .eq('visible', true)
      .order('order')
    if (error || !data) return []
    return data as ResearchPublication[]
  } catch {
    return []
  }
}

export default async function ResearchPage() {
  const items = await getResearch()

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/insights"
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Insights & Perspectives
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Evidence & Inquiry
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            Research & Publications
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {PERSPECTIVES_CONTENT.intro} Research items are published with authorship, publication details, summaries, and source documents where verified.
          </p>
        </header>

        <div className="mt-10">
          <EditorialList items={items} />
        </div>

        <div className="mt-10">
          <Link
            href="/insights"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            Browse Perspective Categories
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
