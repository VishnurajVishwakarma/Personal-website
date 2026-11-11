import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { EditorialList } from '@/components/public/EditorialPage'
import { FINANCE_STRATEGY_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'
import type { FinanceItem } from '@/types'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Finance & Strategy',
  description:
    'Connecting technology decisions with commercial outcomes, operational impact, business analysis, and long-term strategy.',
  alternates: { canonical: '/finance' },
}

async function getFinanceItems(): Promise<FinanceItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return []
  try {
    const { data, error } = await supabase
      .from('finance_items')
      .select('*')
      .eq('visible', true)
      .order('order')
    if (error || !data) return []
    return data as FinanceItem[]
  } catch {
    return []
  }
}

export default async function FinancePage() {
  const items = await getFinanceItems()

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/about"
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          About Vishnuraj
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            {FINANCE_STRATEGY_CONTENT.title}
          </h1>
          <p className="mt-4 text-lg font-medium text-[var(--text-primary)]">
            {FINANCE_STRATEGY_CONTENT.lead}
          </p>
          <div className="mt-4 space-y-3 text-base leading-7 text-[var(--text-secondary)]">
            {FINANCE_STRATEGY_CONTENT.paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </header>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FINANCE_STRATEGY_CONTENT.areasOfFocus.map((area, idx) => (
            <div
              key={area}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5"
            >
              <span className="font-mono text-xs text-[var(--accent-warm)]">
                0{idx + 1}
              </span>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                {area}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Published Notes & Analyses
          </h2>
          <EditorialList items={items} />
        </div>

        <div className="mt-12">
          <Link
            href="/services"
            className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            Explore Consulting Services
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
