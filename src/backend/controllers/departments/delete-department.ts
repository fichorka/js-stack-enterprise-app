import { HttpRequest, HttpResponse } from '../types'
import { RemoveDepartment } from '../../use-cases/department'

const makeDeleteDepartment: MakeDeleteDepartment = function ({
  removeDepartment
}) {
  const deleteDepartment: DeleteDepartment = async function (httpRequest) {
    try {
      const { id } = httpRequest?.params

      if (!id) {
        throw new Error('No Id.')
      }

      const removedDepartment = await removeDepartment(id)

      return {
        statusCode: 204,
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

type DeleteDepartment = (httpRequest: HttpRequest) => Promise<HttpResponse>
