import { useEffect } from 'react'
import type { FilterStatus } from '../types/filterStatus'
import type { Task } from '../types/task'
import { FILTER_KEY, TASKS_KEY } from '../constants/storageKeys'

export function useTaskPersistenceSync(
  handleTaskList: (taskList: Task[]) => void,
  handleFilter: (filter: FilterStatus) => void
) {
  useEffect(() => {
    // Esto es para sincronizar el estado con lo que hay en localStorage, en caso de que haya cambiado por fuera de la app (otra pestaña, por ejemplo)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === TASKS_KEY) {
        const newTasks = event.newValue ? JSON.parse(event.newValue) : []
        // saveInLocalStorageDebounce(newTasks)
        handleTaskList(newTasks)
      }
      if (event.key === FILTER_KEY) {
        const newFilter = (event.newValue as FilterStatus) || 'all'
        // localStorage.setItem(FILTER_KEY, newFilter)
        handleFilter(newFilter)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [handleFilter, handleTaskList])
}
