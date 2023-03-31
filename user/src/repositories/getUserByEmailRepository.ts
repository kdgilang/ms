import { IUserModel, UserModel } from '../models/userModel'
import UserSchema from '../schemas/userSchema'

export default async (email: string): Promise<IUserModel> => {
  try {
    return UserSchema.findOne({ email }).exec() as Promise<IUserModel>
  } catch (err) {
    console.log(err)
    throw err
  }
}