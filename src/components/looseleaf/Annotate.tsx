'use client'

import * as React from 'react'

import { MARK_REVEAL, MARK_WIPE, useMarkInk } from '@/hooks/use-mark-ink'
import { useMergedRef } from '@/lib/ink/react'
import { circledRecipe, type CircledShape } from '@/lib/ink/recipes/circled-ink'
import { highlightRecipe } from '@/lib/ink/recipes/highlight-ink'
import type { HighlightTone, MarkPen, MarkWeight } from '@/lib/ink/recipes/text-marks-ink'
import { underlineRecipe, type UnderlineKind } from '@/lib/ink/recipes/underline-ink'
import { cn } from '@/lib/utils'

export interface InkHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: HighlightTone
  fat?: number
  cover?: 'full' | 'under'
  animate?: boolean
  show?: boolean
  delay?: number
  seed?: string | number
}

export const InkHighlight = React.forwardRef<HTMLSpanElement, InkHighlightProps>(function InkHighlight(
  {
    tone = 'yellow',
    fat,
    cover = 'full',
    animate = true,
    show = true,
    delay,
    seed,
    className,
    children,
    ...props
  },
  forwardedRef
) {
  const { hostRef, hostProps, nodes } = useMarkInk({
    recipe: highlightRecipe,
    params: { tone, fat, cover },
    kind: 'highlight',
    seed,
    animate,
    show,
    delay,
  })

  return (
    <span
      ref={useMergedRef<HTMLSpanElement>(hostRef, forwardedRef)}
      data-slot="highlight"
      data-tone={tone}
      className={cn('relative inline box-decoration-clone', MARK_WIPE, className)}
      {...hostProps}
      {...props}
    >
      {children}
      {nodes}
    </span>
  )
})

export interface InkUnderlineProps extends React.HTMLAttributes<HTMLSpanElement> {
  kind?: UnderlineKind
  tone?: MarkPen
  weight?: MarkWeight
  animate?: boolean
  show?: boolean
  delay?: number
  seed?: string | number
}

export const InkUnderline = React.forwardRef<HTMLSpanElement, InkUnderlineProps>(function InkUnderline(
  {
    kind = 'single',
    tone = 'marker',
    weight = 'regular',
    animate = true,
    show = true,
    delay,
    seed,
    className,
    children,
    ...props
  },
  forwardedRef
) {
  const { hostRef, hostProps, nodes } = useMarkInk({
    recipe: underlineRecipe,
    params: { kind, tone, weight },
    kind: 'underline',
    seed,
    animate,
    show,
    delay,
  })

  return (
    <span
      ref={useMergedRef<HTMLSpanElement>(hostRef, forwardedRef)}
      data-slot="underline"
      data-kind={kind}
      data-tone={tone}
      className={cn('relative inline box-decoration-clone', MARK_REVEAL, className)}
      {...hostProps}
      {...props}
    >
      {children}
      {nodes}
    </span>
  )
})

export interface InkCircledProps extends React.HTMLAttributes<HTMLSpanElement> {
  shape?: CircledShape
  tone?: MarkPen
  weight?: MarkWeight
  bleed?: number
  animate?: boolean
  show?: boolean
  delay?: number
  seed?: string | number
}

export const InkCircled = React.forwardRef<HTMLSpanElement, InkCircledProps>(function InkCircled(
  {
    shape = 'circle',
    tone = 'blue',
    weight = 'regular',
    bleed,
    animate = true,
    show = true,
    delay,
    seed,
    className,
    children,
    ...props
  },
  forwardedRef
) {
  const { hostRef, hostProps, nodes } = useMarkInk({
    recipe: circledRecipe,
    params: { shape, tone, weight, bleed },
    kind: 'circled',
    mode: 'box',
    seed,
    animate,
    show,
    delay,
  })

  return (
    <span
      ref={useMergedRef<HTMLSpanElement>(hostRef, forwardedRef)}
      data-slot="circled"
      data-shape={shape}
      data-tone={tone}
      className={cn('relative inline box-decoration-clone', MARK_REVEAL, className)}
      {...hostProps}
      {...props}
    >
      {children}
      {nodes}
    </span>
  )
})

export type AnnotateProps =
  | ({ type: 'highlight' } & InkHighlightProps)
  | ({ type: 'underline' } & InkUnderlineProps)
  | ({ type: 'circle' | 'box' | 'brackets' } & Omit<InkCircledProps, 'shape'> & { shape?: CircledShape })

export function Annotate(props: AnnotateProps) {
  switch (props.type) {
    case 'underline': {
      const { type: _t, ...rest } = props
      return <InkUnderline {...rest} />
    }
    case 'circle':
    case 'box':
    case 'brackets': {
      const { type, shape, ...rest } = props
      return <InkCircled shape={shape ?? type} {...rest} />
    }
    case 'highlight': {
      const { type: _t, ...rest } = props
      return <InkHighlight {...rest} />
    }
  }
}
