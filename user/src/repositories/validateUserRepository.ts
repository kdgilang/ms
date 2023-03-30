import { ValidateUserReqType } from '../types/validateUserType'
import userSchema from '../schemas/userSchema'

export default async (params: ValidateUserReqType): Promise<boolean> => {
  try {
    const { email, password } = params
    const user = await userSchema.findOne({ email }).select('+password').exec()
    
    if (!user) return false

    return user.comparePassword(password)

  } catch (err) {
    throw err
  }
}