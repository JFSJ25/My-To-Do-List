import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  FILTER_KEY,
  TASKS_KEY,
  THEME_KEY
} from '../../../constants/storageKeys'
import {
  getSaveFilter,
  getSaveTasks,
  getSaveTheme
} from '../../../utilities/localStorage'

function mockRandomUUID() {
  let counter = 0
  return vi.spyOn(crypto, 'randomUUID').mockImplementation(() => {
    counter += 1
    return `${counter.toString().padStart(8, '0')}-0000-4000-8000-000000000000`
  })
}

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('Given no saved task list When loading tasks Then it returns default tasks', () => {
    const uuidSpy = mockRandomUUID()

    const tasks = getSaveTasks()

    expect(tasks).toHaveLength(4)
    expect(tasks[0]).toMatchObject({
      id: '00000001-0000-4000-8000-000000000000',
      text: 'Train',
      completed: false
    })
    expect(tasks[1]).toMatchObject({
      id: '00000002-0000-4000-8000-000000000000',
      text: 'Greet',
      completed: true
    })

    uuidSpy.mockRestore()
  })

  it('Given valid JSON in localStorage When loading tasks Then it returns saved tasks', () => {
    const savedTasks = [
      {
        id: '1',
        text: 'Practice tests',
        completed: false,
        date: '20/03/2026 10:00'
      }
    ]

    localStorage.setItem(TASKS_KEY, JSON.stringify(savedTasks))

    expect(getSaveTasks()).toEqual(savedTasks)
  })

  it('Given invalid JSON in localStorage When loading tasks Then it falls back to default tasks', () => {
    const uuidSpy = mockRandomUUID()
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    localStorage.setItem(TASKS_KEY, '{ invalid-json')

    const tasks = getSaveTasks()

    expect(tasks).toHaveLength(4)
    expect(tasks[0].id).toBe('00000001-0000-4000-8000-000000000000')

    errorSpy.mockRestore()
    uuidSpy.mockRestore()
  })

  it('Given a saved pending filter When loading filter Then it returns pending', () => {
    localStorage.setItem(FILTER_KEY, 'pending')

    expect(getSaveFilter()).toBe('pending')
  })

  it('Given an invalid saved filter When loading filter Then it falls back to all', () => {
    localStorage.setItem(FILTER_KEY, 'invalid-filter')

    expect(getSaveFilter()).toBe('all')
  })

  it('Given saved and invalid theme values When loading theme Then it returns saved value or dark fallback', () => {
    localStorage.setItem(THEME_KEY, 'light')
    expect(getSaveTheme()).toBe('light')

    localStorage.setItem(THEME_KEY, 'dark')
    expect(getSaveTheme()).toBe('dark')

    localStorage.setItem(THEME_KEY, 'invalid')
    expect(getSaveTheme()).toBe('dark')
  })
})
