import { ObjectId } from 'mongodb'
import { Login } from '../entities/login'
import { MakeDb } from './type'

const makeLoginsDb: MakeLoginsDb = function ({ makeDb }) {
  const findOne: FindOne = async function (id) {
    const db = await makeDb()
    const login = await db.collection('login').findOne({ _id: id })

    return login || null
  }

  return {
    findOne
  }
}

export { makeLoginsDb }

type MakeLoginsDb = ({
  makeDb
}: {
  makeDb: MakeDb
}) => {
  findOne: FindOne
}

type FindOne = (id: ObjectId) => Promise<Login | null>
