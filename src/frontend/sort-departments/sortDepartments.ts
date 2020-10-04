import { Department } from '../api'

const sortDepartments: SortDepartments = departments => {
  return departments.sort((a, b) => {
    if (a.departmentLocation > b.departmentLocation) return 1
    if (a.departmentLocation < b.departmentLocation) return -1
    return 0
  })
}

export { sortDepartments }

type SortDepartments = (departments: Department[]) => Department[]
