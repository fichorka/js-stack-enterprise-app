import { DepartmentsDb } from '../../data-access/departments-db'
import { Department, makeDepartment } from '../../entities'

const makeAddDepartment: MakeAddDepartment = function ({ departmentDb }) {
  const addDepartment: AddDepartment = async function (departmentInfo) {
    const department = makeDepartment({ departmentInfo })

    return await departmentDb.insertOne(department)
  }

  return addDepartment
}

export { makeAddDepartment }

type MakeAddDepartment = ({ departmentDb }: MakeProps) => AddDepartment

interface MakeProps {
  departmentDb: DepartmentsDb
}

type AddDepartment = (departmentInfo: Department) => Promise<Department | null>
