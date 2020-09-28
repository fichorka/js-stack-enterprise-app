import { ObjectId } from 'mongodb'
import { MakeDb } from '.'
import { Department } from '../entities'

const makeDepartmentsDb: MakeDepartmentsDb = function ({ makeDb }) {
  const findOne: FindOne = async function (id) {
    const db = await makeDb()
    const department = await db.collection('departments').findOne({ _id: id })

    return department || null
  }

  const findAll: FindAll = async function ({ limit, skip }) {
    const db = await makeDb()
    const departmentList: Department[] | [] = await db
      .collection('departments')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray()

    return departmentList
  }

  const insertOne: InsertOne = async function (department) {
    const db = await makeDb()
    const insertOperation = await db
      .collection('departments')
      .insertOne(department)

    return insertOperation?.result?.ok ? department : null
  }

  const updateOne: UpdateOne = async function (department) {
    const db = await makeDb()
    const insertOperation = await db
      .collection('departments')
      .updateOne({ _id: department._id }, { $set: department })

    return insertOperation?.result?.ok ? department : null
  }

  return {
    findOne,
    findAll,
    insertOne,
    updateOne
  }
}

export { makeDepartmentsDb }

type MakeDepartmentsDb = ({ makeDb }: { makeDb: MakeDb }) => DepartmentsDb

export interface DepartmentsDb {
  findOne: FindOne
  findAll: FindAll
  insertOne: InsertOne
  updateOne: UpdateOne
}

type FindOne = (id: ObjectId) => Promise<Department | null>

type FindAll = ({
  limit,
  skip
}: {
  limit: number
  skip: number
}) => Promise<Department[] | []>

type InsertOne = (department: Department) => Promise<Department | null>

type UpdateOne = (department: Department) => Promise<Department | null>
