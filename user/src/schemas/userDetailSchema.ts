import { Schema, model, Types } from 'mongoose'
import { IUserDetail, EReligion, EGender } from '../models/userDetailModel'

const userDetailSchema = new Schema<IUserDetail>({
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String },
  gender: { type: String, enum: EGender },
  religion: { type: String, enum: EReligion}
})

const UserDetail = model<IUserDetail>('UserDetail', userDetailSchema)

export default UserDetail