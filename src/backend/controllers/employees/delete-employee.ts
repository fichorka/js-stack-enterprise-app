import { HttpRequest, HttpResponse } from '../types'
import { RemoveEmployee } from '../../use-cases/employee'

const makeDeleteEmployee: MakeDeleteEmployee = function ({
  removeEmployee
}) {
  const deleteEmployee: DeleteEmployee = async function (
    httpRequest
  ) {
    try {
      const { employeeId } = httpRequest?.pathParams

      if (!employeeId) {
        throw new Error('No Id.')
      }

      const removedEmployee = await removeEmployee(employeeId)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: removedEmployee
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
  return deleteEmployee
}

export { makeDeleteEmployee }

type MakeDeleteEmployee = (dependencies: {
  removeEmployee: RemoveEmployee
}) => DeleteEmployee

type DeleteEmployee = (
  httpRequest: HttpRequest
) => Promise<HttpResponse>
