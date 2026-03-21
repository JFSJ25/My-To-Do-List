import { useCallback, useState } from 'react'

import { useTaskPersistence } from '../hooks/useTaskPersistence'
import { useTaskPersistenceSync } from '../hooks/useTaskPersistenceSync'
import type { FilterStatus } from '../types/filterStatus'
import type { Task } from '../types/task'
import { getSaveFilter, getSaveTasks } from '../utilities/localStorage'
import { TaskContext, type TaskContextValue } from './TaskContext'

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>(getSaveTasks())

  const [filter, setFilter] = useState<FilterStatus>(getSaveFilter())

  const addTask = useCallback(() => {
    setTaskList(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: '', completed: false, date: '' }
    ])

    setFilter('all')
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTaskList(prev => prev.filter(task => task.id !== id))
  }, [])

  const updateTask = useCallback(
    (id: string, changes: Partial<Omit<Task, 'id'>>) => {
      setTaskList(prev =>
        prev.map(task => (task.id === id ? { ...task, ...changes } : task))
      )
    },
    []
  )

  const handleTasks = useCallback((taskList: Task[]) => {
    setTaskList(taskList)
  }, [])

  const handleFilter = useCallback((filter: FilterStatus) => {
    setFilter(filter)
  }, [])

  const clearCompleted = useCallback(() => {
    setTaskList(prev => prev.filter(task => !task.completed))
  }, [])

  useTaskPersistence(taskList, filter)
  useTaskPersistenceSync(handleTasks, handleFilter)

  const contextValue: TaskContextValue = {
    taskList,
    addTask,
    deleteTask,
    updateTask,
    filter,
    handleFilter,
    clearCompleted
  }

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  )
}
