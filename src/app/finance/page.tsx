import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { EditorialList } from '@/components/public/EditorialPage'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
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
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="ledger"
          rules="ledger"
          tape="both"
          tapeKind="masking"
          tilt={false}
          seed="finance-ledger-page"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            About Vishnuraj
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
              {FINANCE_STRATEGY_CONTENT.sectionNumber} / {FINANCE_STRATEGY_CONTENT.eyebrow}
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2rem,4.5vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-[var(--ll-ink)]">
              <Annotate type="highlight" tone="yellow" seed="finance-h1-mark">
                {FINANCE_STRATEGY_CONTENT.title}
              </Annotate>
            </h1>
            <p className="mt-4 text-lg font-medium text-[var(--ll-ink)]">
              {FINANCE_STRATEGY_CONTENT.lead}
            </p>
            <div className="mt-4 space-y-3 text-base leading-7 text-[var(--ll-ink-soft)]">
              {FINANCE_STRATEGY_CONTENT.paragraphs.map(p => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </header>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FINANCE_STRATEGY_CONTENT.areasOfFocus.map((area, idx) => (
              <Paper
                key={area}
                stock="slip"
                tilt={false}
                seed={`finance-area-${idx}`}
                className="p-5"
              >
                <span className="font-mono text-xs font-bold text-[var(--ll-orange-text)]">
                  0{idx + 1}
                </span>
                <p className="mt-2 font-sans text-sm font-bold text-[var(--ll-ink)]">
                  {area}
                </p>
              </Paper>
            ))}
          </div>

          <InkRule variant="pencil" seed="finance-list-rule" className="my-10" />

          <div>
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
              Published Notes &amp; Analyses
            </h2>
            <EditorialList items={items} />
          </div>

          <div className="mt-10">
            <InkButton href="/services" variant="outline" size="default" seed="finance-services-btn">
              Explore Consulting Services
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </div>
        </Paper>
      </section>
    </SiteShell>
  )
}
