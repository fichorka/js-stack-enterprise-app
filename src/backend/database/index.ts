import { makeDb } from '../data-access'
import {
  initialDepartments,
  initialEmployees,
  initialLogins
} from './initialTCollections'

const initializeDb: InitializeDb = async function () {
  // initializes collections (tables) with a template if not initialized already

  console.log('Database initialization...')

  try {
    const db = await makeDb()

    const allCollections = await db
      .listCollections()
      .toArray()
      .then(data => data.map(collection => collection.name))

    if (!allCollections.includes('logins')) {
      console.log("initializing 'logins' collection...")
      const logins = await db.createCollection('logins')
      await logins.insertMany(initialLogins)
    } else {
      console.log("'logins' collection already initialized.")
    }

    if (
      !allCollections.includes('departments') ||
      !allCollections.includes('employees')
    ) {
      // collections 'departments' and 'employees' must be initialized together so that employee.departmentId gets the right foreign key from departments

      console.log("initializing 'departments' collection...")
      const departments = await db.createCollection('departments')
      const { ops } = await departments.insertMany(initialDepartments)
      const employeesToInsert = []
      employeesToInsert[0] = {
        ...initialEmployees[0],
        departmentId: ops[3]._id
      }
      employeesToInsert[1] = {
        ...initialEmployees[1],
        departmentId: ops[2]._id
      }
      employeesToInsert[2] = {
        ...initialEmployees[2],
        departmentId: ops[4]._id
      }
      employeesToInsert[3] = {
        ...initialEmployees[3],
        departmentId: ops[5]._id
      }
      employeesToInsert[4] = {
        ...initialEmployees[4],
        departmentId: ops[7]._id
      }
      employeesToInsert[5] = {
        ...initialEmployees[5],
        departmentId: ops[6]._id
      }
      employeesToInsert[6] = {
        ...initialEmployees[6],
        departmentId: ops[2]._id
      }
      employeesToInsert[7] = {
        ...initialEmployees[7],
        departmentId: ops[2]._id
      }
      employeesToInsert[8] = {
        ...initialEmployees[8],
        departmentId: ops[2]._id
      }

      console.log("initializing 'employees' collection...")
      const employees = await db.createCollection('employees')
      await employees.insertMany(employeesToInsert)
    } else {
      console.log(
        "'employees' and 'departments' collection already initialized."
      )
    }

    console.log('Database successfully initialized.')

    return
  } catch (error) {
    console.log('Database initialization failed:', error.message)
  }
}

export { initializeDb }

type InitializeDb = () => Promise<void>
