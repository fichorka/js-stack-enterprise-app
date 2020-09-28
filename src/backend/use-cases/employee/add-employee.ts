import { EmployeesDb } from '../../data-access/employees-db'
import { makeEmployee, Employee } from '../../entities'

const makeAddEmployee: MakeAddEmployees = function ({ employeesDb }) {
  const addEmployee: AddEmployees = async function (employeeInfo) {
    const employee = makeEmployee({ employeeInfo })

    return await employeesDb.insertOne(employee)
  }

  return addEmployee
}

export { makeAddEmployee }

type MakeAddEmployees = ({ employeesDb }: MakeProps) => AddEmployees

interface MakeProps {
  employeesDb: EmployeesDb
}

export type AddEmployees = (employeeInfo: Employee) => Promise<Employee | null>
