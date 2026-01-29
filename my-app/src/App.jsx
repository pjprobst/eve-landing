import { useState } from 'react'
import './App.css'
import demoVideo from './DEMO VIDEO (EVE) .mp4'
import logo from './logo.png'

function App() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }

    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert('Thanks for signing up!')
        setEmail('')
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Could not connect to server. Please make sure the server is running.')
    }
  }

  return (
    <div className="container">
      <img src={logo} alt="EVE Logo" className="logo" />
      <div className="content">
        <h1>POSKO is Coming</h1>
        <p>Get in on something big.</p>
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            className="email-input"
          />
          {error && <span className="error-message">{error}</span>}
          <button type="submit" className="submit-btn">
            Join the Waitlist
          </button>
        </form>
        <video className="demo-video" autoPlay loop muted playsInline>
          <source src={demoVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default App
