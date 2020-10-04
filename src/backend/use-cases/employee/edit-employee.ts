import { ConvertToId } from '..'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee, makeEmployee } from '../../entities'

const makeEditEmployee: MakeEditEmployee = function ({
  employeesDb,
  convertToId
}) {
  const editEmployee: EditEmployee = async function (employeeInfo) {
    if (!employeeInfo._id) {
      throw new Error('No Id.')
    }

    const existing = await employeesDb.findOne(
      convertToId(employeeInfo._id)
    )

    if (!existing) {
      throw new Error('No employee with such Id.')
    }

    const modifiedEmployee = await makeEmployee({
      employeeInfo: {
        ...existing,
        ...employeeInfo,
        _id: existing._id
      }
    })

    await employeesDb.updateOne(modifiedEmployee)

    return modifiedEmployee
  }

  return editEmployee
}

export { makeEditEmployee }

type MakeEditEmployee = ({ employeesDb }: MakeProps) => EditEmployee

interface MakeProps {
  employeesDb: EmployeesDb
  convertToId: ConvertToId
}

export type EditEmployee = (
  employeeInfo: Employee
) => Promise<Employee>
