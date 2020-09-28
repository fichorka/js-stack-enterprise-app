import { EmployeesDb } from '../../data-access/employees-db'
import { Employee, makeEmployee } from '../../entities'

const makeEditEmployee: MakeEditEmployee = function ({ employeeDb }) {
  const editEmployee: EditEmployee = async function (employeeInfo) {
    if (!employeeInfo._id) {
      throw new Error('No Id.')
    }

    const existing = await employeeDb.findOne(employeeInfo._id)

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

    await employeeDb.updateOne(modifiedEmployee)

    return modifiedEmployee
  }

  return editEmployee
}

export { makeEditEmployee }

type MakeEditEmployee = ({ employeeDb }: MakeProps) => EditEmployee

interface MakeProps {
  employeeDb: EmployeesDb
}

export type EditEmployee = (employeeInfo: Employee) => Promise<Employee>
