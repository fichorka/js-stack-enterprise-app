import { Router } from 'express'
import {
  deleteDepartment,
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

router.delete('/:departmentId', makeExpressCallback(deleteDepartment))

export { router as departmentsRouter }
