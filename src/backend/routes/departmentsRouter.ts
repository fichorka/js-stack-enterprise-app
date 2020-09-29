import { Router } from 'express'
import { getDepartments, postDepartment } from '../controllers'
import { makeExpressCallback } from '../express-callback'

const router = Router()

router.get('/', makeExpressCallback(getDepartments))

router.post('/', makeExpressCallback(postDepartment))

export { router as departmentsRouter }
