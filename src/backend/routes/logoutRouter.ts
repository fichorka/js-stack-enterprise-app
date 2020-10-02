import { Router } from 'express'
import { postLogout } from '../controllers'
import { makeExpressCallback } from '../express-callback'
import { authorize } from '../middleware'

const router = Router()

// authorization middleware
router.use(authorize)

router.post('/', makeExpressCallback(postLogout))

export { router as logoutRouter }
