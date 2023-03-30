import UserSchema from '../schemas/userSchema'
import { EStatus, IUserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  
  try {
    params.status = EStatus.emailnotverified
    const user = new UserSchema(params)
    await user.save()
    
    return params
  } catch (err) {
    console.log(err)
    throw err
  }
}