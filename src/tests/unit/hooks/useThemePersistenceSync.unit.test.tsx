import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { THEME_KEY } from '../../../constants/storageKeys'
import { useThemePersistenceSync } from '../../../hooks/useThemePersistenceSync'

function HookProbe({
  setTheme
}: {
  setTheme: (theme: 'light' | 'dark') => void
}) {
  useThemePersistenceSync(setTheme)
  return null
}

describe('useThemePersistenceSync', () => {
  it('Given THEME_KEY changes When storage event is dispatched Then setTheme uses new value or fallback', () => {
    const setTheme = vi.fn()

    render(<HookProbe setTheme={setTheme} />)

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: THEME_KEY,
        newValue: 'light'
      })
    )

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: THEME_KEY,
        newValue: null
      })
    )

    expect(setTheme).toHaveBeenNthCalledWith(1, 'light')
    expect(setTheme).toHaveBeenNthCalledWith(2, 'dark')
  })

  it('Given unrelated storage keys When event is dispatched Then setTheme is not called', () => {
    const setTheme = vi.fn()

    render(<HookProbe setTheme={setTheme} />)

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'tasks',
        newValue: '[]'
      })
    )

    expect(setTheme).not.toHaveBeenCalled()
  })
})
