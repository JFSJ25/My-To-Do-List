import { Form } from './components/TaskForm.tsx'
import './App.css'
import './responsive.css'

export function App() {
  return (
    <>
      <div className="form">
        <h1 className="frm-title">MY TO DO LIST</h1>
        <Form />
      </div>
    </>
  )
}
