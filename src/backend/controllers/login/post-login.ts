import { HttpRequest, HttpResponse } from '../types'
import { FindLogin } from '../../use-cases/login'
import { CreateToken } from '..'

const makePostLogin: MakePostLogin = function ({
  findLogin,
  createToken
}) {
  const postLogin: PostLogin = async function (httpRequest) {
    // authenticates user on login by creating a token
    try {
      const { username, password } = httpRequest.body

      const existingLogin = await findLogin(username)

      if (!existingLogin) {
        throw new Error('No user with such username.')
      }

      if (password !== existingLogin.loginPassword) {
        throw new Error('Invalid password.')
      }

      // if login info match, create token
      const token = createToken(username)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success',
            isSuccess: true
          },
          token
        }
      }
    } catch (error) {
      console.log(error)

      return {
        statusCode: 409,
        body: {
          meta: {
            status: 'fail',
            isFail: true,
            message: error.message
          }
        }
      }
    }
  }
  return postLogin
}

export { makePostLogin }

type MakePostLogin = (dependencies: {
  findLogin: FindLogin
  createToken: CreateToken
  TOKEN_SECRET: string
}) => PostLogin

type PostLogin = (httpRequest: HttpRequest) => Promise<HttpResponse>
