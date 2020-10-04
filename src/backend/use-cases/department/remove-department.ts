import { ObjectId } from 'mongodb'
import { ConvertToId } from '..'
import { DepartmentsDb } from '../../data-access/departments-db'
import { Department } from '../../entities'

const makeRemoveDepartment: MakeRemoveDepartment = function ({
  departmentsDb,
  convertToId
}) {
  const removeDepartment: RemoveDepartment = async function (
    departmentId
  ) {
    const exists = await departmentsDb.findOne(
      convertToId(departmentId)
    )

    if (!exists) {
      throw new Error('No Department with such Id.')
    }

    await departmentsDb.deleteOne(convertToId(departmentId))

    return exists
  }

  return removeDepartment
}

export { makeRemoveDepartment }

type MakeRemoveDepartment = ({
  departmentsDb
}: MakeProps) => RemoveDepartment

interface MakeProps {
  departmentsDb: DepartmentsDb
  convertToId: ConvertToId
}

export type RemoveDepartment = (
  departmentId: ObjectId
) => Promise<Department>
