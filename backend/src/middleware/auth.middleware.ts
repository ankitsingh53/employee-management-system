import {verifyToken} from '../utils/jwt.js'
import dotenv from 'dotenv'
import type { Request } from "express";
dotenv.config()
export const authenticate =  (req: Request) => {
    const token =  req.cookies?.token;
    if (!token) 
    return null;
    try {
        const decoded = verifyToken(token);

        return decoded;
    } catch {
        return null;
    }
};