import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function handler(req, res) {
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

  // NOTE: File-based storage doesn't work well with Vercel serverless functions
  // Consider using a database (e.g., Vercel KV, PostgreSQL, MongoDB) for production
  const emailsFile = path.join(__dirname, '..', 'emails.json')

  let emails = []
  try {
    if (fs.existsSync(emailsFile)) {
      emails = JSON.parse(fs.readFileSync(emailsFile, 'utf-8'))
    }
  } catch (error) {
    console.error('Error reading emails file:', error)
  }

  emails.push({
    email: email,
    date: new Date().toISOString()
  })

  try {
    fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2))
  } catch (error) {
    console.error('Error writing emails file:', error)
    return res.status(500).json({
      error: 'Failed to save email. Consider using a database for production.',
      success: false
    })
  }

  res.json({ success: true, message: 'Email saved successfully' })
}
