import type { Task } from '../types/task'
import {
  FilterStatus,
  type FilterStatus as FilterStatusType
} from '../types/filterStatus'
import { getDefaultTasks } from '../constants/defaultTasks'
import type { Theme } from '../types/theme'
import { TASKS_KEY, FILTER_KEY, THEME_KEY } from '../constants/storageKeys'
import { debounce } from './debounce'
import { DEFAULT_PRIORITY, PRIORITY_OPTIONS } from '../constants/priorities'
import type { Priority } from '../types/priority'

function isPriority(value: unknown): value is Priority {
  return (
    typeof value === 'string' && PRIORITY_OPTIONS.includes(value as Priority)
  )
}

function normalizeTasks(rawTasks: unknown[]): Task[] {
  return rawTasks.map(rawTask => {
    const task = rawTask as Partial<Task>

    return {
      id: typeof task.id === 'string' ? task.id : crypto.randomUUID(),
      text: typeof task.text === 'string' ? task.text : '',
      completed: Boolean(task.completed),
      date: typeof task.date === 'string' ? task.date : '',
      priority: isPriority(task.priority) ? task.priority : DEFAULT_PRIORITY
    }
  })
}

export const getSaveTasks = (): Task[] => {
  const data = localStorage.getItem(TASKS_KEY)
  if (!data) return getDefaultTasks()

  try {
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed)) return getDefaultTasks()
    return normalizeTasks(parsed)
  } catch (error) {
    console.error('Error parsing tasks from localStorage:', error)
    return getDefaultTasks()
  }
}

export const getSaveFilter = (): FilterStatusType => {
  const data = localStorage.getItem(FILTER_KEY)
  const validFilters = Object.values(FilterStatus)
  if (!data || !validFilters.includes(data as FilterStatusType)) {
    return FilterStatus.all
  }

  return data as FilterStatusType
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
