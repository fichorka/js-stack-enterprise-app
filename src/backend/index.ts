import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import session from 'express-session'
import { SESSSION_OPTIONS } from './config'
import { initializeDb } from './database'
import { departmentsRouter } from './routes/departmentsRouter'
import { employeesRouter } from './routes/employeesRouter'
import { loginRouter } from './routes/loginRouter'

// app
;(async () => {
  await initializeDb()

  console.log('Starting server...')

  const app = express()

  // middleware
  app.use(express.json())
  app.use(session(SESSSION_OPTIONS))

  //routes
  app.use('/login', loginRouter)
  app.use('/departments', departmentsRouter)
  app.use('/employees', employeesRouter)

  app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000')
  })
})()
