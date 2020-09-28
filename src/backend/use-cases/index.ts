import { departmentsDb, employeesDb, loginsDb } from '../data-access'
import {
  makeAddDepartment,
  makeEditDepartment,
  makeListDepartment,
  makeRemoveDepartment
} from './department'
import {
  makeAddEmployee,
  makeListEmployee,
  makeEditEmployee,
  makeRemoveEmployee
} from './employee'
import { makeFindLogin } from './login'

const listDepartments = makeListDepartment({ departmentsDb })
const addDepartment = makeAddDepartment({ departmentsDb })
const editDepartment = makeEditDepartment({ departmentsDb })
const removeDepartment = makeRemoveDepartment({ departmentsDb })

const listEmployees = makeListEmployee({ employeesDb })
const addEmployee = makeAddEmployee({ employeesDb })
const editEmployee = makeEditEmployee({ employeesDb })
const removeEmployee = makeRemoveEmployee({ employeesDb })

const findLogin = makeFindLogin({ loginsDb })

export {
  listDepartments,
  addDepartment,
  editDepartment,
  removeDepartment,
  listEmployees,
  addEmployee,
  editEmployee,
  removeEmployee,
  findLogin
}
