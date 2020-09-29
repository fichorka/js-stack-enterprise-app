import { Router } from 'express'
import { postLogout } from '../controllers'
import { makeExpressCallback } from '../express-callback'

const router = Router()

router.post('/', makeExpressCallback(postLogout))

export { router as logoutRouter }
