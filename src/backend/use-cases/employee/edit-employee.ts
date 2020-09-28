import { Employee, makeEmployee } from '../../entities'

const makeEditEmployee: MakeEditEmployee = function ({ employeeDb }) {
  const editEmployee: EditEmployee = async function (employeeInfo) {
    const existing = await employeeDb.findOne(employeeInfo._id)

    if (!existing) {
      throw new Error('No employee with such Id.')
    }

    const modifiedEmployee = await makeEmployee({
      ...existing,
      ...employeeInfo,
      id: existing.id
    })

    await employeeDb.updateOne(modifiedEmployee)

    return modifiedEmployee
  }

  return editEmployee
}

export { makeEditEmployee }

type MakeEditEmployee = ({ employeeDb }: MakeProps) => EditEmployee

interface MakeProps {
  employeeDb: any
}

type EditEmployee = (employeeInfo: Employee) => Promise<Employee>
