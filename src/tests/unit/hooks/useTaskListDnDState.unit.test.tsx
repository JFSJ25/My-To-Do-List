import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { DND_HINT_DISMISSED_KEY } from '../../../constants/storageKeys'
import { useTaskListDnDState } from '../../../hooks/useTaskListDnDState'

describe('useTaskListDnDState', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('Given custom sort and hint not dismissed When drag starts Then it sets active task and persists hint dismissal', () => {
    const reorderTask = vi.fn()
    const { result } = renderHook(() =>
      useTaskListDnDState({ isCustomSort: true, reorderTask })
    )

    expect(result.current.showDndHint).toBe(true)

    act(() => {
      result.current.handleDragStart({ active: { id: 'a' } } as never)
    })

    expect(result.current.activeTaskId).toBe('a')
    expect(localStorage.getItem(DND_HINT_DISMISSED_KEY)).toBe('1')
    expect(result.current.showDndHint).toBe(false)
  })

  it('Given custom sort When drag ends with target and cancel is called Then reorder is invoked and active id is reset', () => {
    const reorderTask = vi.fn()
    const { result } = renderHook(() =>
      useTaskListDnDState({ isCustomSort: true, reorderTask })
    )

    act(() => {
      result.current.handleDragStart({ active: { id: 'source' } } as never)
    })

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'source' },
        over: { id: 'target' }
      } as never)
    })

    expect(reorderTask).toHaveBeenCalledWith('source', 'target')
    expect(result.current.activeTaskId).toBeNull()

    act(() => {
      result.current.handleDragStart({ active: { id: 'x' } } as never)
      result.current.handleDragCancel()
    })

    expect(result.current.activeTaskId).toBeNull()
  })

  it('Given custom sort and no drop target When drag ends Then reorder is not called', () => {
    const reorderTask = vi.fn()
    const { result } = renderHook(() =>
      useTaskListDnDState({ isCustomSort: true, reorderTask })
    )

    act(() => {
      result.current.handleDragEnd({
        active: { id: 'source' },
        over: null
      } as never)
    })

    expect(reorderTask).not.toHaveBeenCalled()
    expect(result.current.activeTaskId).toBeNull()
  })

  it('Given non custom sort When drag events are triggered Then start and end do not reorder', () => {
    const reorderTask = vi.fn()
    const { result } = renderHook(() =>
      useTaskListDnDState({ isCustomSort: false, reorderTask })
    )

    expect(result.current.showDndHint).toBe(false)

    act(() => {
      result.current.handleDragStart({ active: { id: 'nope' } } as never)
      result.current.handleDragEnd({
        active: { id: 'nope' },
        over: { id: 'target' }
      } as never)
    })

    expect(reorderTask).not.toHaveBeenCalled()
    expect(result.current.activeTaskId).toBeNull()
  })

  it('Given hint already dismissed in storage When hook initializes Then hint is hidden', () => {
    localStorage.setItem(DND_HINT_DISMISSED_KEY, '1')
    const reorderTask = vi.fn()

    const { result } = renderHook(() =>
      useTaskListDnDState({ isCustomSort: true, reorderTask })
    )

    expect(result.current.showDndHint).toBe(false)
  })
})
