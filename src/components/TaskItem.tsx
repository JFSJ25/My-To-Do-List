import '../App.css'
import type { Task } from '../types/task'
import { CheckBox } from './CheckBox'
import { forwardRef, useId } from 'react'
import { useTaskContext } from '../context/TaskContext.tsx'
import { DeleteIcon } from '../icons/DeleteIcon.tsx'
import { PRIORITY_META, PRIORITY_OPTIONS } from '../constants/priorities.ts'
import type { Priority } from '../types/priority.ts'

type ItemProps = {
  task: Task
  isDraggable?: boolean
  isDragging?: boolean
  dragHandleProps?: React.HTMLAttributes<HTMLSpanElement>
  setDragHandleRef?: (element: HTMLSpanElement | null) => void
} & React.HTMLAttributes<HTMLDivElement>

export const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(
  {
    task,
    className,
    isDraggable = false,
    isDragging = false,
    dragHandleProps,
    setDragHandleRef,
    ...dragProps
  },
  ref
) {
  const { deleteTask, updateTask } = useTaskContext()

  const id = useId()
  const priorityId = `${id}-priority`
  const isEmpty = task.text.trim() == ''
  const priorityMeta = PRIORITY_META[task.priority]
  const disabledSelect = isEmpty || task.completed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(task.id, { text: e.target.value })
  }

  const handleToggle = () => {
    updateTask(task.id, {
      completed: !task.completed
    })
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask(task.id, {
      priority: e.target.value as Priority
    })
  }

  return (
    <div
      ref={ref}
      className={`item item--${task.priority}${isDraggable ? ' item--draggable' : ''}${isDragging ? ' task-dragging' : ''}${className ? ` ${className}` : ''}`}
      {...dragProps}
    >
      {isDraggable && (
        <span
          ref={setDragHandleRef}
          className="drag-handle"
          aria-hidden="true"
          title="Drag to reorder"
          {...dragHandleProps}
        >
          ::
        </span>
      )}

      <CheckBox
        checked={task.completed}
        disabled={isEmpty}
        onToggle={handleToggle}
        ariaLabel={
          isEmpty
            ? 'Toggle task completion'
            : `Toggle completion for task: ${task.text}`
        }
      />

      <div className={`task ${task.completed ? 'task-completed' : ''}`}>
        <div className="task-meta">
          <label htmlFor={id}>Created: {task.date}</label>
          <span
            className={`priority-badge priority-badge--${task.priority}`}
            data-short={priorityMeta.label.charAt(0).toUpperCase()}
          >
            {priorityMeta.label}
          </span>
        </div>

        <input
          type="text"
          id={id}
          placeholder="Write a new task"
          value={task.text}
          onChange={handleChange}
          readOnly={task.completed}
        />

        <div className="priority-control">
          <label htmlFor={priorityId}>Priority</label>
          <select
            id={priorityId}
            value={task.priority}
            onChange={handlePriorityChange}
            disabled={disabledSelect}
            aria-label={
              isEmpty
                ? 'Set task priority'
                : `Set priority for task: ${task.text}`
            }
          >
            {PRIORITY_OPTIONS.map(priority => (
              <option key={priority} value={priority}>
                {PRIORITY_META[priority].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        aria-label="delete task"
        className="delete-btn"
        onClick={() => {
          deleteTask(task.id)
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  )
})
