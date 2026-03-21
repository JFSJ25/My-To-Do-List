const FilterStatus = {
  Completed: "completed",
  Pending: "pending",
  All: "all"
} as const

export type FilterStatus = typeof FilterStatus[keyof typeof FilterStatus]
