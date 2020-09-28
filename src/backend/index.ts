import dotenv from 'dotenv'
dotenv.config()
import express from 'express'

console.log(process.env.MONGO_URI)

const app = express()

app.get('/', (req, res) => {
  res.type('json')
  res.send({ message: 'Hi!' })
})

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000')
})
