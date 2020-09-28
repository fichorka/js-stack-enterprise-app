import { DepartmentsDb } from '../../data-access/departments-db'
import { Department, makeDepartment } from '../../entities'

const makeEditDepartment: MakeEditDepartment = function ({ departmentDb }) {
  const editDepartment: EditDepartment = async function ({ departmentInfo }) {
    if (!departmentInfo._id) {
      throw new Error('No Id.')
    }

    const existing = await departmentDb.findOne(departmentInfo._id)

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

    await departmentDb.updateOne(modifiedDepartment)

    return modifiedDepartment
  }

  return editDepartment
}

export { makeEditDepartment }

type MakeEditDepartment = ({ departmentDb }: MakeProps) => EditDepartment

interface MakeProps {
  departmentDb: DepartmentsDb
}

type EditDepartment = ({
  departmentInfo
}: {
  departmentInfo: Department
}) => Promise<Department>
