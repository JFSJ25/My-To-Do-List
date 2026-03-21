import { useEffect } from 'react'
import type { FilterStatus } from '../types/filterStatus'
import type { Task } from '../types/task'
import { saveInLocalStorageDebounce } from '../utilities/localStorage'
import { FILTER_KEY } from '../constants/storageKeys'

export function useTaskPersistence(taskList: Task[], filter: FilterStatus) {
  useEffect(() => {
    saveInLocalStorageDebounce(taskList)
  }, [taskList])

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter)
  }, [filter])
}
