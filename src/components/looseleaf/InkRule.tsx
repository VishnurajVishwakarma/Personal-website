'use client'

import * as React from 'react'

import { useInk, useMergedRef } from '@/lib/ink/react'
import { separatorRecipe, type SeparatorVariant } from '@/lib/ink/recipes/separator-ink'
import { cn } from '@/lib/utils'

type Orientation = 'horizontal' | 'vertical'

const RuleLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant: SeparatorVariant
    orientation: Orientation
    seed?: string | number
  }
>(function RuleLine({ variant, orientation, seed, className, children, ...props }, forwardedRef) {
  const { hostRef, hostProps, node } = useInk({
    recipe: separatorRecipe,
    params: { variant, orientation },
    kind: 'rule',
    seed,
    still: true,
  })

  return (
    <div
      ref={useMergedRef<HTMLDivElement>(hostRef, forwardedRef)}
      {...hostProps}
      data-orientation={orientation}
      data-variant={variant}
      className={cn(
        'relative isolate shrink-0 bg-[color-mix(in_srgb,var(--ll-pencil-mark)_55%,transparent)] [&[data-ink-ready]]:bg-transparent outline-none',
        orientation === 'horizontal'
          ? 'h-px w-full overflow-x-clip'
          : 'h-full w-px overflow-y-clip',
        className
      )}
      {...props}
    >
      {node}
      {children}
    </div>
  )
})

export interface InkRuleProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation
  decorative?: boolean
  variant?: SeparatorVariant
  seed?: string | number
}

export function InkRule({
  className,
  orientation = 'horizontal',
  decorative = true,
  variant = 'pencil',
  seed,
  children,
  ...props
}: InkRuleProps) {
  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'separator' as const, 'aria-orientation': orientation }

  if (children === undefined || children === null || children === false) {
    return (
      <RuleLine
        data-slot="separator"
        variant={variant}
        orientation={orientation}
        seed={seed}
        className={className}
        {...ariaProps}
        {...props}
      />
    )
  }

  const vertical = orientation === 'vertical'

  return (
    <div
      data-slot="separator"
      data-variant={variant}
      data-orientation={orientation}
      className={cn(
        'flex shrink-0 items-center gap-3',
        vertical ? 'h-full flex-col' : 'w-full',
        className
      )}
      {...ariaProps}
      {...props}
    >
      <RuleLine
        variant={variant}
        orientation={orientation}
        seed={seed === undefined ? undefined : `${seed}:a`}
        className={vertical ? 'h-auto flex-1' : 'w-auto flex-1'}
      />
      <span
        data-slot="separator-label"
        className="shrink-0 font-hand text-sm font-bold leading-none text-[var(--ll-pencil-text)] select-none"
      >
        {children}
      </span>
      <RuleLine
        variant={variant}
        orientation={orientation}
        seed={seed === undefined ? undefined : `${seed}:b`}
        className={vertical ? 'h-auto flex-1' : 'w-auto flex-1'}
      />
    </div>
  )
}

