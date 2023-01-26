import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setCount] = useState('hi')

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then((data) => {
        setCount(data)
      })
  }, [])

  return (
    <div className="div">
      {data}
    </div>
  )
}

export default App
