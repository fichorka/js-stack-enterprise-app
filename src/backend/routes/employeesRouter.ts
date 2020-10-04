import { Router } from 'express'
import {
  deleteEmployee,
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

router.patch('/:employeeId', makeExpressCallback(patchEmployee))

router.delete('/:employeeId', makeExpressCallback(deleteEmployee))

export { router as employeesRouter }
