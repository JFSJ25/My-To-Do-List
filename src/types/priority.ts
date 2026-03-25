export const Priority = {
  none: 'none',
  low: 'low',
  medium: 'medium',
  high: 'high'
} as const

export type Priority = (typeof Priority)[keyof typeof Priority]
