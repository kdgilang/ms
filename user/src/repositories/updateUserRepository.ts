import UserEntity from '../entities/userEntity'
import { EStatus, IUserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  
  try {
    const { token, email } = params
    await UserEntity.updateOne({ email }, { token })
    return params
  } catch (err) {
    console.log(err)
    throw err
  }
}