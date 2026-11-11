'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeContextValue {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setTheme: (next: ThemeMode) => void
}

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
})

function notifyListeners() {
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (typeof window !== 'undefined') {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => listener()
    media.addEventListener('change', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      listeners.delete(listener)
      media.removeEventListener('change', onChange)
      window.removeEventListener('storage', onChange)
    }
  }
  return () => {
    listeners.delete(listener)
  }
}

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') {
      return value
    }
  } catch {
    // Ignore storage restrictions
  }
  return 'system'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === 'light' || mode === 'dark') return mode
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

function getResolvedSnapshot(): ResolvedTheme {
  return resolveTheme(readStoredTheme())
}

function applyThemeClass(resolved: ResolvedTheme, disableTransitions: boolean) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  let styleEl: HTMLStyleElement | null = null

  if (disableTransitions) {
    styleEl = document.createElement('style')
    styleEl.appendChild(
      document.createTextNode(
        '*,*::before,*::after{-webkit-transition:none!important;transition:none!important;}'
      )
    )
    document.head.appendChild(styleEl)
  }

  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved

  if (styleEl) {
    void window.getComputedStyle(root).opacity
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        styleEl?.remove()
      })
    })
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<ThemeMode>(
    subscribe,
    readStoredTheme,
    () => 'system'
  )
  const resolvedTheme = useSyncExternalStore<ResolvedTheme>(
    subscribe,
    getResolvedSnapshot,
    () => 'light'
  )

  useEffect(() => {
    applyThemeClass(resolvedTheme, false)
  }, [resolvedTheme])

  const setTheme = useCallback((next: ThemeMode) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage restrictions
      }
      applyThemeClass(resolveTheme(next), true)
    }
    notifyListeners()
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

