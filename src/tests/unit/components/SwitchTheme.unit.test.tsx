import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SwitchTheme } from '../../../components/SwitchTheme'

const toggleTheme = vi.fn()
const mockUseThemeContext = vi.fn()

vi.mock('../../../context/ThemeContext', () => ({
  useThemeContext: () => mockUseThemeContext()
}))

describe('SwitchTheme visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Given theme context When SwitchTheme is rendered Then it shows theme button', () => {
    mockUseThemeContext.mockReturnValue({ theme: 'dark', toggleTheme })

    render(<SwitchTheme />)

    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
  })

  it('Given SwitchTheme is rendered When user clicks theme button Then toggleTheme is called', async () => {
    const user = userEvent.setup()
    mockUseThemeContext.mockReturnValue({ theme: 'light', toggleTheme })

    render(<SwitchTheme />)

    await user.click(screen.getByRole('button', { name: /theme/i }))

    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})
