import { Request, Response, } from 'express'
const { validationResult } = require('express-validator');
import { AuthRequestType } from '../types/authType'
import authRepository from '../repositories/authRepository'

export default async (req: Request, res: Response) => {
    const user = req.body as AuthRequestType;

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ ...errors })
    }

    try {
      const authRes: any = await authRepository(user)

      if (authRes?.token) {
        res.cookie('authToken', authRes.token, {
          maxAge: 10000,
          httpOnly: true
        }).send(authRes.token)

        return
      }

      res.status(404).json(authRes)
    } catch (err) {
      res.status(500).json(err)
    }
}
