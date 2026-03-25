import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Item } from '../../../components/TaskItem'
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

describe('TaskItem visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Given a task item When rendered and delete is clicked Then it shows details and calls deleteTask', async () => {
    const user = userEvent.setup()
    const deleteTask = vi.fn()

    mockUseTaskContext.mockReturnValue(createContext({ deleteTask }))

    render(
      <Item
        task={{
          id: 'task-1',
          text: 'Write tests',
          completed: false,
          date: '21/03/2026 10:00',
          priority: 'medium'
        }}
      />
    )

    expect(screen.getByDisplayValue('Write tests')).toBeInTheDocument()
    expect(screen.getByText('Created: 21/03/2026 10:00')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'delete task' }))
    expect(deleteTask).toHaveBeenCalledWith('task-1')
  })

  it('Given an editable task When user changes text and toggles completion Then updateTask is called with expected payloads', async () => {
    const user = userEvent.setup()
    const updateTask = vi.fn()

    mockUseTaskContext.mockReturnValue(createContext({ updateTask }))

    render(
      <Item
        task={{
          id: 'task-2',
          text: 'Read docs',
          completed: false,
          date: '21/03/2026 10:00',
          priority: 'low'
        }}
      />
    )

    const input = screen.getByPlaceholderText('Write a new task')
    fireEvent.change(input, { target: { value: 'Read testing docs' } })

    expect(updateTask).toHaveBeenLastCalledWith('task-2', {
      text: 'Read testing docs'
    })

    await user.click(
      screen.getByRole('checkbox', {
        name: 'Toggle completion for task: Read docs'
      })
    )

    expect(updateTask).toHaveBeenCalledWith('task-2', {
      completed: true
    })
  })

  it('Given an empty task text When TaskItem is rendered Then checkbox is disabled', () => {
    mockUseTaskContext.mockReturnValue(createContext({}))

    render(
      <Item
        task={{
          id: 'task-3',
          text: '   ',
          completed: false,
          date: '',
          priority: 'high'
        }}
      />
    )

    expect(
      screen.getByRole('checkbox', { name: 'Toggle task completion' })
    ).toBeDisabled()
  })
})
