import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { AuthUser } from '../types/context.js'
dotenv.config()

 interface User  {
     id: number
     email: string,
     role: string,
}

export const generateToken = (payload:User)=>{
    return jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: "7d"})
}

export const verifyToken = (token:string): AuthUser=>{
    return jwt.verify(token, process.env.JWT_KEY!) as AuthUser;
}

