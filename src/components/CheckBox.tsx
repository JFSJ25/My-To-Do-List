type CheckBoxProps = {
  checked: boolean
  disabled?: boolean
  onToggle: () => void
  ariaLabel?: string
}

export function CheckBox({
  checked,
  disabled = false,
  onToggle,
  ariaLabel
}: CheckBoxProps) {
  const defaultAriaLabel = checked
    ? 'Mark task as not completed'
    : 'Mark task as completed'

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel ?? defaultAriaLabel}
      disabled={disabled}
      className={`checkbox ${checked ? 'checkbox--checked' : ''}`}
      onClick={onToggle}
    >
      <svg
        className="checkbox__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 12 10 18 20 6" />
      </svg>
    </button>
  )
}
