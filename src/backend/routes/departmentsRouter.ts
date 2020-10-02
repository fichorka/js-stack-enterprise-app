import { Router } from 'express'
import {
  getDepartments,
  patchDepartment,
  postDepartment
} from '../controllers'
import { makeExpressCallback } from '../express-callback'
import { authorize } from '../middleware'

const router = Router()

// authorization middleware
router.use(authorize)

router.get(
  ['/:departmentId', '/'],
  makeExpressCallback(getDepartments)
)

router.post('/', makeExpressCallback(postDepartment))

router.patch('/:departmentId', makeExpressCallback(patchDepartment))

export { router as departmentsRouter }
