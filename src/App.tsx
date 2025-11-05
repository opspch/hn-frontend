import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-xl'>Hello world</div>
    </>
  )
}

export default App
