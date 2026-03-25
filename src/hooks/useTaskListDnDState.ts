import { useCallback, useMemo, useState } from 'react'

import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

import { DND_HINT_DISMISSED_KEY } from '../constants/storageKeys'

type UseTaskListDnDStateParams = {
  isCustomSort: boolean
  reorderTask: (sourceId: string, targetId: string) => void
}

export function useTaskListDnDState({
  isCustomSort,
  reorderTask
}: UseTaskListDnDStateParams) {
  const [isHintDismissed, setIsHintDismissed] = useState(() => {
    return localStorage.getItem(DND_HINT_DISMISSED_KEY) === '1'
  })
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const showDndHint = useMemo(() => {
    return isCustomSort && !isHintDismissed
  }, [isCustomSort, isHintDismissed])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 6
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const dismissDndHint = useCallback(() => {
    setIsHintDismissed(true)
    localStorage.setItem(DND_HINT_DISMISSED_KEY, '1')
  }, [])

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      if (!isCustomSort) return

      if (!isHintDismissed) {
        dismissDndHint()
      }

      setActiveTaskId(String(event.active.id))
    },
    [dismissDndHint, isCustomSort, isHintDismissed]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (!isCustomSort) {
        setActiveTaskId(null)
        return
      }

      const sourceId = String(event.active.id)
      const targetId = event.over ? String(event.over.id) : null

      if (targetId) {
        reorderTask(sourceId, targetId)
      }

      setActiveTaskId(null)
    },
    [isCustomSort, reorderTask]
  )

  const handleDragCancel = useCallback(() => {
    setActiveTaskId(null)
  }, [])

  return {
    sensors,
    activeTaskId,
    showDndHint,
    dismissDndHint,
    handleDragStart,
    handleDragEnd,
    handleDragCancel
  }
}
