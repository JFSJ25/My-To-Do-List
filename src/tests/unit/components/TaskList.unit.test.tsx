import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { List } from '../../../components/TaskList'
import { DND_HINT_DISMISSED_KEY } from '../../../constants/storageKeys'
import type { TaskContextValue } from '../../../context/TaskContext'
import { Priority } from '../../../types/priority'
import { SortOption } from '../../../types/sortOption'

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

const baseTasks = [
  {
    id: '1',
    text: 'First',
    completed: false,
    date: '21/03/2026 10:00',
    priority: Priority.low
  },
  {
    id: '2',
    text: 'Second',
    completed: true,
    date: '21/03/2026 10:00',
    priority: Priority.high
  }
]

describe('TaskList visual behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
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
          {
            id: '2',
            text: 'Second',
            completed: true,
            date: '21/03/2026 10:00',
            priority: Priority.high
          }
        ],
        filter: 'pending'
      })
    )

    render(<List />)

    expect(screen.getByText('No pending tasks')).toBeInTheDocument()
  })

  it('Given custom sort and hint not dismissed When TaskList is rendered Then it shows drag hint and allows dismiss', async () => {
    const user = userEvent.setup()

    mockUseTaskContext.mockReturnValue(
      createContext({ taskList: baseTasks, filter: 'all' })
    )

    render(<List />)

    expect(
      screen.getByText(/Tip: Drag tasks using the handle/i)
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Got it' }))

    expect(
      screen.queryByText(/Tip: Drag tasks using the handle/i)
    ).not.toBeInTheDocument()
    expect(localStorage.getItem(DND_HINT_DISMISSED_KEY)).toBe('1')
  })

  it('Given non-custom sort When TaskList is rendered Then it does not show drag hint', () => {
    mockUseTaskContext.mockReturnValue(
      createContext({
        taskList: baseTasks,
        filter: 'all',
        activeSort: SortOption.priority
      })
    )

    render(<List />)

    expect(
      screen.queryByText(/Tip: Drag tasks using the handle/i)
    ).not.toBeInTheDocument()
  })
})
