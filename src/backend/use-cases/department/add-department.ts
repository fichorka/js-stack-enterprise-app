import { DepartmentsDb } from '../../data-access/departments-db'
import { Department, makeDepartment } from '../../entities'

const makeAddDepartment: MakeAddDepartment = function ({ departmentsDb }) {
  const addDepartment: AddDepartment = async function (departmentInfo) {
    const department = makeDepartment({ departmentInfo })

    return await departmentsDb.insertOne(department)
  }

  return addDepartment
}

export { makeAddDepartment }

type MakeAddDepartment = ({ departmentsDb }: MakeProps) => AddDepartment

interface MakeProps {
  departmentsDb: DepartmentsDb
}

type AddDepartment = (departmentInfo: Department) => Promise<Department | null>
