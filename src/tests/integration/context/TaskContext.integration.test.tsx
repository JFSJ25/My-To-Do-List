import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { FILTER_KEY, TASKS_KEY } from '../../../constants/storageKeys'
import { useTaskContext } from '../../../context/TaskContext'
import { TaskProvider } from '../../../context/TaskProvider'
import { SortOption } from '../../../types/sortOption'

function ContextProbe() {
  const {
    taskList,
    filter,
    activeSort,
    addTask,
    clearCompleted,
    handleFilter,
    handleSort,
    deleteTask,
    updateTask,
    reorderTask
  } = useTaskContext()

  return (
    <section>
      <p data-testid="count">{taskList.length}</p>
      <p data-testid="filter">{filter}</p>
      <p data-testid="active-sort">{activeSort}</p>
      <p data-testid="order">{taskList.map(task => task.id).join(',')}</p>
      <button onClick={addTask}>add-task</button>
      <button onClick={clearCompleted}>clear-completed</button>
      <button onClick={() => handleFilter('completed')}>
        set-completed-filter
      </button>
      <button onClick={() => handleSort(SortOption.priority)}>
        set-priority-sort
      </button>
      <button onClick={() => handleSort(SortOption.custom)}>
        set-custom-sort
      </button>
      <button onClick={() => reorderTask('todo', 'done')}>
        reorder-todo-to-top
      </button>
      <button onClick={() => deleteTask('done')}>delete-done</button>
      <button
        onClick={() =>
          updateTask('todo', { text: 'Updated task', completed: true })
        }
      >
        update-todo
      </button>
      <p data-testid="todo-text">
        {taskList.find(task => task.id === 'todo')?.text ?? 'missing'}
      </p>
      <p data-testid="todo-completed">
        {String(taskList.find(task => task.id === 'todo')?.completed ?? false)}
      </p>
    </section>
  )
}

function setStoredTasks() {
  localStorage.setItem(
    TASKS_KEY,
    JSON.stringify([
      {
        id: 'done',
        text: 'Completed task',
        completed: true,
        date: '20/03/2026 10:00',
        priority: 'low'
      },
      {
        id: 'todo',
        text: 'Pending task',
        completed: false,
        date: '19/03/2026 10:00',
        priority: 'high'
      }
    ])
  )
  localStorage.setItem(FILTER_KEY, 'pending')
}

describe('TaskProvider and useTaskContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Given no TaskProvider When useTaskContext is called Then it throws an error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<ContextProbe />)).toThrow(
      'useTaskContext must be used within a TaskProvider'
    )

    spy.mockRestore()
  })

  it('Given saved state When context actions are triggered Then state updates correctly', async () => {
    const user = userEvent.setup()
    setStoredTasks()

    render(
      <TaskProvider>
        <ContextProbe />
      </TaskProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('2')
    expect(screen.getByTestId('filter')).toHaveTextContent('pending')

    await user.click(
      screen.getByRole('button', { name: 'set-completed-filter' })
    )
    expect(screen.getByTestId('filter')).toHaveTextContent('completed')

    await user.click(screen.getByRole('button', { name: 'add-task' }))
    expect(screen.getByTestId('count')).toHaveTextContent('3')
    // addTask always resets the filter to all so new tasks are visible.
    expect(screen.getByTestId('filter')).toHaveTextContent('all')

    await user.click(screen.getByRole('button', { name: 'update-todo' }))
    expect(screen.getByTestId('todo-text')).toHaveTextContent('Updated task')
    expect(screen.getByTestId('todo-completed')).toHaveTextContent('true')

    await user.click(screen.getByRole('button', { name: 'delete-done' }))
    expect(screen.getByTestId('count')).toHaveTextContent('2')

    await user.click(screen.getByRole('button', { name: 'clear-completed' }))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('Given tasks with different priorities When sort and reorder actions are triggered Then task order follows active sort rules', async () => {
    const user = userEvent.setup()
    setStoredTasks()

    render(
      <TaskProvider>
        <ContextProbe />
      </TaskProvider>
    )

    expect(screen.getByTestId('active-sort')).toHaveTextContent(
      SortOption.custom
    )
    expect(screen.getByTestId('order')).toHaveTextContent('done,todo')

    await user.click(screen.getByRole('button', { name: 'set-priority-sort' }))

    expect(screen.getByTestId('active-sort')).toHaveTextContent(
      SortOption.priority
    )
    expect(screen.getByTestId('order')).toHaveTextContent('todo,done')

    await user.click(
      screen.getByRole('button', { name: 'reorder-todo-to-top' })
    )
    expect(screen.getByTestId('order')).toHaveTextContent('todo,done')

    await user.click(screen.getByRole('button', { name: 'set-custom-sort' }))
    await user.click(
      screen.getByRole('button', { name: 'reorder-todo-to-top' })
    )

    expect(screen.getByTestId('active-sort')).toHaveTextContent(
      SortOption.custom
    )
    expect(screen.getByTestId('order')).toHaveTextContent('done,todo')
  })
})
