import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { CURRENT_FOCUS_CONTENT } from '@/lib/consulting-content'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Now — Current Focus',
  description:
    'What Vishnuraj Vishwakarma is currently building, operating, contributing to, and learning.',
  alternates: { canonical: '/now' },
}

async function getNowSettings() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (!url || url.includes('placeholder.supabase.co')) return null
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 'site')
      .single()
    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

export default async function NowPage() {
  const data = await getNowSettings()

  const sections = [
    ['Building & Systems', data?.nowBuilding || 'Business Intelligence & Decision Systems; contributing to Zaprill'],
    ['Operating', data?.nowOperating || 'Austrange Solutions Pvt. Ltd. experience & consulting advisory'],
    ['Contributing', data?.nowContributing || "Chetana's Innovation & Entrepreneurship Lab (CIEL)"],
    ['Learning', data?.nowLearning || 'Post Graduate Diploma in Management (PGDM) — finance, strategy & management'],
    ['Researching', data?.nowResearching || 'AI adoption, digital transformation economics, and business intelligence'],
    ['Exploring', data?.nowExploring || 'Helping organizations connect isolated tools into scalable operations'],
  ]

  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <Link
          href="/about"
          className="focus-ring inline-flex items-center gap-2 rounded text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          About Vishnuraj
        </Link>

        <header className="mt-8 border-b border-[var(--border-subtle)] pb-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            {CURRENT_FOCUS_CONTENT.sectionNumber} / {CURRENT_FOCUS_CONTENT.eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)]">
            {CURRENT_FOCUS_CONTENT.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {data?.nowText || CURRENT_FOCUS_CONTENT.paragraphs[0]}
          </p>
        </header>

        <div className="divide-y divide-[var(--border-subtle)] border-b border-[var(--border-subtle)]">
          {sections.map(([label, value], index) => (
            <section
              key={label}
              className="grid gap-3 py-6 sm:grid-cols-[64px_200px_1fr] sm:items-baseline"
            >
              <span className="font-mono text-xs text-[var(--text-muted)]">
                0{index + 1}
              </span>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                {label}
              </h2>
              <p className="text-base leading-7 text-[var(--text-primary)]">
                {value}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
            {CURRENT_FOCUS_CONTENT.paragraphs[1]}
          </p>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:bg-[var(--accent-primary-hover)]"
          >
            Start a Conversation
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
