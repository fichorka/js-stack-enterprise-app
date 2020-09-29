import { HttpRequest, HttpResponse } from '../types'
import { FindLogin } from '../../use-cases/login'

const makePostLogin: MakePostLogin = function ({ findLogin }) {
  const postLogin: PostLogin = async function (httpRequest, session) {
    // authenticates user on login by creating a session
    try {
      const loginRequestInfo = httpRequest.body

      const existingLogin = await findLogin(loginRequestInfo.username)

      if (!existingLogin) {
        throw new Error('No user with such username.')
      }

      if (loginRequestInfo.password !== existingLogin.loginPassword) {
        throw new Error('Invalid password.')
      }

      // if login info match, create a session
      session.username = existingLogin.loginUserName

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success',
            isSuccess: 1
          }
        }
      }
    } catch (error) {
      console.log(error)

      return {
        statusCode: 409,
        body: {
          meta: {
            status: 'fail',
            isSuccess: 0,
            message: error.message
          }
        }
      }
    }
  }
  return postLogin
}

export { makePostLogin }

type MakePostLogin = (dependencies: { findLogin: FindLogin }) => PostLogin

type PostLogin = (
  httpRequest: HttpRequest,
  session: any
) => Promise<HttpResponse>
