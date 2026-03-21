import { Item } from './TaskItem'
import { useTaskContext } from '../context/TaskContext'
import { useMemo } from 'react'

export function List() {
  const { taskList, filter } = useTaskContext()

  const filteredTaskList = useMemo(() => {
    return taskList.filter(task => {
      if (filter === 'completed') return task.completed
      if (filter === 'pending') return !task.completed
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
      {filteredTaskList.length ? (
        filteredTaskList.map(task => <Item key={task.id} task={task} />)
      ) : (
        <label>No {filter} tasks</label>
      )}
    </div>
  )
}
