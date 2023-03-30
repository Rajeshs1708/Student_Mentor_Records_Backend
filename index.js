require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./connection')
const mentorRoutes = require('./routes/mentor.routes')
const studentRoutes = require('./routes/student.routes')

db()
app.use(cors())
app.use(express.json())

app.use('/api/mentor', mentorRoutes)
app.use('/api/student', studentRoutes)
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Mentor & Student Records app')
})

app.listen(process.env.PORT, () => {
  console.log(`Listening to localhost ${process.env.PORT}`)
})
