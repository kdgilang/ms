import UserSchema from '../schemas/userSchema'
import { EStatus, IUserModel, UserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  
  try {
    params.status = EStatus.emailnotverified
    const newUser = { ...new UserModel(), ...params}
    const user = new UserSchema(newUser)
    await user.save()
    
    return params
  } catch (err) {
    console.log(err)
    throw err
  }
}