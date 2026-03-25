import {
  FilterStatus,
  type FilterStatus as FilterStatusType
} from '../types/filterStatus'

export const FILTER_OPTIONS: FilterStatusType[] = [
  FilterStatus.all,
  FilterStatus.completed,
  FilterStatus.pending
]
