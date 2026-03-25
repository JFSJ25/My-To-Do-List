export function getDate() {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function getDateWithTime() {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${getDate()} ${hours}:${minutes}`
}

export function getRandomDate() {
  const start = new Date(2020, 0, 1).getTime()
  const end = new Date().getTime()
  const randomTime = start + Math.random() * (end - start)
  const date = new Date(randomTime)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function parseTaskDate(value: string): number {
  if (!value) return Number.POSITIVE_INFINITY

  const [datePart, timePart = '00:00'] = value.split(' ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)

  if ([day, month, year, hours, minutes].some(part => Number.isNaN(part))) {
    return Number.POSITIVE_INFINITY
  }

  return new Date(year, month - 1, day, hours, minutes).getTime()
}
