import { Request, Response, } from 'express'
import { validationResult } from 'express-validator';
import { AddUserResponseType } from '../types/addUserType'
import { IUserModel } from '../models/userModel';
import addUserRepository from '../repositories/addUserRepository'

export default async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ ...errors })
  }

  const userReq = req.body as IUserModel;

  const newUser = await addUserRepository(userReq) as AddUserResponseType

  res.json(newUser)
}