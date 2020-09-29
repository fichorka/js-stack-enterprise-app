import { Router } from 'express'
import { getEmployees, postEmployee } from '../controllers'
import { makeExpressCallback } from '../express-callback'

const router = Router()

router.get(['/:employeeId', '/'], makeExpressCallback(getEmployees))

router.post('/', makeExpressCallback(postEmployee))

export { router as employeesRouter }
