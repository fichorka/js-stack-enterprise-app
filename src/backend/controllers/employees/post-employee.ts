import { HttpRequest, HttpResponse } from '../types'
import { AddEmployee } from '../../use-cases/employee'

const makePostEmployee: MakePostEmployee = function ({ addEmployee }) {
  const postEmployee: PostEmployee = async function (httpRequest) {
    try {
      const newEmployee = await addEmployee(httpRequest.body)

      return {
        body: {
          meta: {
            status: 'success'
          },
          result: newEmployee
        }
      }
    } catch (error) {
      console.log(error)

      return {
        body: {
          meta: {
            status: 'fail',
            message: error.message
          }
        }
      }
    }
  }
  return postEmployee
}

export { makePostEmployee }

type MakePostEmployee = (dependencies: {
  addEmployee: AddEmployee
}) => PostEmployee

type PostEmployee = (httpRequest: HttpRequest) => Promise<HttpResponse>
