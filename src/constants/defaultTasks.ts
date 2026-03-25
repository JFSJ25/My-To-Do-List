import type { Task } from '../types/task'
import { getRandomDate } from '../utilities/date'
import { Priority } from '../types/priority'

export function getDefaultTasks(): Task[] {
  return [
    {
      id: crypto.randomUUID(),
      text: 'Train',
      completed: false,
      date: getRandomDate(),
      priority: Priority.medium
    },
    {
      id: crypto.randomUUID(),
      text: 'Greet',
      completed: true,
      date: getRandomDate(),
      priority: Priority.low
    },
    {
      id: crypto.randomUUID(),
      text: 'Eat',
      completed: false,
      date: getRandomDate(),
      priority: Priority.high
    },
    {
      id: crypto.randomUUID(),
      text: 'Sleep',
      completed: true,
      date: getRandomDate(),
      priority: Priority.none
    }
  ]
}
