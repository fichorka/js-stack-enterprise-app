import { HttpRequest, HttpResponse } from '../types'
import { AddDepartment } from '../../use-cases/department'

const makePostDepartment: MakePostDepartment = function ({ addDepartment }) {
  const postDepartment: PostDepartment = async function (httpRequest) {
    try {
      const newDepartment = await addDepartment(httpRequest.body)

      return {
        statusCode: 201,
        body: {
          meta: {
            status: 'success'
          },
          result: newDepartment
        }
      }
    } catch (error) {
      console.log(error)

      return {
        statusCode: 400,
        body: {
          meta: {
            status: 'fail',
            message: error.message
          }
        }
      }
    }
  }
  return postDepartment
}

export { makePostDepartment }

type MakePostDepartment = (dependencies: {
  addDepartment: AddDepartment
}) => PostDepartment

type PostDepartment = (httpRequest: HttpRequest) => Promise<HttpResponse>
