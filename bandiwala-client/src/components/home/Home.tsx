import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
	<div className="App">
    <header className="App-header">
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <Link to="/about" className="App-link">
        Go to About Page
      </Link>
    </header>
  </div>
  )
}

export default Home
