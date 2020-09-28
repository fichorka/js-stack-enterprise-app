import { ObjectId } from 'mongodb'

export interface Login {
  _id: ObjectId
  loginUserName: string
  loginPassword: string
}
