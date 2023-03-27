import { Request, Response } from 'express'
import clientUser from '../providers/client-user'

export default (req: Request, res: Response) => {
    res.send('healthy')
    // clientUser.getAll(null, (err: any, data: any) => {
    //     if (!err) {
    //         res.send({
    //             results: data.customers
    //         });
    //     }
    // })
}
