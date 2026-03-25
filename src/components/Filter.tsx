import { useTaskContext } from '../context/TaskContext.tsx'
import {
  FilterStatus,
  type FilterStatus as FilterStatusType
} from '../types/filterStatus.ts'

export function Filter() {
  const { handleFilter, filter } = useTaskContext()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilter(e.target.value as FilterStatusType)
  }

  return (
    <div className="filter">
      <select
        id="filter"
        aria-label="Filter tasks"
        value={filter}
        onChange={handleChange}
      >
        <option value={FilterStatus.all}>All</option>
        <option value={FilterStatus.completed}>Completed</option>
        <option value={FilterStatus.pending}>Pending</option>
      </select>
    </div>
  )
}
