import UserSchema from '../schemas/userSchema'
import { IUserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  
  try {
    const user = new UserSchema(params)
    await user.save()
    
    return params
  } catch (err) {
    throw err
  }
}