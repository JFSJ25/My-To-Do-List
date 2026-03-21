import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import { TaskProvider } from './context/TaskProvider.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <TaskProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </TaskProvider>
)
