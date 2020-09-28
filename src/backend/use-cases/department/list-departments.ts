import { ObjectId } from 'mongodb'
import { Department } from '../../entities'

const makeListDepartment: MakeListDepartment = function ({ departmentDb }) {
  const listDepartment: ListDepartment = async function ({
    departmentId,
    limit = 10,
    skip = 0
  }) {
    if (departmentId) {
      const requestedDepartment = await departmentDb.findOne(departmentId)
      if (!requestedDepartment) {
        throw new Error('No department with such such Id.')
      }

      return requestedDepartment
    }

    return await departmentDb.findAll({ limit, skip })
  }

  return listDepartment
}

export { makeListDepartment }

type MakeListDepartment = ({ departmentDb }: MakeProps) => ListDepartment

interface MakeProps {
  departmentDb: any
}

type ListDepartment = (queryOptions: ListProps) => Promise<Department>

interface ListProps {
  departmentId?: ObjectId
  limit?: number
  skip?: number
}
