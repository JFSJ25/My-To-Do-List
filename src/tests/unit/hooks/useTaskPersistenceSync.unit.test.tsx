import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FILTER_KEY, TASKS_KEY } from '../../../constants/storageKeys'
import { useTaskPersistenceSync } from '../../../hooks/useTaskPersistenceSync'

function HookProbe({
  onTasks,
  onFilter
}: {
  onTasks: (taskList: unknown[]) => void
  onFilter: (filter: 'all' | 'completed' | 'pending') => void
}) {
  useTaskPersistenceSync(onTasks as never, onFilter)
  return null
}

describe('useTaskPersistenceSync', () => {
  it('Given tasks and filter storage changes When event is dispatched Then handlers receive synced values', () => {
    const onTasks = vi.fn()
    const onFilter = vi.fn()

    render(<HookProbe onTasks={onTasks} onFilter={onFilter} />)

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: TASKS_KEY,
        newValue: JSON.stringify([{ id: '1', text: 'A' }])
      })
    )

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: FILTER_KEY,
        newValue: 'completed'
      })
    )

    expect(onTasks).toHaveBeenCalledWith([{ id: '1', text: 'A' }])
    expect(onFilter).toHaveBeenCalledWith('completed')
  })

  it('Given null values and unrelated key When storage event is dispatched Then defaults are applied and unrelated keys are ignored', () => {
    const onTasks = vi.fn()
    const onFilter = vi.fn()

    render(<HookProbe onTasks={onTasks} onFilter={onFilter} />)

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: TASKS_KEY,
        newValue: null
      })
    )

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: FILTER_KEY,
        newValue: null
      })
    )

    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'something-else',
        newValue: 'noop'
      })
    )

    expect(onTasks).toHaveBeenCalledWith([])
    expect(onFilter).toHaveBeenCalledWith('all')
    expect(onTasks).toHaveBeenCalledTimes(1)
    expect(onFilter).toHaveBeenCalledTimes(1)
  })
})
