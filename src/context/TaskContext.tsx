import { createContext, useContext } from 'react'
import type { FilterStatus } from '../types/filterStatus'
import type { Task } from '../types/task'
import type { SortOption } from '../types/sortOption'

export interface TaskContextValue {
  taskList: Task[]
  activeSort: SortOption
  addTask: () => void
  deleteTask: (id: string) => void
  updateTask: (id: string, changes: Partial<Omit<Task, 'id'>>) => void
  reorderTask: (sourceId: string, targetId: string) => void
  filter: FilterStatus
  handleFilter: (filter: FilterStatus) => void
  handleSort: (sort: SortOption) => void
  clearCompleted: () => void
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined
)

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext)
  if (!context)
    throw new Error('useTaskContext must be used within a TaskProvider')
  return context
}
