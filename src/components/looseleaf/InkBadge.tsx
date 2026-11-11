'use client'

import * as React from 'react'

import { IconSizeContext, useInk, useMergedRef } from '@/lib/ink/react'
import {
  badgeRecipe,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
} from '@/lib/ink/recipes/badge-ink'
import { cn } from '@/lib/utils'

const ICON_SIZE: Record<BadgeSize, number> = {
  sm: 11,
  default: 13,
  lg: 15,
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] leading-tight gap-1',
  default: 'px-2.5 py-0.5 text-xs leading-snug gap-1.5',
  lg: 'px-3 py-1 text-sm leading-snug gap-1.5',
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  // Default / colored stamp badges use deep ink for crisp legibility across marker/tangerine/sky/teal/grass fills.
  default: 'text-[#1b1715]',
  secondary: 'text-[var(--ll-ink)]',
  destructive: 'text-white dark:text-[#181615]',
  outline: 'text-[var(--ll-ink)]',
  ghost: 'text-[var(--ll-ink-muted)] !outline-none',
  link: 'text-[var(--ll-link)] !outline-none underline-offset-4 hover:underline',
}

export interface InkBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  tone?: BadgeTone
  seed?: string | number
}

export const InkBadge = React.forwardRef<HTMLSpanElement, InkBadgeProps>(function InkBadge(
  {
    variant = 'outline',
    size = 'default',
    tone = 'marker',
    seed,
    className,
    children,
    ...props
  },
  forwardedRef
) {
  const { hostRef, hostProps, node } = useInk({
    recipe: badgeRecipe,
    params: { variant, size, tone },
    kind: 'badge',
    seed,
    still: true,
  })

  const mergedRef = useMergedRef<HTMLSpanElement>(hostRef, forwardedRef)

  return (
    <IconSizeContext.Provider value={ICON_SIZE[size]}>
      <span
        ref={mergedRef}
        data-slot="badge"
        data-variant={variant}
        data-size={size}
        className={cn(
          'relative isolate inline-flex w-fit max-w-full min-w-0 items-center justify-center whitespace-normal text-left sm:whitespace-nowrap rounded-full font-mono font-medium tracking-[0.02em] select-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          SIZE_CLASSES[size],
          VARIANT_CLASSES[variant],
          className
        )}
        {...hostProps}
        {...props}
      >
        {node}
        {children}
      </span>
    </IconSizeContext.Provider>
  )
})

