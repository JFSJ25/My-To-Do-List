import { useTaskContext } from '../context/TaskContext'
import {
  SortOption,
  type SortOption as SortOptionType
} from '../types/sortOption'

export function Sorted() {
  const { handleSort, activeSort } = useTaskContext()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSort(e.target.value as SortOptionType)
  }

  return (
    <div className="sorted">
      <select
        name="sorted"
        id="sorted"
        onChange={handleChange}
        value={activeSort}
      >
        <option value={SortOption.custom}>Custom (Default)</option>
        <option value={SortOption.priority}>Priority</option>
        <option value={SortOption.date}>Date</option>
      </select>
    </div>
  )
}
