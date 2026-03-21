import { createContext, useContext } from 'react'

import type { Theme } from '../types/theme'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
)

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useThemeContext must be used within a ThemeProvider')
  return context
}
