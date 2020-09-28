import { ObjectId } from 'mongodb'
import { MakeDb } from '.'
import { Employee } from '../entities'

const makeEmployeesDb: MakeEmployeesDb = function ({ makeDb }) {
  const findOne: FindOne = async function (id) {
    const db = await makeDb()
    const employee = await db.collection('employees').findOne({ _id: id })

    return employee || null
  }

  const findAll: FindAll = async function ({ limit, skip }) {
    const db = await makeDb()
    const employeeList: Employee[] | [] = await db
      .collection('employees')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray()

    return employeeList
  }

  const insertOne: InsertOne = async function (employee) {
    const db = await makeDb()
    const insertOperation = await db.collection('employees').insertOne(employee)

    return insertOperation?.result?.ok ? employee : null
  }

  const updateOne: UpdateOne = async function (employee) {
    const db = await makeDb()
    const insertOperation = await db
      .collection('employees')
      .updateOne({ _id: employee._id }, { $set: employee })

    return insertOperation?.result?.ok ? employee : null
  }

  return {
    findOne,
    findAll,
    insertOne,
    updateOne
  }
}

export { makeEmployeesDb }

type MakeEmployeesDb = ({
  makeDb
}: {
  makeDb: MakeDb
}) => {
  findOne: FindOne
  findAll: FindAll
  insertOne: InsertOne
  updateOne: UpdateOne
}

type FindOne = (id: ObjectId) => Promise<Employee | null>

type FindAll = ({
  limit,
  skip
}: {
  limit: number
  skip: number
}) => Promise<Employee[] | []>

type InsertOne = (employee: Employee) => Promise<Employee | null>

type UpdateOne = (employee: Employee) => Promise<Employee | null>
