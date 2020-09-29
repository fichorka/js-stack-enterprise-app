import { LoginsDb } from '../../data-access/logins-db'
import { Login } from '../../entities/login'

const makeFindLogin: MakeFindLogin = function ({ loginsDb }) {
  const findLogin: FindLogin = async function (loginUserName) {
    if (!loginUserName) {
      throw new Error('No login username.')
    }

    const requestedLogin = await loginsDb.findOne(loginUserName)

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

export type FindLogin = (loginUserName: string) => Promise<Login>
