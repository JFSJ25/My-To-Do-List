import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Sorted } from '../../../components/Sorted'
import type { TaskContextValue } from '../../../context/TaskContext'
import { SortOption } from '../../../types/sortOption'

const mockUseTaskContext = vi.fn<() => TaskContextValue>()

vi.mock('../../../context/TaskContext.tsx', () => ({
  useTaskContext: () => mockUseTaskContext()
}))

function createContext(overrides: Partial<TaskContextValue>): TaskContextValue {
  return {
    taskList: [],
    activeSort: SortOption.custom,
    addTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
    reorderTask: vi.fn(),
    filter: 'all',
    handleFilter: vi.fn(),
    handleSort: vi.fn(),
    clearCompleted: vi.fn(),
    ...overrides
  }
}

describe('Sorted visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Given active sort is date When Sorted is rendered Then dropdown shows date', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({ activeSort: SortOption.date })
    )

    render(<Sorted />)

    expect(screen.getByRole('combobox')).toHaveValue(SortOption.date)
  })

  it('Given Sorted is rendered When user changes option Then handleSort is called with selected sort', async () => {
    const user = userEvent.setup()
    const handleSort = vi.fn()

    mockUseTaskContext.mockReturnValue(
      createContext({ activeSort: SortOption.custom, handleSort })
    )

    render(<Sorted />)

    await user.selectOptions(screen.getByRole('combobox'), SortOption.priority)

    expect(handleSort).toHaveBeenCalledWith(SortOption.priority)
  })
})
