import {Request, Response,NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { User } from "../entities/users";

interface AuthenticatedRequest extends Request {  
    user?: User; 
} 

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) { 
        res.status(401).json({ message: "Authentication token is missing" });
        return;
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) { 
        res.status(401).json({ message: "Invalid or expired authentication token" });
        return;
    }
    
    req.user = decodedToken as User; 
    next(); 
};