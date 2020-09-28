import {
  addDepartment,
  addEmployee,
  editDepartment,
  editEmployee,
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

const getDepartments = makeGetDepartments({ listDepartments })
const postDepartment = makePostDepartment({ addDepartment })
const patchDepartment = makePatchDepartment({ editDepartment })
const deleteDepartment = makeDeleteDepartment({ removeDepartment })

const getEmployees = makeGetEmployees({ listEmployees })
const postEmployee = makePostEmployee({ addEmployee })
const patchEmployee = makePatchEmployee({ editEmployee })
const deleteEmployee = makeDeleteEmployee({ removeEmployee })

export {
  getDepartments,
  postDepartment,
  patchDepartment,
  deleteDepartment,
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee
}
