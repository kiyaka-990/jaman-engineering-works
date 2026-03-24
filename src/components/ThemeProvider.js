'use client'
import { useState, useEffect, createContext, useContext } from 'react'

export const ThemeContext = createContext({ dark: true, toggle: () => {} })
export function useTheme() { return useContext(ThemeContext) }

export default function ThemeProvider({ children }) {
  // CRITICAL: always `true` (dark) on server — matches the default class
  // added by the inline script in <head>. Never read window/document here.
  const [dark, setDark] = useState(true)

  useEffect(() => {
    // After hydration, sync to whatever the inline script actually set.
    // This runs client-only so it CANNOT cause a hydration mismatch.
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      try { localStorage.setItem('jaman-theme', next ? 'dark' : 'light') } catch {}
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
