import { ObjectId } from 'mongodb'
import { Department } from '../../entities'

const makeRemoveDepartment: MakeRemoveDepartment = function ({ departmentDb }) {
  const removeDepartment: RemoveDepartment = async function (departmentId) {
    const exists = await departmentDb.findOne(departmentId)

    if (!exists) {
      throw new Error('No Department with such Id.')
    }

    await departmentDb.deleteOne(departmentId)

    return exists
  }

  return removeDepartment
}

export { makeRemoveDepartment }

type MakeRemoveDepartment = ({ departmentDb }: MakeProps) => RemoveDepartment

interface MakeProps {
  departmentDb: any
}

type RemoveDepartment = (departmentId: ObjectId) => Promise<Department>
