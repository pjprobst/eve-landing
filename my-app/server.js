import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const emailsFilePath = path.join(__dirname, 'emails.json')

if (!fs.existsSync(emailsFilePath)) {
  fs.writeFileSync(emailsFilePath, JSON.stringify([]))
}

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const emails = JSON.parse(fs.readFileSync(emailsFilePath, 'utf-8'))
  const newEntry = {
    email,
    date: new Date().toISOString()
  }

  emails.push(newEntry)
  fs.writeFileSync(emailsFilePath, JSON.stringify(emails, null, 2))

  res.json({ success: true, message: 'Email saved successfully' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
