import { useTaskContext } from '../context/TaskContext.tsx'
import type { FilterStatus } from '../types/filterStatus.ts'

export function Filter() {
  const { handleFilter, filter } = useTaskContext()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilter(e.target.value as FilterStatus)
  }

  return (
    <div className="filter">
      <select id="filter" value={filter} onChange={handleChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  )
}
