import { useEffect } from 'react'
import type { Theme } from '../types/theme'
import { THEME_KEY } from '../constants/storageKeys'

export function useThemePersistenceSync(setTheme: (theme: Theme) => void) {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === THEME_KEY) {
        const newTheme = (event.newValue as Theme) || 'dark'
        setTheme(newTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [setTheme])
}
