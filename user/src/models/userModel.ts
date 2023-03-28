import { Types } from 'mongoose'

export interface IUser {
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token?: string
    userDetail: Types.ObjectId
}

export class User implements IUser {
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