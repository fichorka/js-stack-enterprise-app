import { ObjectId } from 'mongodb'
import { DepartmentsDb } from '../../data-access/departments-db'
import { Department } from '../../entities'

const makeListDepartment: MakeListDepartment = function ({ departmentsDb }) {
  const listDepartment: ListDepartment = async function ({
    departmentId,
    limit = 10,
    skip = 0
  }) {
    if (departmentId) {
      const requestedDepartment = await departmentsDb.findOne(departmentId)
      if (!requestedDepartment) {
        throw new Error('No department with such such Id.')
      }

      return requestedDepartment
    }

    return await departmentsDb.findAll({ limit, skip })
  }

  return listDepartment
}

export { makeListDepartment }

type MakeListDepartment = ({ departmentsDb }: MakeProps) => ListDepartment

interface MakeProps {
  departmentsDb: DepartmentsDb
}

export type ListDepartment = (
  queryOptions: ListProps
) => Promise<Department | Department[] | []>

interface ListProps {
  departmentId?: ObjectId
  limit?: number
  skip?: number
}
