import {
  addDepartment,
  addEmployee,
  editDepartment,
  editEmployee,
  findLogin,
  listDepartments,
  listEmployees,
  removeDepartment,
  removeEmployee
} from '../use-cases'
import {
  makeDeleteDepartment,
  makeGetDepartments,
  makePatchDepartment,
  makePostDepartment
} from './departments'
import {
  makeDeleteEmployee,
  makeGetEmployees,
  makePatchEmployee,
  makePostEmployee
} from './employees'
import { makePostLogin } from './login'
import { makePostLogout } from './logout'
import { table, getBorderCharacters } from 'table'

const toTable: toTable = list =>
  table(
    [
      Object.entries(list[0]).map(prop => prop[0]),
      ...list.map((item: {}) => Object.entries(item).map(prop => prop[1]))
    ],
    {
      border: getBorderCharacters('ramac')
    }
  )

const getDepartments = makeGetDepartments({ listDepartments })
const postDepartment = makePostDepartment({ addDepartment })
const patchDepartment = makePatchDepartment({ editDepartment })
const deleteDepartment = makeDeleteDepartment({ removeDepartment })

const getEmployees = makeGetEmployees({ listEmployees, toTable })
const postEmployee = makePostEmployee({ addEmployee })
const patchEmployee = makePatchEmployee({ editEmployee })
const deleteEmployee = makeDeleteEmployee({ removeEmployee })

const postLogin = makePostLogin({ findLogin })

const postLogout = makePostLogout()

export {
  getDepartments,
  postDepartment,
  patchDepartment,
  deleteDepartment,
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee,
  postLogin,
  postLogout
}

export type toTable = (list: any) => string
