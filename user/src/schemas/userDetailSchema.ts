import { Schema, model } from 'mongoose'
import { EReligion, EGender, IUserDetailModel } from '../models/userDetailModel'

const userDetailSchema = new Schema<IUserDetailModel>({
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String },
  gender: { type: String, enum: EGender },
  religion: { type: String, enum: EReligion}
})

export default model<IUserDetailModel>('UserDetail', userDetailSchema)
