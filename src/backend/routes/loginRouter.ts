import { Router } from 'express'
import { postLogin } from '../controllers'
import { makeExpressCallback } from '../express-callback'

const router = Router()

router.post('/', makeExpressCallback(postLogin))

export { router as loginRouter }
