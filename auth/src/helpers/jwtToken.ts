import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../consts/authConst'

export const generateToken = (email: string): string => {
    return jwt.sign({email}, TOKEN_SECRET, { expiresIn: '10s' })
}