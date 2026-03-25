import { useCallback, useState } from 'react'

import { useTaskPersistence } from '../hooks/useTaskPersistence'
import { useTaskPersistenceSync } from '../hooks/useTaskPersistenceSync'
import {
  FilterStatus,
  type FilterStatus as FilterStatusType
} from '../types/filterStatus'
import type { Task } from '../types/task'
import { DEFAULT_PRIORITY, PRIORITY } from '../constants/priorities'
import { getSaveFilter, getSaveTasks } from '../utilities/localStorage'
import { TaskContext, type TaskContextValue } from './TaskContext'
import { SortOption } from '../types/sortOption'
import { getDate, parseTaskDate } from '../utilities/date'

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>(getSaveTasks())

  const [filter, setFilter] = useState<FilterStatusType>(getSaveFilter())
  const [activeSort, setActiveSort] = useState<SortOption>(SortOption.custom)

  const sortTasks = useCallback((tasks: Task[], sort: SortOption) => {
    if (sort === SortOption.priority) {
      return [...tasks].sort(
        (a, b) => PRIORITY[b.priority] - PRIORITY[a.priority]
      )
    }

    if (sort === SortOption.date) {
      return [...tasks].sort(
        (a, b) => parseTaskDate(a.date) - parseTaskDate(b.date)
      )
    }

    return tasks
  }, [])

  const addTask = useCallback(() => {
    setTaskList(prev =>
      sortTasks(
        [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: '',
            completed: false,
            date: getDate(),
            priority: DEFAULT_PRIORITY
          }
        ],
        activeSort
      )
    )

    setFilter(FilterStatus.all)
  }, [activeSort, sortTasks])

  const deleteTask = useCallback((id: string) => {
    setTaskList(prev => prev.filter(task => task.id !== id))
  }, [])

  const updateTask = useCallback(
    (id: string, changes: Partial<Omit<Task, 'id'>>) => {
      setTaskList(prev => {
        const nextTasks = prev.map(task =>
          task.id === id ? { ...task, ...changes } : task
        )

        return sortTasks(nextTasks, activeSort)
      })
    },
    [activeSort, sortTasks]
  )

  const reorderTask = useCallback(
    (sourceId: string, targetId: string) => {
      setTaskList(prev => {
        if (activeSort !== SortOption.custom) return prev
        if (sourceId === targetId) return prev

        const sourceIndex = prev.findIndex(task => task.id === sourceId)
        const targetIndex = prev.findIndex(task => task.id === targetId)

        if (sourceIndex === -1 || targetIndex === -1) return prev

        const nextTasks = [...prev]
        const [movedTask] = nextTasks.splice(sourceIndex, 1)
        nextTasks.splice(targetIndex, 0, movedTask)

        return nextTasks
      })
    },
    [activeSort]
  )

  const handleTasks = useCallback(
    (taskList: Task[]) => {
      setTaskList(sortTasks(taskList, activeSort))
    },
    [activeSort, sortTasks]
  )

  const handleFilter = useCallback((filter: FilterStatusType) => {
    setFilter(filter)
  }, [])

  const handleSort = useCallback(
    (sort: SortOption) => {
      setActiveSort(sort)
      setTaskList(prev => sortTasks(prev, sort))
    },
    [sortTasks]
  )

  const clearCompleted = useCallback(() => {
    setTaskList(prev => prev.filter(task => !task.completed))
  }, [])

  useTaskPersistence(taskList, filter)
  useTaskPersistenceSync(handleTasks, handleFilter)

  const contextValue: TaskContextValue = {
    taskList,
    activeSort,
    addTask,
    deleteTask,
    updateTask,
    reorderTask,
    filter,
    handleFilter,
    handleSort,
    clearCompleted
  }

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  )
}
