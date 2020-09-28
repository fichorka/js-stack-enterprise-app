import { ObjectId } from 'mongodb'

const makeEmployee: MakeEmployee = function ({ employeeInfo }) {
  const employee: Employee = {}

  if (!employeeInfo.employeeName) {
    throw new Error('employeeName does not exist.')
  }

  if (typeof employeeInfo.employeeName !== 'string') {
    throw new Error('employeeName is not of string type.')
  }

  if (employeeInfo.employeeName.length > 50) {
    throw new Error('employeeName is longer than 50 characters.')
  }

  employee.employeeName = employeeInfo.employeeName

  if (!employeeInfo.salary) {
    throw new Error('salary is undefined.')
  }

  if (typeof employeeInfo.salary !== 'number') {
    throw new Error('salary is not of number type.')
  }

  employee.salary = employeeInfo.salary

  if (!employeeInfo.departmendId) {
    throw new Error('departmendId is undefined.')
  }

  employee.departmendId = employeeInfo.departmendId

  employee.lastModifyDate = new Date()

  if (employeeInfo._id) employee._id = employeeInfo._id

  return employee
}

export { makeEmployee }

type MakeEmployee = ({ employeeInfo }: { employeeInfo: Employee }) => Employee

export interface Employee {
  _id?: ObjectId
  employeeName?: string
  salary?: number
  departmendId?: ObjectId
  lastModifyDate?: Date
}
