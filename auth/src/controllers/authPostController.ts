import { Request, Response, } from 'express'
const { validationResult } = require('express-validator');
import { AuthRequest } from '../types/authType'

export default (req: Request, res: Response) => {
    const user = req.query as AuthRequest;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ ...errors })
    }

    res.json(user)
}
