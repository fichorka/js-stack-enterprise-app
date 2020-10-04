import { ObjectId } from 'mongodb'
import {
  departmentsDb,
  employeesDb,
  linqQueries,
  loginsDb
} from '../data-access'
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

const convertToId: ConvertToId = id => new ObjectId(id)

const listDepartments = makeListDepartment({
  departmentsDb,
  convertToId
})
const addDepartment = makeAddDepartment({ departmentsDb })
const editDepartment = makeEditDepartment({
  departmentsDb,
  convertToId
})
const removeDepartment = makeRemoveDepartment({
  departmentsDb,
  convertToId
})

const listEmployees = makeListEmployee({
  employeesDb,
  convertToId,
  linqQueries
})
const addEmployee = makeAddEmployee({ employeesDb })
const editEmployee = makeEditEmployee({ employeesDb, convertToId })
const removeEmployee = makeRemoveEmployee({
  employeesDb,
  convertToId
})

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

export type ConvertToId = (id: string | ObjectId) => ObjectId
