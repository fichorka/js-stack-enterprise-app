import { departmentsDb } from '../data-access'
import {
  makeAddDepartment,
  makeEditDepartment,
  makeListDepartment,
  makeRemoveDepartment
} from './department'

const listDepartments = makeListDepartment({ departmentsDb })
const addDepartment = makeAddDepartment({ departmentsDb })
const editDepartment = makeEditDepartment({ departmentsDb })
const removeDepartment = makeRemoveDepartment({ departmentsDb })

export { listDepartments, addDepartment, editDepartment, removeDepartment }
