import type { Request, Response } from "express";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface GraphQLContext {
  req: Request;
  res: Response;
  user: AuthUser | undefined;
}
