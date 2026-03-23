'use client'
import { useState, useEffect, createContext, useContext } from 'react'

export const ThemeContext = createContext({ dark: true, toggle: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  // Initialise from the class already set by the inline script in <head>
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    // Sync state with what the inline script already applied
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)
  }, [])

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('jaman-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
