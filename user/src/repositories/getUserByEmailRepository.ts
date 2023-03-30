import UserSchema from '../schemas/userSchema'

export default async (email: string) => {
  try {
    return UserSchema.findOne({ email }).exec()
  } catch (err) {
    console.log(err)
    throw err
  }
}