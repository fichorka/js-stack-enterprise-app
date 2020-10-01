import Enumerable from 'linq'
import mongodb, { Db } from 'mongodb'
import { MONGO_URI, DB_NAME } from '../config'
import { makeDepartmentsDb } from './departments-db'
import { makeEmployeesDb } from './employees-db'
import { makeLinqQueries } from './LinqQueries'
import { makeLoginsDb } from './logins-db'

const client = new mongodb.MongoClient(MONGO_URI)

const makeDb: MakeDb = async function () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(DB_NAME)
}

const linqJs = (arr: unknown[]) => Enumerable.from(arr)

const departmentsDb = makeDepartmentsDb({ makeDb })
const employeesDb = makeEmployeesDb({ makeDb })
const loginsDb = makeLoginsDb({ makeDb })

const linqQueries = makeLinqQueries({
  linqJs,
  employeesDb,
  departmentsDb
})

export { departmentsDb, employeesDb, loginsDb, linqQueries, makeDb }

export type MakeDb = () => Promise<Db>
