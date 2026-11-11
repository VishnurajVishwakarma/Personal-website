'use client'

import { APPROACH_CONTENT } from '@/lib/consulting-content'
import {
  IndexCard,
  IndexCardContent,
  IndexCardFooter,
  IndexCardHeader,
  IndexCardTitle,
} from '@/components/looseleaf/IndexCard'
import { InkBadge } from '@/components/looseleaf/InkBadge'
import type { Accent } from '@/lib/ink/paper/props'

const STEP_FLAGS: Accent[] = ['tangerine', 'sky', 'teal', 'grass', 'tomato']

export function ApproachTimeline() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
      {APPROACH_CONTENT.steps.map((item, idx) => (
        <IndexCard
          key={item.step}
          flag={STEP_FLAGS[idx % STEP_FLAGS.length]}
          stack={idx === 0 ? 1 : 0}
          tilt={false}
          seed={`approach-step-${item.step}`}
          className="h-full"
        >
          <IndexCardHeader>
            <span className="inline-flex h-7 items-center rounded border border-[var(--ll-ink)] bg-[var(--ll-slip)] px-2 font-mono text-xs font-bold text-[var(--ll-ink)]">
              {item.step}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ll-pencil-text)]">
              Phase
            </span>
          </IndexCardHeader>

          <IndexCardContent>
            <IndexCardTitle className="font-sans text-lg font-bold tracking-tight">
              {item.title}
            </IndexCardTitle>
            <p className="mt-2.5 text-sm leading-6 text-[var(--ll-ink-soft)]">
              {item.description}
            </p>
          </IndexCardContent>

          <IndexCardFooter className="border-t border-dashed border-[var(--ll-pencil-mark)]/45 pt-3">
            <InkBadge
              variant="outline"
              size="sm"
              seed={`approach-deliverable-${item.step}`}
            >
              {item.deliverableFocus}
            </InkBadge>
          </IndexCardFooter>
        </IndexCard>
      ))}
    </div>
  )
}
