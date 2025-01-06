import { User } from "../entities/users";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    user: User; 
}
export interface CustomError extends Error {  
  status?: number;  
} 