export const FilterStatus = {
  all: 'all',
  completed: 'completed',
  pending: 'pending'
} as const

export type FilterStatus = (typeof FilterStatus)[keyof typeof FilterStatus]
