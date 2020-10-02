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
import { table, getBorderCharacters } from 'table'
import jwt from 'jsonwebtoken'
import { TOKEN_DURATION, TOKEN_SECRET } from '../config'

const toTable: toTable = list =>
  table(
    [
      Object.entries(list[0]).map(prop => prop[0]),
      ...list.map((item: Record<string, unknown>) =>
        Object.entries(item).map(prop => prop[1])
      )
    ],
    {
      border: getBorderCharacters('ramac')
    }
  )

const createToken: CreateToken = username => {
  return jwt.sign({ username }, TOKEN_SECRET, {
    expiresIn: TOKEN_DURATION
  })
}

const getDepartments = makeGetDepartments({ listDepartments })
const postDepartment = makePostDepartment({ addDepartment })
const patchDepartment = makePatchDepartment({ editDepartment })
const deleteDepartment = makeDeleteDepartment({ removeDepartment })

const getEmployees = makeGetEmployees({ listEmployees, toTable })
const postEmployee = makePostEmployee({ addEmployee })
const patchEmployee = makePatchEmployee({ editEmployee })
const deleteEmployee = makeDeleteEmployee({ removeEmployee })

const postLogin = makePostLogin({
  findLogin,
  createToken,
  TOKEN_SECRET
})

export {
  getDepartments,
  postDepartment,
  patchDepartment,
  deleteDepartment,
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee,
  postLogin
}

export type toTable = (list: any) => string

export type CreateToken = (username: string) => string
