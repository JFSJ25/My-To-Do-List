import { List } from './TaskList.tsx'
import { Filter } from './Filter.tsx'
import { Sorted } from './Sorted.tsx'
import { useTaskContext } from '../context/TaskContext.tsx'
import { useMemo } from 'react'
import { SwitchTheme } from './SwitchTheme.tsx'
import { AddIcon } from '../icons/AddIcon.tsx'

export function Form() {
  const { addTask, clearCompleted, taskList } = useTaskContext()

  const completedCount = useMemo(() => {
    return taskList.filter(task => task.completed).length
  }, [taskList])

  return (
    <>
      <header className="frm-header">
        <Filter />

        <Sorted />

        <SwitchTheme />

        <button className="add-btn" onClick={addTask}>
          <AddIcon />
          Add
        </button>

        <button className="deleteCompleted-btn" onClick={clearCompleted}>
          Delete completed
        </button>
      </header>

      <p className="task-counter">
        {completedCount} of {taskList.length} completed
      </p>

      <main className="frm-body">
        <List />
      </main>
    </>
  )
}
