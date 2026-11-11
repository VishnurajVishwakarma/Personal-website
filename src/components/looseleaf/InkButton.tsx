'use client'

import * as React from 'react'
import Link from 'next/link'

import { IconSizeContext, useInk, useMergedRef } from '@/lib/ink/react'
import { buttonRecipe, type ButtonSize, type ButtonVariant } from '@/lib/ink/recipes/button-ink'
import { cn } from '@/lib/utils'

const ICON_SIZE: Record<ButtonSize, number> = {
  default: 18,
  xs: 12,
  sm: 15,
  lg: 20,
  icon: 18,
  'icon-xs': 14,
  'icon-sm': 15,
  'icon-lg': 20,
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Terracotta (#df6b3c light) & Coral (#f6957d dark) both need dark ink text for crisp AA/AAA contrast.
  default:
    'text-[#1b1715] bg-[var(--ll-marker)] [&[data-ink-ready]]:bg-transparent rounded-md hover:opacity-95',
  destructive:
    'text-white dark:text-[#181615] bg-[var(--ll-red)] [&[data-ink-ready]]:bg-transparent rounded-md hover:opacity-95',
  outline:
    'text-[var(--ll-ink)] bg-transparent rounded-md',
  secondary:
    'text-[var(--ll-ink)] bg-[var(--ll-slip)] [&[data-ink-ready]]:bg-transparent rounded-md',
  ghost:
    'text-[var(--ll-ink)] bg-transparent !outline-none hover:bg-[color-mix(in_srgb,var(--ll-ink)_6%,transparent)] [&[data-ink-ready]]:hover:bg-transparent rounded-md',
  link:
    'text-[var(--ll-link)] bg-transparent !outline-none underline-offset-4 hover:text-[var(--ll-link-hover)] hover:underline',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: 'min-h-10 px-4 py-2 text-base [&_svg:not([class*="size-"])]:w-[18px] [&_svg:not([class*="size-"])]:h-[18px]',
  xs: 'min-h-7 gap-1 px-2.5 py-1 text-xs [&_svg:not([class*="size-"])]:w-3 [&_svg:not([class*="size-"])]:h-3',
  sm: 'min-h-9 gap-1.5 px-3.5 py-1.5 text-sm [&_svg:not([class*="size-"])]:w-[15px] [&_svg:not([class*="size-"])]:h-[15px]',
  lg: 'min-h-11 px-5 py-2.5 text-lg [&_svg:not([class*="size-"])]:w-5 [&_svg:not([class*="size-"])]:h-5',
  icon: 'h-10 w-10 p-0',
  'icon-xs': 'h-7 w-7 p-0',
  'icon-sm': 'h-9 w-9 p-0',
  'icon-lg': 'h-11 w-11 p-0',
}

export interface InkButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: 'default' | 'pill'
  seed?: string | number
  className?: string
  children?: React.ReactNode
}

export type InkButtonProps = InkButtonBaseProps &
  (
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'>)
    | ({ href: string; external?: boolean; disabled?: boolean } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'href' | 'ref'
      >)
  )

export const InkButton = React.forwardRef<HTMLElement, InkButtonProps>(function InkButton(
  {
    variant = 'default',
    size = 'default',
    shape = 'default',
    seed,
    className,
    children,
    ...rest
  },
  forwardedRef
) {
  const isDisabled = 'disabled' in rest ? Boolean(rest.disabled) : false

  const { hostRef, hostProps, node } = useInk({
    recipe: buttonRecipe,
    params: { variant, size, disabled: isDisabled, shape },
    kind: 'button',
    seed,
  })

  const mergedRef = useMergedRef<HTMLElement>(hostRef, forwardedRef)

  const classes = cn(
    'relative isolate inline-flex max-w-full min-w-0 items-center justify-center gap-2 whitespace-normal text-center sm:shrink-0 sm:whitespace-nowrap font-sans font-bold tracking-[0.005em] select-none cursor-pointer transition-[transform,opacity] duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    shape === 'pill' && 'rounded-full',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  )

  const sharedData = {
    'data-slot': 'button',
    'data-variant': variant,
    'data-size': size,
    'data-shape': shape,
    ...hostProps,
  }

  let element: React.ReactNode

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, external, disabled, ...anchorProps } = rest
    const isInternal = !external && href.startsWith('/') && !href.startsWith('//')

    if (isInternal && !disabled) {
      element = (
        <Link
          ref={mergedRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...sharedData}
          {...anchorProps}
        >
          {node}
          {children}
        </Link>
      )
    } else {
      element = (
        <a
          ref={mergedRef as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          target={external ? '_blank' : anchorProps.target}
          rel={external ? 'noopener noreferrer' : anchorProps.rel}
          className={classes}
          {...sharedData}
          {...anchorProps}
        >
          {node}
          {children}
        </a>
      )
    }
  } else {
    const { type = 'button', disabled, ...buttonProps } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
    element = (
      <button
        ref={mergedRef as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={classes}
        {...sharedData}
        {...buttonProps}
      >
        {node}
        {children}
      </button>
    )
  }

  return <IconSizeContext.Provider value={ICON_SIZE[size]}>{element}</IconSizeContext.Provider>
})

