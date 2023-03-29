import { Types } from 'mongoose'

export interface IUserModel {
    id: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token?: string
    userDetail: Types.ObjectId
}

export class UserModel implements IUserModel {
    id: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token?: string
    userDetail: Types.ObjectId
    constructor() {
        this.id = new Types.ObjectId()
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.userDetail = new Types.ObjectId()
    }
}