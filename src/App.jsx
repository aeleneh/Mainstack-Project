import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import AnalysticPage from './components/AnalysticPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar />
     <AnalysticPage />
    </>
  )
}

export default App
