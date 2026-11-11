'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { APPROACH_CONTENT } from '@/lib/consulting-content'

const emptySubscribe = () => () => {}

export function ApproachTimeline() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const prefersReducedMotion = useReducedMotion()
  const reduced = mounted && Boolean(prefersReducedMotion)
  const [focusedStep, setFocusedStep] = useState<string>('01')

  const activeIndex = APPROACH_CONTENT.steps.findIndex(
    item => item.step === focusedStep
  )
  const progressPercent =
    activeIndex >= 0
      ? ((activeIndex + 1) / APPROACH_CONTENT.steps.length) * 100
      : 20

  return (
    <div className="mt-12">
      {/* Desktop Horizontal Architectural Rail */}
      <div className="hidden lg:block">
        <div className="relative mb-6 flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--border-subtle)]" />
          <div
            className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[var(--accent-primary)] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />
          {APPROACH_CONTENT.steps.map(item => {
            const active = item.step === focusedStep
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setFocusedStep(item.step)}
                onMouseEnter={() => setFocusedStep(item.step)}
                className={`focus-ring relative z-10 flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium transition-colors ${
                  active
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-foreground)]'
                    : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
                }`}
                aria-pressed={active}
              >
                <span>{item.step}</span>
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {APPROACH_CONTENT.steps.map((item, index) => {
            const active = item.step === focusedStep
            return (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={reduced ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 0.3, delay: index * 0.04 }
                }
                onClick={() => setFocusedStep(item.step)}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-5 transition-colors ${
                  active
                    ? 'border-[var(--accent-primary)] bg-[var(--surface-elevated)] shadow-sm'
                    : 'border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[var(--accent-primary)]">
                      {item.step}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
                <p className="mt-5 border-t border-[var(--border-subtle)] pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {item.deliverableFocus}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>

      {/* Mobile & Tablet Stacked Timeline */}
      <ol className="relative space-y-5 border-l border-[var(--border-strong)] pl-6 lg:hidden">
        {APPROACH_CONTENT.steps.map(item => (
          <li key={item.step} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)]"
            />
            <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[var(--accent-primary)]">
                  {item.step} — {item.title}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-6 text-[var(--text-secondary)]">
                {item.description}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {item.deliverableFocus}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}

