import { Request, Response } from 'express'
import userProvider from '../providers/userProvider'

export default async (req: Request, res: Response) => {
    try {

        res.send('healthy.')
    } catch (err) {
        res.send(err)
    }

}
