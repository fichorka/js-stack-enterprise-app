import { Router } from 'express'
import {
  getDepartments,
  patchDepartment,
  postDepartment
} from '../controllers'
import { makeExpressCallback } from '../express-callback'
import jwt from 'express-jwt'
import { TOKEN_SECRET } from '../config'

const router = Router()

// jwt authorization
router.use(jwt({ secret: TOKEN_SECRET, algorithms: ['HS256'] }))

router.get(
  ['/:departmentId', '/'],
  makeExpressCallback(getDepartments)
)

router.post('/', makeExpressCallback(postDepartment))

router.patch('/:departmentId', makeExpressCallback(patchDepartment))

export { router as departmentsRouter }
