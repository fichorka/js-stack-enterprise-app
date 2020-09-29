import { ConvertToId } from '..'
import { DepartmentsDb } from '../../data-access/departments-db'
import { Department, makeDepartment } from '../../entities'

const makeEditDepartment: MakeEditDepartment = function ({
  departmentsDb,
  convertToId
}) {
  const editDepartment: EditDepartment = async function ({ _id, ...changes }) {
    if (!_id) {
      throw new Error('No Id.')
    }

    _id = convertToId(_id)

    const existing = await departmentsDb.findOne(_id)

    if (!existing) {
      throw new Error('No Department with such Id.')
    }

    const modifiedDepartment = await makeDepartment({
      departmentInfo: {
        ...existing,
        ...changes,
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
  convertToId: ConvertToId
}

export type EditDepartment = (departmentInfo: Department) => Promise<Department>
