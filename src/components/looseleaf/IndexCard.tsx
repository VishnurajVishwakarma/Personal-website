'use client'

import * as React from 'react'
import { usePaperDecor } from '@/hooks/use-paper-object'
import type { Accent } from '@/lib/ink/paper/props'
import { indexCardRecipe } from '@/lib/ink/recipes/index-card-ink'
import { cn } from '@/lib/utils'
import { Paper, type PaperProps } from '@/components/looseleaf/Paper'

export type IndexCardProps = Omit<PaperProps, 'stock' | 'rules'> & {
  hole?: boolean
  flag?: Accent | false
  stack?: 0 | 1 | 2 | 3
}

export const IndexCard = React.forwardRef<HTMLElement, IndexCardProps>(function IndexCard(
  {
    className,
    children,
    hole = false,
    flag = false,
    stack = 0,
    as = 'div',
    seed,
    tilt = 0,
    size,
    style,
    ...props
  },
  ref
) {
  const o = usePaperDecor({
    recipe: indexCardRecipe,
    params: { hole, flag: flag || 'none', stack },
    kind: 'index-card',
    ref,
    seed,
    tilt,
    tiltMax: 0.45,
    size,
    enabled: hole || !!flag || stack > 0,
  })

  return (
    <Paper
      data-slot="index-card"
      as={as}
      stock="index-card"
      rules="index"
      size={size}
      {...o.paper}
      {...props}
      className={cn(
        o.paper.className,
        'flex flex-col px-6 pb-6 text-[var(--ll-ink)]',
        className
      )}
      style={{ ...o.paper.style, ...style }}
    >
      {o.decor}
      {children}
    </Paper>
  )
})

export function IndexCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="index-card-header"
      className={cn('flex min-h-[46px] shrink-0 items-end justify-between gap-3 pb-1.5', className)}
      {...props}
    />
  )
}

export function IndexCardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="index-card-title"
      className={cn('font-script text-[1.4rem] leading-tight font-bold text-[var(--ll-ink)]', className)}
      {...props}
    />
  )
}

export function IndexCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="index-card-content"
      className={cn('mt-3 flex-1', className)}
      {...props}
    />
  )
}

export function IndexCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="index-card-footer"
      className={cn('mt-auto pt-4 flex items-center justify-between gap-3 text-xs text-[var(--ll-pencil-text)]', className)}
      {...props}
    />
  )
}

