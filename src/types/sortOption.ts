export const SortOption = {
  custom: 'custom',
  priority: 'priority',
  date: 'date'
} as const

export type SortOption = (typeof SortOption)[keyof typeof SortOption]
