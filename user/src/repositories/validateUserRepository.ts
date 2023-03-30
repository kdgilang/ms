import { ValidateUserReqType } from '../types/validateUserType'
import userSchema from '../schemas/userSchema'
import { EStatus } from '../models/userModel'

export default async (params: ValidateUserReqType): Promise<boolean> => {
  try {
    if (!params) return false

    const { email, password } = params
    const user = await userSchema.findOne({ email }).select('+password').exec()
    
    if (!user) return false

    if (user.status !== EStatus.active) {
      throw new Error(`Error: user ${user.status}`)
    }

    return user.comparePassword(password)
  } catch (err) {
    console.log(err)
    throw err
  }
}