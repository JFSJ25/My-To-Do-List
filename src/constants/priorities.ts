import { Priority } from '../types/priority'
import type { Priority as TaskPriority } from '../types/priority'

type PriorityMeta = {
  label: string
  color: string
}

export const PRIORITY_OPTIONS: TaskPriority[] = [
  Priority.none,
  Priority.low,
  Priority.medium,
  Priority.high
]

export const PRIORITY_META: Record<TaskPriority, PriorityMeta> = {
  [Priority.none]: {
    label: 'none',
    color: '#9e9e9e'
  },
  [Priority.low]: {
    label: 'low',
    color: '#4caf50'
  },
  [Priority.medium]: {
    label: 'medium',
    color: '#f4b400'
  },
  [Priority.high]: {
    label: 'high',
    color: '#ef5350'
  }
}

export const DEFAULT_PRIORITY = Priority.none

export const PRIORITY = { none: 0, low: 1, medium: 2, high: 3 }
