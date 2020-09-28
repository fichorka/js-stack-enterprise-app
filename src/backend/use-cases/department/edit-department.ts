import { DepartmentsDb } from '../../data-access/departments-db'
import { Department, makeDepartment } from '../../entities'

const makeEditDepartment: MakeEditDepartment = function ({ departmentsDb }) {
  const editDepartment: EditDepartment = async function ({ departmentInfo }) {
    if (!departmentInfo._id) {
      throw new Error('No Id.')
    }

    const existing = await departmentsDb.findOne(departmentInfo._id)

    if (!existing) {
      throw new Error('No Department with such Id.')
    }

    const modifiedDepartment = await makeDepartment({
      departmentInfo: {
        ...existing,
        ...departmentInfo,
        _id: existing._id
      }
    })

    await departmentsDb.updateOne(modifiedDepartment)

    return modifiedDepartment
  }

  return editDepartment
}

export { makeEditDepartment }

type MakeEditDepartment = ({ departmentsDb }: MakeProps) => EditDepartment

interface MakeProps {
  departmentsDb: DepartmentsDb
}

export type EditDepartment = ({
  departmentInfo
}: {
  departmentInfo: Department
}) => Promise<Department>
