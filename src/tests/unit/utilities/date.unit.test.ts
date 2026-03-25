import { describe, expect, it } from 'vitest'

import {
  getDate,
  getDateWithTime,
  getRandomDate,
  parseTaskDate
} from '../../../utilities/date'

describe('date utilities', () => {
  it('Given helpers are called When formatting dates Then output format is dd/mm/yyyy and dd/mm/yyyy hh:mm', () => {
    expect(getDate()).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
    expect(getDateWithTime()).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)
    expect(getRandomDate()).toMatch(/^\d{2}\/\d{2}\/\d{4}$/)
  })

  it('Given an empty value When parsing task date Then it returns positive infinity', () => {
    expect(parseTaskDate('')).toBe(Number.POSITIVE_INFINITY)
  })

  it('Given an invalid value When parsing task date Then it returns positive infinity', () => {
    expect(parseTaskDate('not-a-date')).toBe(Number.POSITIVE_INFINITY)
  })

  it('Given a valid date with time When parsing task date Then it returns expected timestamp', () => {
    const result = parseTaskDate('24/03/2026 15:45')
    const expected = new Date(2026, 2, 24, 15, 45).getTime()

    expect(result).toBe(expected)
  })

  it('Given a valid date without time When parsing task date Then it defaults to midnight', () => {
    const result = parseTaskDate('24/03/2026')
    const expected = new Date(2026, 2, 24, 0, 0).getTime()

    expect(result).toBe(expected)
  })
})
