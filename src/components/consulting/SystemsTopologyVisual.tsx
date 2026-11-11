'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, Cpu, Database, LineChart, Workflow } from 'lucide-react'

const emptySubscribe = () => () => {}

interface TopologyNode {
  id: string
  index: string
  label: string
  shortLabel: string
  summary: string
  tags: string[]
  icon: typeof Workflow
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'operations',
    index: '01',
    label: 'Business Operations',
    shortLabel: 'Operations',
    summary:
      'Map workflows, remove manual bottlenecks, and standardize operational execution before scaling software.',
    tags: ['Workflow Analysis', 'Process Optimization'],
    icon: Workflow,
  },
  {
    id: 'ai',
    index: '02',
    label: 'AI & Automation',
    shortLabel: 'Applied AI',
    summary:
      'Identify practical AI use cases and embed automation directly into real team decisions.',
    tags: ['AI Adoption', 'Intelligent Systems'],
    icon: Cpu,
  },
  {
    id: 'data',
    index: '03',
    label: 'Data & Intelligence',
    shortLabel: 'Intelligence',
    summary:
      'Consolidate fragmented finance, sales, and operations data into reliable decision-support views.',
    tags: ['Business Intelligence', 'Systems Integration'],
    icon: Database,
  },
  {
    id: 'strategy',
    index: '04',
    label: 'Finance & Strategy',
    shortLabel: 'Strategy',
    summary:
      'Evaluate every technology choice against investment cost, operational impact, and long-term value.',
    tags: ['Transformation Economics', 'Long-Term Growth'],
    icon: LineChart,
  },
]

export function SystemsTopologyVisual() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const prefersReducedMotion = useReducedMotion()
  const reduced = mounted && Boolean(prefersReducedMotion)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string>('operations')
  const [inView, setInView] = useState(true)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2.5, -2.5])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activeNode =
    TOPOLOGY_NODES.find(node => node.id === activeId) ?? TOPOLOGY_NODES[0]

  const shouldAnimateSignals = mounted && !reduced && inView

  return (
    <div
      ref={containerRef}
      className="relative w-full [perspective:1200px]"
      onPointerMove={event => {
        if (!mounted || reduced || event.pointerType === 'touch') return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
      }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_24px_60px_-28px_rgba(11,14,19,0.28)] dark:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)]"
      >
        {/* Architectural Top Telemetry Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full bg-[var(--accent-primary)] ${
                shouldAnimateSignals ? 'animate-pulse' : ''
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              Connected Systems Model
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Interactive Matrix
          </span>
        </div>

        {/* Spatial Topology Plane */}
        <div className="editorial-grid-bg relative p-5 sm:p-6">
          {/* Vector Signal Routing Layer (decorative, behind nodes) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 220"
            className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-55 sm:block"
            preserveAspectRatio="none"
          >
            <line
              x1="105"
              y1="62"
              x2="295"
              y2="62"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="105"
              y1="158"
              x2="295"
              y2="158"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="105"
              y1="62"
              x2="105"
              y2="158"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="295"
              y1="62"
              x2="295"
              y2="158"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="105"
              y1="62"
              x2="295"
              y2="158"
              stroke="var(--accent-primary)"
              strokeOpacity="0.35"
              strokeWidth="1.25"
            />
            <line
              x1="295"
              y1="62"
              x2="105"
              y2="158"
              stroke="var(--accent-warm)"
              strokeOpacity="0.35"
              strokeWidth="1.25"
            />
            {shouldAnimateSignals && (
              <circle r="3" fill="var(--accent-primary)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M105,62 L295,62 L295,158 L105,158 Z"
                />
              </circle>
            )}
          </svg>

          <div
            role="tablist"
            aria-label="Consulting Architecture Layers"
            className="relative z-10 grid gap-3 sm:grid-cols-2"
          >
            {TOPOLOGY_NODES.map(node => {
              const Icon = node.icon
              const selected = node.id === activeId
              return (
                <button
                  key={node.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`topology-panel-${node.id}`}
                  id={`topology-tab-${node.id}`}
                  onClick={() => setActiveId(node.id)}
                  className={`focus-ring group flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? 'border-[var(--accent-primary)] bg-[var(--surface-elevated)] shadow-sm'
                      : 'border-[var(--border-subtle)] bg-[var(--surface)]/95 hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-[var(--text-muted)]">
                      {node.index}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                        selected
                          ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-subtle)] text-[var(--accent-primary)]'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-semibold tracking-[-0.01em] text-[var(--text-primary)]">
                      {node.label}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                      {node.tags.join(' · ')}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Layer Synthesis Panel */}
          <div
            role="tabpanel"
            id={`topology-panel-${activeNode.id}`}
            aria-labelledby={`topology-tab-${activeNode.id}`}
            className="relative z-10 mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--accent-primary)]">
                Layer {activeNode.index} · {activeNode.shortLabel}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--accent-warm)]">
                Business Value Alignment
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
              {activeNode.summary}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

