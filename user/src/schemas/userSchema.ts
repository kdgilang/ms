import { Schema, model, Types } from 'mongoose'
import { IUserModel } from '../models/userModel'
import UserDetail from './userDetailSchema'

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    unique: {
      args: true,
      message: 'Email must be unique.',
    },
    required: {
      arg: true,
      message: 'Email is required.',
    },
    validate: {
      validator: (v: string) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
      },
      message: '{VALUE} is not a valid email address.'
    }
  },
  password: {
    type: String,
		select: false,
		required: [true, 'Password is required.'],
		validate: {
			validator: (v: string) => {
				return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(v);
			},
			message: 'Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number.'
		}
  },
  token: String,
  avatar: String,
  userDetail: Types.ObjectId
})

userSchema.path('userDetail').ref(UserDetail)

export default model<IUserModel>('User', userSchema)