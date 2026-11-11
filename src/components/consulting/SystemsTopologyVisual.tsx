'use client'

import { useState } from 'react'
import { Cpu, Database, GitMerge, TrendingUp } from 'lucide-react'
import { Paper } from '@/components/looseleaf/Paper'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import { InkRule } from '@/components/looseleaf/InkRule'

interface TopologyNode {
  id: 'operations' | 'data' | 'ai' | 'value'
  code: string
  label: string
  sublabel: string
  detail: string
  focusAreas: string[]
  icon: typeof GitMerge
}

const NODES: TopologyNode[] = [
  {
    id: 'operations',
    code: '01 · OPS',
    label: 'Business Operations',
    sublabel: 'Workflows & Process Clarity',
    detail:
      'Start by mapping core business bottlenecks, manual handoffs, and unit economics before choosing tools.',
    focusAreas: ['Process Mapping', 'Bottleneck Audit', 'SOP Standardization'],
    icon: GitMerge,
  },
  {
    id: 'data',
    code: '02 · BI',
    label: 'Connected Data Layer',
    sublabel: 'Finance, Sales & Ops Visibility',
    detail:
      'Consolidate siloed spreadsheets and operational records into unified, reliable decision-support views.',
    focusAreas: ['Unified Reporting', 'Financial Visibility', 'KPI Structure'],
    icon: Database,
  },
  {
    id: 'ai',
    code: '03 · AI',
    label: 'Practical AI Systems',
    sublabel: 'Targeted Automation & Augmentation',
    detail:
      'Introduce practical AI workflows and software tools where human-in-the-loop leverage is verifiable.',
    focusAreas: ['Use-Case Feasibility', 'Workflow Automation', 'Tool Integration'],
    icon: Cpu,
  },
  {
    id: 'value',
    code: '04 · ROI',
    label: 'Strategic Leverage',
    sublabel: 'Efficiency & Long-Term Advantage',
    detail:
      'Align systems architecture with capital discipline, scalability targets, and durable competitive strength.',
    focusAreas: ['Build vs. Buy Clarity', 'Scalable Architecture', 'Adoption Cadence'],
    icon: TrendingUp,
  },
]

export function SystemsTopologyVisual() {
  const [activeId, setActiveId] = useState<TopologyNode['id']>('operations')
  const activeNode = NODES.find(n => n.id === activeId) ?? NODES[0]

  return (
    <Paper
      stock="graph"
      rules="graph"
      tape="corner"
      tapeKind="masking"
      fastener="clip"
      tilt={false}
      seed="hero-systems-blueprint"
      className="p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ll-pencil-text)]">
            Working Blueprint · Architecture Notes
          </p>
          <h2 className="mt-1 font-sans text-lg font-bold tracking-tight text-[var(--ll-ink)]">
            How Business, AI &amp; Systems Connect
          </h2>
        </div>
        <InkBadge variant="outline" size="sm" seed="topology-schema-badge">
          Interactive Schema
        </InkBadge>
      </div>

      {/* Connected node grid on graph paper */}
      <div
        role="tablist"
        aria-label="Consulting architecture layers"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
      >
        {NODES.map(node => {
          const Icon = node.icon
          const selected = node.id === activeId
          return (
            <button
              key={node.id}
              id={`topology-tab-${node.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`topology-panel-${node.id}`}
              onClick={() => setActiveId(node.id)}
              className={`group flex flex-col items-start rounded-md border p-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ll-focus)] ${
                selected
                  ? 'border-[var(--ll-ink)] bg-[var(--ll-paper)] shadow-sm -translate-y-0.5'
                  : 'border-[var(--ll-pencil-mark)]/70 bg-[var(--ll-paper)]/75 hover:border-[var(--ll-ink)] hover:bg-[var(--ll-paper)]'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    selected ? 'text-[var(--ll-orange-text)]' : 'text-[var(--ll-pencil-text)]'
                  }`}
                >
                  {node.code}
                </span>
                <Icon
                  size={15}
                  aria-hidden="true"
                  className={selected ? 'text-[var(--ll-ink-you)]' : 'text-[var(--ll-pencil-text)]'}
                />
              </div>
              <p className="mt-2 font-sans text-sm font-bold leading-snug text-[var(--ll-ink)]">
                {node.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--ll-pencil-text)]">{node.sublabel}</p>
            </button>
          )
        })}
      </div>

      <InkRule variant="dashed" seed="topology-divider" className="my-4" />

      {/* Active Layer Detail Slip */}
      <Paper
        id={`topology-panel-${activeNode.id}`}
        stock="slip"
        shadow="slip"
        tilt={false}
        seed={`topology-slip-${activeNode.id}`}
        role="tabpanel"
        aria-labelledby={`topology-tab-${activeNode.id}`}
        aria-label={activeNode.label}
        className="p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ll-ink-you)]">
            Focus · {activeNode.label}
          </p>
          <span className="font-mono text-[10px] text-[var(--ll-pencil-text)]">
            {activeNode.code}
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--ll-ink-soft)]">{activeNode.detail}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {activeNode.focusAreas.map(area => (
            <InkBadge
              key={area}
              variant="outline"
              size="sm"
              seed={`topo-tag-${activeNode.id}-${area}`}
            >
              {area}
            </InkBadge>
          ))}
        </div>
      </Paper>
    </Paper>
  )
}
