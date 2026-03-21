import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { List } from '../../../components/TaskList'
import type { TaskContextValue } from '../../../context/TaskContext'

const mockUseTaskContext = vi.fn<() => TaskContextValue>()

vi.mock('../../../context/TaskContext', () => ({
  useTaskContext: () => mockUseTaskContext()
}))

vi.mock('../../../components/TaskItem', () => ({
  Item: ({ task }: { task: { text: string } }) => <p>{task.text}</p>
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

const baseTasks = [
  { id: '1', text: 'First', completed: false, date: '21/03/2026 10:00' },
  { id: '2', text: 'Second', completed: true, date: '21/03/2026 10:00' }
]

describe('TaskList visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Given an empty task list When TaskList is rendered Then it shows No tasks', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({ taskList: [], filter: 'all' })
    )

    render(<List />)

    expect(screen.getByText('No tasks')).toBeInTheDocument()
  })

  it('Given tasks and all filter When TaskList is rendered Then it shows all tasks', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({ taskList: baseTasks, filter: 'all' })
    )

    render(<List />)

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('Given tasks and completed filter When TaskList is rendered Then it shows only completed tasks', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({ taskList: baseTasks, filter: 'completed' })
    )

    render(<List />)

    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('Given no pending tasks and pending filter When TaskList is rendered Then it shows No pending tasks', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({
        taskList: [
          { id: '2', text: 'Second', completed: true, date: '21/03/2026 10:00' }
        ],
        filter: 'pending'
      })
    )

    render(<List />)

    expect(screen.getByText('No pending tasks')).toBeInTheDocument()
  })
})
