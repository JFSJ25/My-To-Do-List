import { useEffect } from 'react'
import { THEME_KEY } from '../constants/storageKeys'
import type { Theme } from '../types/theme'

export function useThemePersistence(theme: Theme) {
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])
}
