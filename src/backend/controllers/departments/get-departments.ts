import { ListDepartment } from '../../use-cases/department'
import { HttpRequest, HttpResponse } from '../types'

const makeGetDepartments: MakeGetDepartments = function ({ listDepartments }) {
  const getDepartments: GetDepartments = async function (httpRequest) {
    try {
      const departmentList = await listDepartments(httpRequest.params)

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: departmentList
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
  return getDepartments
}

export { makeGetDepartments }

type MakeGetDepartments = (dependencies: {
  listDepartments: ListDepartment
}) => GetDepartments

type GetDepartments = (httpRequest: HttpRequest) => Promise<HttpResponse>
