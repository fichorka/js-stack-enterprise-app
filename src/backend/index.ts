import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { initializeDb } from './database'
import {
  departmentsRouter,
  employeesRouter,
  loginRouter
} from './routes'

// start server
;(async () => {
  await initializeDb()

  console.log('Starting server...')

  const app = express()

  // middleware
  app.use(cors())
  app.use(express.json())

  //routes
  app.use('/login', loginRouter)
  app.use('/departments', departmentsRouter)
  app.use('/employees', employeesRouter)

  app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000')
  })
})()
