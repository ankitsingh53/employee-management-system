import {verifyToken} from '../utils/jwt.js'
import dotenv from 'dotenv'
import type { Request } from "express";
import type { AuthUser } from '../types/context.js';
dotenv.config()
export const authenticate =  (req: Request): AuthUser | undefined => {
    const token =  req.cookies?.token;
    if (!token) 
    return undefined;

    try {
        return verifyToken(token);
    } catch {
        return undefined;
    }
};