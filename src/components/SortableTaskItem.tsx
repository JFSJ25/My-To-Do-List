import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Item } from './TaskItem'
import type { Task } from '../types/task'

type SortableTaskItemProps = {
  task: Task
  isCustomSort: boolean
  isDragging: boolean
}

export function SortableTaskItem({
  task,
  isCustomSort,
  isDragging
}: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({
    id: task.id,
    disabled: !isCustomSort
  })

  return (
    <Item
      ref={setNodeRef}
      task={task}
      isDraggable={isCustomSort}
      isDragging={isDragging}
      style={{
        transform: CSS.Transform.toString(transform),
        transition
      }}
      setDragHandleRef={
        setActivatorNodeRef as (element: HTMLSpanElement | null) => void
      }
      dragHandleProps={
        { ...attributes, ...listeners } as React.HTMLAttributes<HTMLSpanElement>
      }
    />
  )
}
