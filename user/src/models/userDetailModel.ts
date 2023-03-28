export interface IUserDetail {
    address: string
    phoneNumber: string
    gender: EGender
    status: string
    religion: EReligion
}

export class UserDetail implements IUserDetail {
    address: string
    phoneNumber: string
    gender: EGender
    status: string
    religion: EReligion

    constructor() {
        this.address = ''
        this.phoneNumber = ''
        this.status = ''
        this.gender = EGender.other
        this.religion = EReligion.ateis
    }
}

export enum EReligion {
    hindu = 'Hindu',
    islam = 'Islam',
    budha = 'Budha',
    kristen = 'kristen',
    ateis = 'Ateis'
}

export enum EGender {
    male = 'Male',
    female = 'Female',
    other = 'Other'
}
