type ThemeType = {
  backgroundColor: string
  color: string
}

export const themes: { [key in 'light' | 'dark']: ThemeType } = {
  light: {
    backgroundColor: '#f5f5f5',
    color: '#333'
  },
  dark: {
    backgroundColor: '#333',
    color: '#f5f5f5'
  }
}
