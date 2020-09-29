import { HttpRequest, HttpResponse } from '../types'
import { EditEmployee } from '../../use-cases/employee'

const makePatchEmployee: MakePatchEmployee = function ({ editEmployee }) {
  const patchEmployee: PatchEmployee = async function (httpRequest) {
    try {
      const editedEmployee = await editEmployee(httpRequest.body)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: editedEmployee
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
  return patchEmployee
}

export { makePatchEmployee }

type MakePatchEmployee = (dependencies: {
  editEmployee: EditEmployee
}) => PatchEmployee

type PatchEmployee = (httpRequest: HttpRequest) => Promise<HttpResponse>
