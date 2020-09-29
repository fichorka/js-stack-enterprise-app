import { HttpRequest, HttpResponse } from '../types'
import { EditDepartment } from '../../use-cases/department'

const makePatchDepartment: MakePatchDepartment = function ({ editDepartment }) {
  const patchDepartment: PatchDepartment = async function (httpRequest) {
    try {
      const editedDepartment = await editDepartment(httpRequest.body)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: editedDepartment
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
  return patchDepartment
}

export { makePatchDepartment }

type MakePatchDepartment = (dependencies: {
  editDepartment: EditDepartment
}) => PatchDepartment

type PatchDepartment = (httpRequest: HttpRequest) => Promise<HttpResponse>
