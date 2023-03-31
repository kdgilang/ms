import { Types } from 'mongoose'

export enum EStatus {
    active = 'active',
    inactive = 'inactive',
    emailnotverified = 'email not verified'
}

export interface IUserModel {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token: string
    status: EStatus
    userDetail: Types.ObjectId
}

export class UserModel implements IUserModel {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    avatar?: string
    password: string
    token: string
    status: EStatus
    userDetail: Types.ObjectId
    constructor() {
        this._id = new Types.ObjectId()
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.status = EStatus.emailnotverified
        this.userDetail = new Types.ObjectId()
        this.token = ''
    }
}