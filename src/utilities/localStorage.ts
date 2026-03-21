import type { Task } from '../types/task'
import type { FilterStatus } from '../types/filterStatus'
import { getDefaultTasks } from '../constants/defaultTasks'
import type { Theme } from '../types/theme'
import { TASKS_KEY, FILTER_KEY, THEME_KEY } from '../constants/storageKeys'
import { debounce } from './debounce'

export const getSaveTasks = (): Task[] => {
  const data = localStorage.getItem(TASKS_KEY)
  if (!data) return getDefaultTasks()

  try {
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return getDefaultTasks()
    return parsed
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error)
    return getDefaultTasks()
  }
}

export const getSaveFilter = (): FilterStatus => {
  const data = localStorage.getItem(FILTER_KEY)
  if (!data || !['all', 'pending', 'completed'].includes(data)) return 'all'
  return data as FilterStatus
}

export const getSaveTheme = (): Theme => {
  const data = localStorage.getItem(THEME_KEY)
  if (!data || !['light', 'dark'].includes(data)) return 'dark'
  return data as Theme
}

export function clearLocalStorage() {
  localStorage.removeItem(TASKS_KEY)
  localStorage.removeItem(FILTER_KEY)
  localStorage.removeItem(THEME_KEY)
}

function saveInLocalStorage(taskList: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(taskList))
}

export const saveInLocalStorageDebounce = debounce(saveInLocalStorage, 500)
