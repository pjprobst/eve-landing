import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    // Create email entry
    const emailEntry = {
      email: email,
      date: new Date().toISOString()
    }

    // Store in Vercel KV using a list
    // This adds the email to a list called 'emails'
    await kv.lpush('emails', JSON.stringify(emailEntry))

    res.json({ success: true, message: 'Email saved successfully' })
  } catch (error) {
    console.error('Error saving email to KV:', error)
    return res.status(500).json({
      error: 'Failed to save email. Please try again.',
      success: false
    })
  }
}
