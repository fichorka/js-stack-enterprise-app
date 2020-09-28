import { ObjectId } from 'mongodb'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee } from '../../entities'

const makeListEmployee: MakeListEmployee = function ({ employeeDb }) {
  const listEmployee: ListEmployee = async function ({
    employeeId,
    limit = 10,
    skip = 0
  }) {
    if (employeeId) {
      const requestedEmployee = await employeeDb.findOne(employeeId)
      if (!requestedEmployee) {
        throw new Error('No employee with such such Id.')
      }

      return requestedEmployee
    }

    return await employeeDb.findAll({ limit, skip })
  }

  return listEmployee
}

export { makeListEmployee }

type MakeListEmployee = ({ employeeDb }: MakeProps) => ListEmployee

interface MakeProps {
  employeeDb: EmployeesDb
}

export type ListEmployee = (
  queryOptions: ListProps
) => Promise<Employee | Employee[]>

interface ListProps {
  employeeId?: ObjectId
  limit?: number
  skip?: number
}
