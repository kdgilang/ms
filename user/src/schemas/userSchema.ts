import { Schema, model, Types } from 'mongoose'
import { IUserModel } from '../models/userModel'
import UserDetail from './userDetailSchema'
import { 
  PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_REGEX
} from '../consts/userConst'

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isEmail = {
  validator: (email: string): boolean => emailRegExp.test(email),
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
				return PASSWORD_REGEX.test(v);
			},
			message: PASSWORD_ERROR_MESSAGE
		}
  },
  token: String,
  avatar: String,
  userDetail: Types.ObjectId
})

userSchema.path('userDetail').ref(UserDetail)

export default model<IUserModel>('User', userSchema)