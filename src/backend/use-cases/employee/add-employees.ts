import { Department, makeEmployee, Employee } from '../../entities'

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
  employeesDb: any
}

export type AddEmployees = (employeeInfo: Employee) => Promise<Department>
