import { ObjectId } from 'mongodb'

const makeDepartment: MakeDepartment = function ({ departmentInfo }) {
  const department: Department = {}

  if (!departmentInfo.departmentName) {
    throw new Error('departmentName does not exist.')
  }

  if (typeof departmentInfo.departmentName !== 'string') {
    throw new Error('departmentName is not of string type.')
  }

  if (departmentInfo.departmentName.length > 20) {
    throw new Error('departmenName is longer than 20 characters.')
  }

  department.departmentName = departmentInfo.departmentName

  if (!departmentInfo.departmentLocation) {
    throw new Error('departmentLocation does not exist.')
  }

  if (typeof departmentInfo.departmentLocation !== 'string') {
    throw new Error('departmentLocation is not of string type.')
  }

  if (departmentInfo.departmentLocation.length > 20) {
    throw new Error('departmentLocation is longer than 20 characters.')
  }

  department.departmentLocation = departmentInfo.departmentLocation

  if (departmentInfo._id) department._id = departmentInfo._id

  return department
}

export { makeDepartment }

type MakeDepartment = ({
  departmentInfo
}: {
  departmentInfo: Department
}) => Department

export interface Department {
  _id?: string | ObjectId
  departmentName?: string
  departmentLocation?: string
}
