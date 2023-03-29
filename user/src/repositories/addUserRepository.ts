import UserSchema from '../schemas/userSchema'
import { IUserModel } from '../models/userModel'

export default async (params: IUserModel): Promise<IUserModel> => {
  const { firstName, lastName, email, password } = params
  
  const newUSer = new UserSchema({
    firstName,
    lastName,
    email,
    password
  })

  newUSer.save()

  return newUSer
}