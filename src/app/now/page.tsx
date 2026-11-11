import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/consulting/SiteShell'
import { Paper } from '@/components/looseleaf/Paper'
import { InkButton } from '@/components/looseleaf/InkButton'
import { InkRule } from '@/components/looseleaf/InkRule'
import { Annotate } from '@/components/looseleaf/Annotate'
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
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Paper
          stock="pad"
          rules="pad"
          tape="top"
          tapeKind="masking"
          fastener="clip"
          tilt={false}
          seed="now-pad-sheet"
          className="px-6 py-10 sm:px-10 sm:py-12"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[var(--ll-ink-soft)] underline-offset-4 hover:text-[var(--ll-link)] hover:underline"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            About Vishnuraj
          </Link>

          <header className="mt-8">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
              {CURRENT_FOCUS_CONTENT.sectionNumber} / {CURRENT_FOCUS_CONTENT.eyebrow}
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[var(--ll-ink)]">
              <Annotate type="underline" kind="single" tone="marker" seed="now-h1-mark">
                {CURRENT_FOCUS_CONTENT.title}
              </Annotate>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ll-ink-soft)] sm:text-lg">
              {data?.nowText || CURRENT_FOCUS_CONTENT.paragraphs[0]}
            </p>
          </header>

          <InkRule variant="pencil" seed="now-header-rule" className="my-8" />

          <div className="divide-y divide-dashed divide-[var(--ll-pencil-mark)]/45">
            {sections.map(([label, value], index) => (
              <section
                key={label}
                className="grid gap-3 py-5 sm:grid-cols-[56px_200px_1fr] sm:items-baseline"
              >
                <span className="font-mono text-xs font-bold text-[var(--ll-orange-text)]">
                  0{index + 1}
                </span>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ll-ink-you)]">
                  {label}
                </h2>
                <p className="text-base leading-7 text-[var(--ll-ink)]">
                  {value}
                </p>
              </section>
            ))}
          </div>

          <InkRule variant="dashed" seed="now-footer-rule" className="my-8" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm leading-6 text-[var(--ll-ink-soft)]">
              {CURRENT_FOCUS_CONTENT.paragraphs[1]}
            </p>
            <InkButton href="/contact" variant="default" size="default" seed="now-cta-btn">
              Start a Conversation
              <ArrowRight size={15} aria-hidden="true" />
            </InkButton>
          </div>
        </Paper>
      </section>
    </SiteShell>
  )
}
