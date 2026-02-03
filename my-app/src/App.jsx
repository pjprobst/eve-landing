import { useState } from 'react'
import './App.css'
import demoVideo from './MEET POSKO.mp4'
import logo from './logo.png'

function App() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        const data = await response.json()
        setSuccessMessage(data.message)
        if (!data.duplicate) {
          setEmail('')
        }
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setError('Could not connect to server. Please try again later.')
    }
  }

  return (
    <div className="container">
      <img src={logo} alt="EVE Logo" className="logo" />
      <div className="content">
        <h1>POSKO is Coming</h1>
        <p>Get in on something big.</p>
        <video className="demo-video" autoPlay loop muted playsInline>
          <source src={demoVideo} type="video/mp4" />
        </video>
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
              setSuccessMessage('')
            }}
            className="email-input"
          />
          {error && <span className="error-message">{error}</span>}
          {successMessage && <span className="success-message">{successMessage}</span>}
          <button type="submit" className="submit-btn">
            Join the Waitlist
          </button>
        </form>
        <div className="footer">
          © 2025 POSKO
          <a href="#privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  )
}

export default App
