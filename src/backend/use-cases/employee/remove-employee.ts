import { ObjectId } from 'mongodb'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee } from '../../entities'

const makeRemoveEmployee: MakeRemoveEmployee = function ({ employeeDb }) {
  const removeEmployee: RemoveEmployee = async function (employeeId) {
    const exists = await employeeDb.findOne(employeeId)

    if (!exists) {
      throw new Error('No employee with such Id.')
    }

    await employeeDb.deleteOne(employeeId)

    return exists
  }

  return removeEmployee
}

export { makeRemoveEmployee }

type MakeRemoveEmployee = ({ employeeDb }: MakeProps) => RemoveEmployee

interface MakeProps {
  employeeDb: EmployeesDb
}

export type RemoveEmployee = (employeeId: ObjectId) => Promise<Employee>
