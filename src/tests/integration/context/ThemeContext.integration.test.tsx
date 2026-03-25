import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { THEME_KEY } from '../../../constants/storageKeys'
import { useThemeContext } from '../../../context/ThemeContext'
import { ThemeProvider } from '../../../context/ThemeProvider'

function ThemeProbe() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <section>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggleTheme}>toggle-theme</button>
    </section>
  )
}

describe('ThemeProvider and useThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Given no ThemeProvider When useThemeContext is called Then it throws an error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<ThemeProbe />)).toThrow(
      'useThemeContext must be used within a ThemeProvider'
    )

    spy.mockRestore()
  })

  it('Given ThemeProvider When toggling and syncing by storage Then theme updates and body attribute changes', async () => {
    const user = userEvent.setup()
    localStorage.setItem(THEME_KEY, 'dark')

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    expect(document.body.getAttribute('data-theme')).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'toggle-theme' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.body.getAttribute('data-theme')).toBe('light')

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: THEME_KEY,
        newValue: 'dark'
      })
    )

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    })
    expect(document.body.getAttribute('data-theme')).toBe('dark')
  })
})
