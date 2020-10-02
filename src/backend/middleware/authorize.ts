import { Handler } from 'express'

const authorize: Handler = (req, res, next) => {
  if (req?.session?.username) {
    next()
  } else {
    res.status(401).json({
      meta: {
        status: 'fail',
        isFail: true,
        message: 'Unauthorized.'
      }
    })
  }
}

export { authorize }
