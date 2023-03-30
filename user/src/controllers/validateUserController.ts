import { Request, Response, } from 'express'
import { validationResult } from 'express-validator'
import { ValidateUserReqType } from '../types/validateUserType'
import validateUserRepository from '../repositories/validateUserRepository'

export default async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors })
  }

  const userReq = req.body as ValidateUserReqType;
  
  try {
    const isValid = await validateUserRepository(userReq)

    res.json(isValid)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }
}