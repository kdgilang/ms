import { Types } from 'mongoose'

export interface IUserModel {
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token?: string
    userDetail: Types.ObjectId
}

export class UserModel implements IUserModel {
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token?: string
    userDetail: Types.ObjectId
    constructor() {
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.userDetail = new Types.ObjectId()
    }
}