import { useState } from 'react'
import './App.css'

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
      <div className="content">
        <h1>EVE is coming</h1>
        <p>Be the first to know when we launch.</p>
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
            Notify Me
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
