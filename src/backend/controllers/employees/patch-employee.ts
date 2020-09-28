import { HttpRequest, HttpResponse } from '../types'
import { EditEmployee } from '../../use-cases/employee'

const makePatchEmployee: MakePatchEmployee = function ({ editEmployee }) {
  const patchEmployee: PatchEmployee = async function (httpRequest) {
    try {
      const editedEmployee = await editEmployee(httpRequest.body)

      return {
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
