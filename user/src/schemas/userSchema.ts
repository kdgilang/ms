import { Schema, model, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUserModel, UserModel } from '../models/userModel'
import UserDetail from './userDetailSchema'
import { 
  PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  SALT_WORK_FACTOR
} from '../consts/userConst'

export const isEmail = {
  validator: (email: string): boolean => EMAIL_REGEX.test(email),
  message: EMAIL_ERROR_MESSAGE,
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email is already in use.'],
    lowercase: [true, 'Email require lowercase'],
    validate: isEmail,
  },
  password: {
    type: String,
		select: false,
		required: [true, 'Password is required.'],
		validate: {
			validator: (v: string) => {
				return PASSWORD_REGEX.test(v)
			},
			message: PASSWORD_ERROR_MESSAGE
		}
  },
  token: String,
  avatar: String,
  userDetail: Types.ObjectId
})

userSchema.path('userDetail').ref(UserDetail)

userSchema.pre('save', async function (next: any) {

  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    // store hash password
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.comparePassword = async function (password: string)  {
  return bcrypt.compare(password, this.password);
};

type ComparePasswordType = (password: string) => boolean

interface IUserSchema extends IUserModel {
  comparePassword: ComparePasswordType
}

export default model<IUserSchema>('User', userSchema)