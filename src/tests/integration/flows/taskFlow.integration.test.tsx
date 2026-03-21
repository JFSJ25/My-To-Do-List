import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { App } from '../../../App'
import {
  FILTER_KEY,
  TASKS_KEY,
  THEME_KEY
} from '../../../constants/storageKeys'
import { TaskProvider } from '../../../context/TaskProvider'
import { ThemeProvider } from '../../../context/ThemeProvider'

function renderAppWithProviders() {
  return render(
    <TaskProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TaskProvider>
  )
}

describe('Todo app full flow integration', () => {
  it('Given an empty app When user creates and completes a task Then filters and counter reflect full flow', async () => {
    const user = userEvent.setup()

    localStorage.setItem(TASKS_KEY, '[]')
    localStorage.setItem(FILTER_KEY, 'all')
    localStorage.setItem(THEME_KEY, 'dark')

    renderAppWithProviders()

    expect(screen.getByText('No tasks')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add/i }))

    const input = screen.getByPlaceholderText('Write a new task')
    await user.type(input, 'Ship portfolio todo app')

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Toggle completion for task: Ship portfolio todo app'
      })
    )

    expect(screen.getByText('1 of 1 completed')).toBeInTheDocument()

    await user.selectOptions(screen.getByRole('combobox'), 'pending')
    expect(screen.getByText('No pending tasks')).toBeInTheDocument()

    await user.selectOptions(screen.getByRole('combobox'), 'completed')
    expect(
      screen.getByDisplayValue('Ship portfolio todo app')
    ).toBeInTheDocument()
  })
})
