export interface IUserDetailModel {
    address: string
    phoneNumber: string
    gender: EGender
    religion: EReligion
}

export class UserDetailModel implements IUserDetailModel {
    address: string
    phoneNumber: string
    gender: EGender
    religion: EReligion

    constructor() {
        this.address = ''
        this.phoneNumber = ''
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
