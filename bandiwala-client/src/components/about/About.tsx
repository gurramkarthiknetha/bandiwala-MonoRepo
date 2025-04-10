import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
	<div className="App">
    <header className="App-header">
      <h1>About Page</h1>
      <p>This is the about page of our React app.</p>
      <Link to="/" className="App-link">
        Go Back Home
      </Link>
    </header>
  </div>
  )
}

export default About
