import { MakeDb } from '.'
import { Login } from '../entities/login'

const makeLoginsDb: MakeLoginsDb = function ({ makeDb }) {
  const findOne: FindOne = async function (username) {
    const db = await makeDb()
    const login = await db
      .collection('logins')
      .findOne({ loginUserName: username })

    return login || null
  }

  return {
    findOne
  }
}

export { makeLoginsDb }

type MakeLoginsDb = ({ makeDb }: { makeDb: MakeDb }) => LoginsDb

export interface LoginsDb {
  findOne: FindOne
}

type FindOne = (username: string) => Promise<Login | null>
