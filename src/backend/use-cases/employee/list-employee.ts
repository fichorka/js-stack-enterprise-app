import { ConvertToId } from '..'
import { EmployeesDb } from '../../data-access/employees-db'
import { LinqQuery } from '../../data-access/linqQueries'
import { Employee } from '../../entities'

const makeListEmployee: MakeListEmployee = function ({
  employeesDb,
  linqQueries,
  convertToId
}) {
  const listEmployee: ListEmployee = async function ({
    employeeId,
    limit = 10,
    skip = 0,
    queryNo
  }) {
    if (employeeId) {
      const requestedEmployee = await employeesDb.findOne(
        convertToId(employeeId)
      )
      if (!requestedEmployee) {
        throw new Error('No employee with such such Id.')
      }

      return requestedEmployee
    }

    if (queryNo) {
      let result
      switch (Number(queryNo)) {
        case 1:
          result = await linqQueries.query1()
          break
        case 2:
          result = await linqQueries.query2()
          break
        case 3:
          result = await linqQueries.query3()
          break
        case 4:
          result = await linqQueries.query4()
          break
        default:
          throw Error('Invalid queryNo')
      }
      return result
    }

    return await employeesDb.findAll({
      limit: Number(limit),
      skip: Number(skip)
    })
  }

  return listEmployee
}

export { makeListEmployee }

type MakeListEmployee = (options: MakeProps) => ListEmployee

interface MakeProps {
  employeesDb: EmployeesDb
  convertToId: ConvertToId
  linqQueries: LinqQuery
}

export type ListEmployee = (
  queryOptions: ListProps
) => Promise<Employee | Employee[]>

interface ListProps {
  employeeId?: string
  limit?: number
  skip?: number
  queryNo: number | string
}
