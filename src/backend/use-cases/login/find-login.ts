import { ObjectId } from 'mongodb'
import { Login } from '../../entities/login'

const makeFindLogin: MakeFindLogin = function ({ loginsDb }) {
  const findLogin: FindLogin = async function ({ loginId }) {
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
  loginsDb: any
}

type FindLogin = (queryOptions: ListProps) => Promise<Login>

interface ListProps {
  loginId?: ObjectId
}
