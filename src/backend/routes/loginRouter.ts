import { Router } from 'express'
import { postLogin } from '../controllers'
import { makeExpressCallback } from '../express-callback'

const router = Router()

router.get('/', (req, res) => {
  if (req?.session?.username) {
    res.json({ isSuccess: true, username: req.session.username })
  } else {
    res.status(401).json({ isSuccess: false })
  }
})

router.post('/', makeExpressCallback(postLogin))

export { router as loginRouter }
