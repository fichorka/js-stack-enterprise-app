import { IEnumerable } from 'linq'
import { DepartmentsDb } from './departments-db'
import { EmployeesDb } from './employees-db'

const makeLinqQueries: MakeLinqQueries = ({
  linqJs,
  departmentsDb,
  employeesDb
}) => {
  return {
    query1: async () => {
      const employees = await employeesDb.findAll({
        limit: 100,
        skip: 0
      })

      const departments = await departmentsDb.findAll({
        limit: 100,
        skip: 0
      })

      const avgSalary = linqJs(departments)
        .where(
          dep =>
            dep.departmentName.toLowerCase() === 'development' &&
            dep.departmentLocation.toLowerCase() !== 'london'
        )
        .join(
          employees,
          d => d._id.toHexString(),
          e => e.departmentId?.toHexString(),
          (d, e) => e.salary
        )
        .average()

      return avgSalary
    },

    query2: async () => {
      const employees = await employeesDb.findAll({
        limit: 100,
        skip: 0
      })

      const departments = await departmentsDb.findAll({
        limit: 100,
        skip: 0
      })

      const res = linqJs(departments)
        .groupJoin(
          employees,
          d => d._id.toHexString(),
          e => e.departmentId?.toHexString(),
          (d, e) => {
            const x = {
              departmentLocation: d.departmentLocation,
              count: e.count()
            }
            return x
          }
        )
        .where(res => res.count > 1)
        .toArray()

      return res
    },

    query3: async () => {
      const employees = await employeesDb.findAll({
        limit: 100,
        skip: 0
      })

      const departments = await departmentsDb.findAll({
        limit: 100,
        skip: 0
      })

      const result = linqJs(departments)
        .groupJoin(
          employees,
          d => d._id.toHexString(),
          e => e.departmentId?.toHexString(),
          (d, matcher) => {
            return {
              departmentLocation: d.departmentLocation,
              departmentName: d.departmentName,
              count: matcher.count()
            }
          }
        )
        .where(
          res => res.departmentName.toLowerCase() === 'development'
        )
        .select(res => {
          return {
            departmentLocation: res.departmentLocation,
            employeeCount: res.count
          }
        })
        .toArray()

      return result
    },

    query4: async () => {
      const employees = await employeesDb.findAll({
        limit: 1000,
        skip: 0
      })

      const result = linqJs(employees)
        .orderByDescending(e => e.salary)
        .toArray()[1]

      return result
    }
  } as LinqQuery
}

export { makeLinqQueries }

export type MakeLinqQueries = (deps: Props) => LinqQuery

export interface LinqQuery {
  query1: CallableFunction
  query2: CallableFunction
  query3: CallableFunction
  query4: CallableFunction
}

interface Props {
  linqJs: (arr: Record<string, any>[]) => IEnumerable<any>
  departmentsDb: DepartmentsDb
  employeesDb: EmployeesDb
}
