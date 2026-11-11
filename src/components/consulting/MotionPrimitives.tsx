'use client'

import { ReactNode, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Annotate } from '@/components/looseleaf/Annotate'

const emptySubscribe = () => () => {}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const prefersReducedMotion = useReducedMotion()
  const reduced = mounted && Boolean(prefersReducedMotion)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-48px' }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.36, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  lead,
  description,
  className = '',
  underlineTitle = false,
}: {
  number?: string
  eyebrow: string
  title: string
  lead?: string
  description?: string
  className?: string
  underlineTitle?: boolean
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--ll-ink-you)]">
        {number ? `${number} / ` : ''}
        {eyebrow}
      </p>
      <h2 className="mt-3 break-words font-sans text-[clamp(1.6rem,3.6vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-[var(--ll-ink)]">
        {underlineTitle ? (
          <Annotate type="underline" kind="single" tone="marker" seed={`heading-${eyebrow}`}>
            {title}
          </Annotate>
        ) : (
          title
        )}
      </h2>
      {lead && (
        <p className="mt-4 text-lg font-medium leading-relaxed text-[var(--ll-ink)]">
          {lead}
        </p>
      )}
      {description && (
        <p className="mt-3 text-base leading-7 text-[var(--ll-ink-soft)] sm:text-[1.0625rem]">
          {description}
        </p>
      )}
    </div>
  )
}
