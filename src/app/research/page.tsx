import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { EditorialList } from '@/components/public/EditorialPage'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
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
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="paper"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="research-page-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Insights &amp; Perspectives
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
              Evidence &amp; Inquiry
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
              Research &amp; Publications
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
              {PERSPECTIVES_CONTENT.intro} Research items are published with authorship, publication details, summaries, and source documents where verified.
            </p>
          </header>

          <InkRule variant="pencil" seed="research-list-rule" className="my-8" />

          <EditorialList items={items} />

          <div className="mt-10">
            <InkButton href="/insights" variant="outline" size="default" seed="research-insights-btn">
              Browse Perspective Categories
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </div>
        </Paper>
      </section>
    </SiteShell>
  )
}
