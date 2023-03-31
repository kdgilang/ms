import { IUserModel, UserModel } from '../models/userModel'
import UserEntity from '../entities/userEntity'

export default async (email: string): Promise<IUserModel> => {
  try {
    return UserEntity.findOne({ email }).exec() as Promise<IUserModel>
  } catch (err) {
    console.log(err)
    throw err
  }
}