import { useThemeContext } from '../context/ThemeContext'
import { ThemeIcon } from '../icons/ThemeIcon'

export function SwitchTheme() {
  const { toggleTheme, theme } = useThemeContext()

  const handleSwitchTheme = () => {
    toggleTheme()
  }

  return (
    <div className="switch-theme">
      <button className="switch-theme__button" onClick={handleSwitchTheme}>
        <ThemeIcon isDark={theme === 'dark'} />
        Theme
      </button>
    </div>
  )
}
