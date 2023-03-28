import { Request, Response } from 'express'
import userProvider from '../providers/client-user'

export default async (req: Request, res: Response) => {
    const users = await new Promise((res, rej) => {
        userProvider.getAll(null, (err: any, data: any) => {
            if (!err) {
                res({
                    results: data.customers
                })
            }

            rej(err)
        })
    })

    res.send(users)
}
