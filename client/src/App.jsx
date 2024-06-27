import { useState } from 'react'
import PostsList from './features/posts/PostsList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app'>
      <h1>React on Rails Blog</h1>
      <p>Find this application layout in client/src/App.jsx</p>
      <PostsList />

    </div>
    </>
  )
}

export default App
