import { Router } from 'express'
import { getEmployees, postEmployee } from '../controllers'
import { makeExpressCallback } from '../express-callback'
import { authorize } from '../middleware'

const router = Router()

// authorization middleware
router.use(authorize)

router.get(['/:employeeId', '/'], makeExpressCallback(getEmployees))

router.post('/', makeExpressCallback(postEmployee))

export { router as employeesRouter }
