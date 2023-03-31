import UserSchema from '../schemas/userSchema'
import { EStatus, IUserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  
  try {
    const { token, email } = params
    await UserSchema.updateOne({ email }, { token })
    return params
  } catch (err) {
    console.log(err)
    throw err
  }
}