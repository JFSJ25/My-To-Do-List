export function ThemeIcon({
  height = 24,
  width = 24,
  isDark = false
}: {
  height?: number
  width?: number
  isDark?: boolean
}) {
  return isDark ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="white"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.5A9.5 9.5 0 1 1 11.5 3a7.5 7.5 0 1 0 9.5 9.5z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="black"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" />
      <g stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </g>
    </svg>
  )
}
