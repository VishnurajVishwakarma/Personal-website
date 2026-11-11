'use client'

import * as React from 'react'
import { usePaperDecor } from '@/hooks/use-paper-object'
import { stickyNoteRecipe } from '@/lib/ink/recipes/sticky-note-ink'
import { cn } from '@/lib/utils'
import { Paper, type PaperProps } from '@/components/looseleaf/Paper'

export type StickyColor = 'yellow' | 'green' | 'orange' | 'pink' | 'blue'

export type StickyNoteProps = Omit<PaperProps, 'stock'> & {
  color?: StickyColor
}

export const StickyNote = React.forwardRef<HTMLElement, StickyNoteProps>(function StickyNote(
  { className, children, color = 'yellow', seed, tilt, size, style, ...props },
  ref
) {
  const o = usePaperDecor({
    recipe: stickyNoteRecipe,
    params: {},
    kind: 'sticky',
    ref,
    seed,
    tilt,
    tiltMax: 1.2,
    size,
    enabled: false,
  })

  return (
    <Paper
      data-slot="sticky-note"
      data-color={color}
      stock={`sticky-${color}`}
      size={size}
      {...o.paper}
      {...props}
      className={cn(
        o.paper.className,
        'flex flex-col gap-2 px-5 pt-6 pb-5 text-[var(--ll-ink)] break-words',
        className
      )}
      style={{ ...o.paper.style, ...style }}
    >
      {children}
    </Paper>
  )
})

export function StickyNoteTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sticky-note-title"
      className={cn('font-script text-xl leading-tight font-bold text-[var(--ll-ink)]', className)}
      {...props}
    />
  )
}

export function StickyNoteContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sticky-note-content"
      className={cn('flex-1 text-sm leading-6 text-[var(--ll-ink-soft)]', className)}
      {...props}
    />
  )
}

