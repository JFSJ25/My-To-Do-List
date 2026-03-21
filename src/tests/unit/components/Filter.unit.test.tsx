import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Filter } from '../../../components/Filter'
import type { TaskContextValue } from '../../../context/TaskContext'

const mockUseTaskContext = vi.fn<() => TaskContextValue>()

vi.mock('../../../context/TaskContext.tsx', () => ({
  useTaskContext: () => mockUseTaskContext()
}))

function createContext(overrides: Partial<TaskContextValue>): TaskContextValue {
  return {
    taskList: [],
    addTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
    filter: 'all',
    handleFilter: vi.fn(),
    clearCompleted: vi.fn(),
    ...overrides
  }
}

describe('Filter visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Given a pending filter When Filter is rendered Then dropdown shows pending', () => {
    mockUseTaskContext.mockReturnValue(createContext({ filter: 'pending' }))

    render(<Filter />)

    expect(screen.getByRole('combobox')).toHaveValue('pending')
  })

  it('Given Filter is rendered When user changes option Then handleFilter is called with new value', async () => {
    const user = userEvent.setup()
    const handleFilter = vi.fn()

    mockUseTaskContext.mockReturnValue(
      createContext({ filter: 'all', handleFilter })
    )

    render(<Filter />)

    await user.selectOptions(screen.getByRole('combobox'), 'completed')

    expect(handleFilter).toHaveBeenCalledWith('completed')
  })
})
