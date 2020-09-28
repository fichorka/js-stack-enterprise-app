import { ObjectId } from 'mongodb'
import { Department, makeDepartment } from '../../entities'

const makeEditDepartment: MakeEditDepartment = function ({ departmentDb }) {
  const editDepartment: EditDepartment = async function (departmentInfo) {
    const existing = await departmentDb.findOne(departmentInfo)

    if (!existing) {
      throw new Error('No Department with such Id.')
    }

    const modifiedDepartment = await makeDepartment({
      ...existing,
      ...departmentInfo,
      id: existing.id
    })

    await departmentDb.updateOne(modifiedDepartment)

    return modifiedDepartment
  }

  return editDepartment
}

export { makeEditDepartment }

type MakeEditDepartment = ({ departmentDb }: MakeProps) => EditDepartment

interface MakeProps {
  departmentDb: any
}

type EditDepartment = (departmentId: ObjectId) => Promise<Department>
