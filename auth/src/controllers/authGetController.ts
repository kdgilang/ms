import { Request, Response } from 'express'
import userProvider from '../providers/userProvider'

export default async (req: Request, res: Response) => {
    try {
        const isValid = await new Promise((res, rej) => {
            userProvider.validate({email: 'gilang@icloud.com', password: 'Tatababa123'}, (err: any, _: any) => {
                if (!err) {
                    res(_) 
                }
    
                rej(err)
            })
        })
        res.send(isValid)
    } catch (err) {
        res.send(err)
    }

}
