import { makeDb } from '../data-access'
import {
  initialDepartments,
  initialEmployees,
  initialLogins
} from './initialTCollections'

const initializeDb: InitializeDb = async function () {
  // initializes collections (tables) with a template if not initialized already

  try {
    const db = await makeDb()

    const allCollections = await db.listCollections().toArray()

    if (!allCollections.includes('logins')) {
      const logins = await db.createCollection('logins')
      logins.insertMany(initialLogins)
    }

    if (!allCollections.includes('departments')) {
      const departments = await db.createCollection('departments')
      departments.insertMany(initialDepartments)
    }

    if (!allCollections.includes('employees')) {
      const employees = await db.createCollection('employees')
      employees.insertMany(initialEmployees)
    }
  } catch (error) {
    console.log('Database initialization failed.')
    console.log(error)
  }
}

export { initializeDb }

type InitializeDb = () => Promise<void>
