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
      console.log("initializing 'logins' collection.")
      const logins = await db.createCollection('logins')
      logins.insertMany(initialLogins)
    } else {
      console.log("'logins' collection already initialized.")
    }

    if (!allCollections.includes('departments')) {
      console.log("initializing 'departments' collection")
      const departments = await db.createCollection('departments')
      departments.insertMany(initialDepartments)
    } else {
      console.log("'departments' collection already initialized.")
    }

    if (!allCollections.includes('employees')) {
      console.log("initializing 'employees' collection.")
      const employees = await db.createCollection('employees')
      employees.insertMany(initialEmployees)
    } else {
      console.log("'employees' collection already initialized.")
    }

    console.log('Database successfully initialized.')

    return
  } catch (error) {
    console.log('Database initialization failed.')
    console.log(error)
  }
}

export { initializeDb }

type InitializeDb = () => Promise<void>
