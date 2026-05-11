import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.js'



export const signToken = (pyload) => {
    return jwt.sign(
        pyload,
        ENV.JWT_SECRET,
        {
            expiresIn: ENV.JWT_EXPIRES_IN
        }
    )
}

export const verifyToken = (token) => {
    return jwt.verify(token, ENV.JWT_SECRET)
}

