import { Router } from 'express'
import {
  getEmployees,
  patchEmployee,
  postEmployee
} from '../controllers'
import { makeExpressCallback } from '../express-callback'
import jwt from 'express-jwt'
import { TOKEN_SECRET } from '../config'

const router = Router()

// jwt authorization
router.use(jwt({ secret: TOKEN_SECRET, algorithms: ['HS256'] }))

router.get(['/:employeeId', '/'], makeExpressCallback(getEmployees))

router.post('/', makeExpressCallback(postEmployee))

router.patch('/', makeExpressCallback(patchEmployee))

export { router as employeesRouter }
