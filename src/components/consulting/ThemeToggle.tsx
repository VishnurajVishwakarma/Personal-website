'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { InkButton } from '@/components/looseleaf/InkButton'
import { useTheme } from './ThemeProvider'

const emptySubscribe = () => () => {}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const isDark = mounted ? resolvedTheme === 'dark' : false

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <InkButton
      type="button"
      variant="outline"
      size="icon"
      seed="site-theme-toggle"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? `Switch to ${isDark ? 'light' : 'dark'} color theme`
          : 'Toggle color theme'
      }
      aria-pressed={mounted ? isDark : undefined}
      title={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className={className}
    >
      {mounted ? (
        isDark ? (
          <Sun size={17} aria-hidden="true" />
        ) : (
          <Moon size={17} aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4 rounded-full border border-current opacity-50" aria-hidden="true" />
      )}
    </InkButton>
  )
}
