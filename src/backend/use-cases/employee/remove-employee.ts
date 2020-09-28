import { ObjectId } from 'mongodb'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee } from '../../entities'

const makeRemoveEmployee: MakeRemoveEmployee = function ({ employeesDb }) {
  const removeEmployee: RemoveEmployee = async function (employeeId) {
    const exists = await employeesDb.findOne(employeeId)

    if (!exists) {
      throw new Error('No employee with such Id.')
    }

    await employeesDb.deleteOne(employeeId)

    return exists
  }

  return removeEmployee
}

export { makeRemoveEmployee }

type MakeRemoveEmployee = ({ employeesDb }: MakeProps) => RemoveEmployee

interface MakeProps {
  employeesDb: EmployeesDb
}

export type RemoveEmployee = (employeeId: ObjectId) => Promise<Employee>
