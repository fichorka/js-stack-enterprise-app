const ONE_HOUR = 1000 * 60 * 60

const { SESSION_SECRET = 'secret', SESSION_MAX_AGE = ONE_HOUR } = process.env

const SESSSION_OPTIONS = {
  name: 'sessionId',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: +SESSION_MAX_AGE
  }
}

export { SESSSION_OPTIONS }
