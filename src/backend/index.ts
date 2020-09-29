import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import session from 'express-session'
import { SESSSION_OPTIONS } from './config'

console.log(process.env.MONGO_URI)

const app = express()

//middleware
app.use(session(SESSSION_OPTIONS))

app.get('/', (req, res) => {
  res.type('json')
  res.send({ message: 'Hi!' })
})

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000')
})
