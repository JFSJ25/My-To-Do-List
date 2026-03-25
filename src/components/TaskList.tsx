import { SortableTaskItem } from './SortableTaskItem'
import { useTaskContext } from '../context/TaskContext'
import { useMemo } from 'react'
import { FilterStatus } from '../types/filterStatus'
import { SortOption } from '../types/sortOption'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useTaskListDnDState } from '../hooks/useTaskListDnDState'

export function List() {
  const { taskList, filter, activeSort, reorderTask } = useTaskContext()
  const isCustomSort = activeSort === SortOption.custom

  const {
    sensors,
    activeTaskId,
    showDndHint,
    dismissDndHint,
    handleDragStart,
    handleDragEnd,
    handleDragCancel
  } = useTaskListDnDState({
    isCustomSort,
    reorderTask
  })

  const filteredTaskList = useMemo(() => {
    return taskList.filter(task => {
      if (filter === FilterStatus.completed) return task.completed
      if (filter === FilterStatus.pending) return !task.completed
      return true
    })
  }, [taskList, filter])

  if (taskList.length === 0) {
    return (
      <div className="list-items">
        <label>No tasks</label>
      </div>
    )
  }

  return (
    <div className="list-items">
      {isCustomSort && showDndHint && (
        <div className="dnd-hint" role="status">
          <span>
            Tip: Drag tasks using the handle{' ('}
            <strong className="drag-handle">::</strong>). On mobile, long-press
            the handle and drag.
          </span>
          <button type="button" onClick={dismissDndHint}>
            Got it
          </button>
        </div>
      )}

      {filteredTaskList.length ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={filteredTaskList.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredTaskList.map(task => (
              <SortableTaskItem
                key={task.id}
                task={task}
                isCustomSort={isCustomSort}
                isDragging={isCustomSort && activeTaskId === task.id}
              />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <label>No {filter} tasks</label>
      )}
    </div>
  )
}
