import { ObjectId } from 'mongodb'
import { ConvertToId } from '..'
import { EmployeesDb } from '../../data-access/employees-db'
import { Employee } from '../../entities'

const makeRemoveEmployee: MakeRemoveEmployee = function ({
  employeesDb,
  convertToId
}) {
  const removeEmployee: RemoveEmployee = async function (employeeId) {
    const exists = await employeesDb.findOne(convertToId(employeeId))

    if (!exists) {
      throw new Error('No employee with such Id.')
    }

    await employeesDb.deleteOne(convertToId(employeeId))

    return exists
  }

  return removeEmployee
}

export { makeRemoveEmployee }

type MakeRemoveEmployee = ({
  employeesDb
}: MakeProps) => RemoveEmployee

interface MakeProps {
  employeesDb: EmployeesDb
  convertToId: ConvertToId
}

export type RemoveEmployee = (
  employeeId: ObjectId
) => Promise<Employee>
