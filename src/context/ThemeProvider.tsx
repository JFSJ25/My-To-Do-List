import { useCallback, useEffect, useState } from 'react'

import { useThemePersistence } from '../hooks/useThemePersistence'
import { useThemePersistenceSync } from '../hooks/useThemePersistenceSync'
import type { Theme } from '../types/theme'
import { getSaveTheme } from '../utilities/localStorage'
import { ThemeContext, type ThemeContextValue } from './ThemeContext'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getSaveTheme())

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  useThemePersistence(theme)
  useThemePersistenceSync(setTheme)

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
