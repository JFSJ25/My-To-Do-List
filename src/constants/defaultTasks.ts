import type { Task } from '../types/task'
import { getCurrentDate } from '../utilities/currentDate'

export function getDefaultTasks(): Task[] {
  return [
    {
      id: crypto.randomUUID(),
      text: 'Train',
      completed: false,
      date: getCurrentDate()
    },
    {
      id: crypto.randomUUID(),
      text: 'Greet',
      completed: true,
      date: getCurrentDate()
    },
    {
      id: crypto.randomUUID(),
      text: 'Eat',
      completed: false,
      date: getCurrentDate()
    },
    {
      id: crypto.randomUUID(),
      text: 'Sleep',
      completed: true,
      date: getCurrentDate()
    }
  ]
}
