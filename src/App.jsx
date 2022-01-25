import { useState } from 'react'
import './App.css'
import Hangman from './components/Hangman'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Hangman />
    </div>
  )
}

export default App
