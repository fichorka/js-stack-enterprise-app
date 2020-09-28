import { ObjectId } from 'mongodb'
import { LoginsDb } from '../../data-access/logins-db'
import { Login } from '../../entities/login'

const makeFindLogin: MakeFindLogin = function ({ loginsDb }) {
  const findLogin: FindLogin = async function (loginId) {
    if (!loginId) {
      throw new Error('No Id.')
    }

    const requestedLogin = await loginsDb.findOne(loginId)

    if (!requestedLogin) {
      throw new Error('No login with such such Id.')
    }

    return requestedLogin
  }

  return findLogin
}

export { makeFindLogin }

type MakeFindLogin = ({ loginsDb }: MakeProps) => FindLogin

interface MakeProps {
  loginsDb: LoginsDb
}

export type FindLogin = (loginId: ObjectId) => Promise<Login>
