import { ListEmployee } from '../../use-cases/employee'
import { HttpRequest, HttpResponse } from '../types'

const makeGetEmployees: MakeGetEmployees = function ({ listEmployees }) {
  const getEmployees: GetEmployees = async function (httpRequest) {
    try {
      const { employeeId } = httpRequest.pathParams

      const queryParams = httpRequest.params

      const employeeList = await listEmployees({ employeeId, ...queryParams })

      return {
        statusCode: 200,
        body: {
          meta: {
            status: 'success'
          },
          result: employeeList
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
  return getEmployees
}

export { makeGetEmployees }

type MakeGetEmployees = (dependencies: {
  listEmployees: ListEmployee
}) => GetEmployees

type GetEmployees = (httpRequest: HttpRequest) => Promise<HttpResponse>
