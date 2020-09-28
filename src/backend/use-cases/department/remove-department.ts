import { ObjectId } from 'mongodb'
import { Department } from '../../entities'

const makeRemoveDepartment: MakeRemoveDepartment = function ({
  departmentsDb
}) {
  const removeDepartment: RemoveDepartment = async function (departmentId) {
    const exists = await departmentsDb.findOne(departmentId)

    if (!exists) {
      throw new Error('No Department with such Id.')
    }

    await departmentsDb.deleteOne(departmentId)

    return exists
  }

  return removeDepartment
}

export { makeRemoveDepartment }

type MakeRemoveDepartment = ({ departmentsDb }: MakeProps) => RemoveDepartment

interface MakeProps {
  departmentsDb: any
}

type RemoveDepartment = (departmentId: ObjectId) => Promise<Department>
