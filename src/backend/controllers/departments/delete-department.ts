import { HttpRequest, HttpResponse } from '../types'
import { RemoveDepartment } from '../../use-cases/department'

const makeDeleteDepartment: MakeDeleteDepartment = function ({
  removeDepartment
}) {
  const deleteDepartment: DeleteDepartment = async function (
    httpRequest
  ) {
    try {
      const { departmentId } = httpRequest?.pathParams

      if (!departmentId) {
        throw new Error('No Id.')
      }

      const removedDepartment = await removeDepartment(departmentId)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: removedDepartment
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
  return deleteDepartment
}

export { makeDeleteDepartment }

type MakeDeleteDepartment = (dependencies: {
  removeDepartment: RemoveDepartment
}) => DeleteDepartment

type DeleteDepartment = (
  httpRequest: HttpRequest
) => Promise<HttpResponse>
