import { Layers3, Network, Compass, BarChart3 } from 'lucide-react'
import { Paper } from '@/components/looseleaf/Paper'
import { InkBadge } from '@/components/looseleaf/InkBadge'

export function InitiativeCover({
  slug,
  category,
}: {
  slug: string
  category?: string
}) {
  if (slug === 'business-intelligence-decision-systems') {
    return (
      <Paper
        stock="ledger"
        rules="ledger"
        tape="corner"
        tilt={false}
        seed={`cover-${slug}`}
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
          <span>Data Consolidation Ledger</span>
          <BarChart3 size={15} className="text-[var(--ll-ink-you)]" />
        </div>
        <div className="my-4 grid grid-cols-2 gap-2">
          {['Finance', 'Sales', 'Marketing', 'Operations'].map(source => (
            <div
              key={source}
              className="rounded border border-[var(--ll-pencil-mark)] bg-[var(--ll-paper)] px-3 py-1.5 font-mono text-[11px] font-medium text-[var(--ll-ink)]"
            >
              {source}
            </div>
          ))}
        </div>
        <InkBadge variant="outline" size="sm" seed="cover-bi-badge" className="w-full justify-center">
          Unified Decision-Support Layer
        </InkBadge>
      </Paper>
    )
  }

  if (slug === 'zaprill') {
    return (
      <Paper
        stock="graph"
        rules="graph"
        tape="top"
        tilt={false}
        seed={`cover-${slug}`}
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
          <span>Career Signal Intelligence</span>
          <Layers3 size={15} className="text-[var(--ll-ink-you)]" />
        </div>
        <div className="my-4 space-y-2">
          {[
            ['Salary Insights', 'Compensation context'],
            ['Resume Intelligence', 'Profile readiness'],
            ['Skill Analysis', 'Capability mapping'],
          ].map(([title, note]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded border border-[var(--ll-pencil-mark)] bg-[var(--ll-paper)] px-3 py-1.5 text-xs"
            >
              <span className="font-bold text-[var(--ll-ink)]">{title}</span>
              <span className="font-mono text-[10px] text-[var(--ll-pencil-text)]">{note}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ll-orange-text)]">
          AI Product · Career Platform
        </p>
      </Paper>
    )
  }

  if (slug === 'austrange-solutions') {
    return (
      <Paper
        stock="index-card"
        rules="index"
        fastener="clip"
        tilt={false}
        seed={`cover-${slug}`}
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
          <span>Commercial Execution Model</span>
          <Compass size={15} className="text-[var(--ll-ink-you)]" />
        </div>
        <div className="my-4 flex flex-col gap-2">
          {[
            '01 · Problem Discovery & Validation',
            '02 · Product & Systems Engineering',
            '03 · Operations & Commercialization',
          ].map(stage => (
            <div
              key={stage}
              className="rounded border border-[var(--ll-pencil-mark)] bg-[var(--ll-paper)] px-3 py-1.5 font-mono text-[11px] text-[var(--ll-ink)]"
            >
              {stage}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
          Founder &amp; COO Experience
        </p>
      </Paper>
    )
  }

  if (slug === 'ciel') {
    return (
      <Paper
        stock="sticky-yellow"
        tape="corner"
        tilt={false}
        seed={`cover-${slug}`}
        aria-hidden="true"
        className="flex h-full min-h-[210px] flex-col justify-between p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ll-ink-soft)]">
          <span>Ecosystem Pathways</span>
          <Network size={15} className="text-[var(--ll-ink)]" />
        </div>
        <div className="my-4 grid grid-cols-2 gap-2">
          {['Ideas', 'Institutions', 'Entrepreneurs', 'Industry'].map(node => (
            <div
              key={node}
              className="rounded border border-[var(--ll-pencil-mark)] bg-[var(--ll-paper)] px-3 py-1.5 text-center text-xs font-bold text-[var(--ll-ink)]"
            >
              {node}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ll-ink)]">
          Validation · Prototyping · Incubation
        </p>
      </Paper>
    )
  }

  return (
    <Paper
      stock="slip"
      tilt={false}
      seed={`cover-${slug}`}
      aria-hidden="true"
      className="flex h-full min-h-[210px] flex-col items-center justify-center p-6 text-center"
    >
      <BarChart3 size={32} className="text-[var(--ll-ink-you)]" />
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ll-pencil-text)]">
        {category || 'Systems Architecture'}
      </p>
    </Paper>
  )
}
