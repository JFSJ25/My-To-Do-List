import type { Priority } from './priority'

export type Task = {
  id: string
  text: string
  completed: boolean
  date: string
  priority: Priority
}
