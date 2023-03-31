import { AuthRequestType } from '../types/authType'
import userProvider from '../providers/userProvider'
import { generateToken } from '../helpers/jwtToken'

export default async (params: AuthRequestType)  => {
  try {
    if (!params) return false

    let authRes: any = await new Promise((res, rej) => {
      userProvider.validate(params, (err: any, data: any) => {
        if (!err) {
          res(data) 
        }

        rej(err)
      })
    })

    if (authRes?.status) {
      const { email } = params
      const token = generateToken(email)

      await new Promise((res, rej) => {
        userProvider.updateToken({ email, token }, (err: any, data: any) => {
          if (!err) {
            res(data)
            authRes.token = token;
          }
  
          rej(err)
        })
      })

    }

    return authRes

  } catch (err) {
    console.log(err)
    throw err
  }
}