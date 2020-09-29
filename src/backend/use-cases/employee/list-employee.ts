import { ConvertToId } from '..'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee } from '../../entities'

const makeListEmployee: MakeListEmployee = function ({
  employeesDb,
  convertToId
}) {
  const listEmployee: ListEmployee = async function ({
    employeeId,
    limit = 10,
    skip = 0
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

    return await employeesDb.findAll({ limit, skip })
  }

  return listEmployee
}

export { makeListEmployee }

type MakeListEmployee = ({ employeesDb }: MakeProps) => ListEmployee

interface MakeProps {
  employeesDb: EmployeesDb
  convertToId: ConvertToId
}

export type ListEmployee = (
  queryOptions: ListProps
) => Promise<Employee | Employee[]>

interface ListProps {
  employeeId?: string
  limit?: number
  skip?: number
}
