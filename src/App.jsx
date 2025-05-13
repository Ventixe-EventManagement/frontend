import { Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/events" element={<Events />} />
    </Routes>
  )
}

export default App
