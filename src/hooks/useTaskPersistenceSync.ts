import { useEffect } from 'react'
import {
  FilterStatus,
  type FilterStatus as FilterStatusType
} from '../types/filterStatus'
import type { Task } from '../types/task'
import { FILTER_KEY, TASKS_KEY } from '../constants/storageKeys'

export function useTaskPersistenceSync(
  handleTaskList: (taskList: Task[]) => void,
  handleFilter: (filter: FilterStatusType) => void
) {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TASKS_KEY) {
        const newTasks = event.newValue ? JSON.parse(event.newValue) : []
        handleTaskList(newTasks)
      }
      if (event.key === FILTER_KEY) {
        const newFilter =
          (event.newValue as FilterStatusType) || FilterStatus.all
        handleFilter(newFilter)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [handleFilter, handleTaskList])
}
