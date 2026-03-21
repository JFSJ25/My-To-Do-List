import '../App.css'
import type { Task } from '../types/task'
import { CheckBox } from './CheckBox'
import { useId } from 'react'
import { getCurrentDate } from '../utilities/currentDate.ts'
import { useTaskContext } from '../context/TaskContext.tsx'
import { DeleteIcon } from '../icons/DeleteIcon.tsx'

export function Item({ task }: { task: Task }) {
  const { deleteTask, updateTask } = useTaskContext()

  const id = useId()
  const isEmpty = task.text.trim() == ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask(task.id, { text: e.target.value, date: getCurrentDate() })
  }

  const handleToggle = () => {
    updateTask(task.id, {
      completed: !task.completed,
      date: getCurrentDate()
    })
  }

  return (
    <>
      <div className="item">
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
          {!isEmpty && <label htmlFor={id}>Last update: {task.date}</label>}

          <input
            type="text"
            id={id}
            placeholder="Write a new task"
            value={task.text}
            onChange={handleChange}
            readOnly={task.completed}
          />
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
    </>
  )
}
