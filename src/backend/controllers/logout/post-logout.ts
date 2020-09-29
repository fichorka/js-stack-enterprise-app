import { HttpRequest, HttpResponse } from '../types'

const makePostLogout: MakePostLogout = function () {
  const postLogout: PostLogout = async function (httpRequest, session) {
    // logs a user out
    try {
      if (!session.username) {
        throw new Error('Not logged in.')
      }

      // if logged in, delete session
      session.destroy()

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success',
            isSuccess: true
          }
        }
      }
    } catch (error) {
      console.log(error)

      return {
        statusCode: 400,
        body: {
          meta: {
            status: 'fail',
            isSuccess: false,
            message: error.message
          }
        }
      }
    }
  }
  return postLogout
}

export { makePostLogout }

type MakePostLogout = () => PostLogout

type PostLogout = (
  httpRequest: HttpRequest,
  session: any
) => Promise<HttpResponse>
