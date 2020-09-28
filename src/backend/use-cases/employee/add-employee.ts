import { EmployeesDb } from '../../data-access/employees-db'
import { makeEmployee, Employee } from '../../entities'

const makeAddEmployee: MakeAddEmployees = function ({ employeesDb }) {
  const addEmployee: AddEmployee = async function (employeeInfo) {
    const employee = makeEmployee({ employeeInfo })

    return await employeesDb.insertOne(employee)
  }

  return addEmployee
}

export { makeAddEmployee }

type MakeAddEmployees = ({ employeesDb }: MakeProps) => AddEmployee

interface MakeProps {
  employeesDb: EmployeesDb
}

export type AddEmployee = (employeeInfo: Employee) => Promise<Employee | null>
