import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

 interface User  {
     id: number
     email: string,
     role: string,
}

export const generateToken = (payload:User)=>{
    return jwt.sign(payload, process.env.JWT_KEY!, {expiresIn: "7d"})
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token, process.env.JWT_KEY!);
}

