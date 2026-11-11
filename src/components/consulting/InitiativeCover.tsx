import { Layers3, Network, Compass, BarChart3 } from 'lucide-react'

export function InitiativeCover({
  slug,
  category,
}: {
  slug: string
  category?: string
}) {
  if (slug === 'business-intelligence-decision-systems') {
    return (
      <div
        aria-hidden="true"
        className="editorial-grid-bg relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden bg-[var(--bg-secondary)] p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>Data Consolidation Blueprint</span>
          <BarChart3 size={15} className="text-[var(--accent-primary)]" />
        </div>
        <div className="my-4 grid grid-cols-2 gap-2">
          {['Finance', 'Sales', 'Marketing', 'Operations'].map(source => (
            <div
              key={source}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 font-mono text-[11px] text-[var(--text-secondary)]"
            >
              {source}
            </div>
          ))}
        </div>
        <div className="rounded-md border border-[var(--accent-primary)]/40 bg-[var(--accent-subtle)] px-3 py-2 text-center font-mono text-[11px] font-medium text-[var(--accent-primary)]">
          Unified Decision-Support Layer
        </div>
      </div>
    )
  }

  if (slug === 'zaprill') {
    return (
      <div
        aria-hidden="true"
        className="editorial-grid-bg relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden bg-[var(--bg-secondary)] p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>Career Signal Intelligence</span>
          <Layers3 size={15} className="text-[var(--accent-primary)]" />
        </div>
        <div className="my-4 space-y-2">
          {[
            ['Salary Insights', 'Compensation context'],
            ['Resume Intelligence', 'Profile readiness'],
            ['Skill Analysis', 'Capability mapping'],
          ].map(([title, note]) => (
            <div
              key={title}
              className="flex items-center justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-xs"
            >
              <span className="font-medium text-[var(--text-primary)]">{title}</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">{note}</span>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-warm)]">
          AI Product · Career Platform
        </p>
      </div>
    )
  }

  if (slug === 'austrange-solutions') {
    return (
      <div
        aria-hidden="true"
        className="editorial-grid-bg relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden bg-[var(--bg-secondary)] p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>Commercial Execution Model</span>
          <Compass size={15} className="text-[var(--accent-primary)]" />
        </div>
        <div className="my-4 flex flex-col gap-2">
          {[
            '01 · Problem Discovery & Validation',
            '02 · Product & Systems Engineering',
            '03 · Operations & Commercialization',
          ].map(stage => (
            <div
              key={stage}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 font-mono text-[11px] text-[var(--text-secondary)]"
            >
              {stage}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-primary)]">
          Founder & COO Experience
        </p>
      </div>
    )
  }

  if (slug === 'ciel') {
    return (
      <div
        aria-hidden="true"
        className="editorial-grid-bg relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden bg-[var(--bg-secondary)] p-5"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>Ecosystem Pathways</span>
          <Network size={15} className="text-[var(--accent-primary)]" />
        </div>
        <div className="my-4 grid grid-cols-2 gap-2">
          {['Ideas', 'Institutions', 'Entrepreneurs', 'Industry'].map(node => (
            <div
              key={node}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-2 text-center text-xs font-medium text-[var(--text-primary)]"
            >
              {node}
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-warm)]">
          Validation · Prototyping · Incubation
        </p>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="editorial-grid-bg flex h-full min-h-[200px] flex-col items-center justify-center bg-[var(--bg-secondary)] p-6 text-center"
    >
      <BarChart3 size={32} className="text-[var(--accent-primary)]" />
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {category || 'Systems Architecture'}
      </p>
    </div>
  )
}

