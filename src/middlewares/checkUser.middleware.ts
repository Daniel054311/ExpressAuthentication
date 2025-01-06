
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserRole } from "../dto/dto.userRoles";
import { AuthenticatedRequest } from "../dto/types";
import { findUserWithRoles } from "../repository/user.repository";


export const checkUserRole = (allowedRoles: UserRole[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as AuthenticatedRequest).user.id; 
    
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return
            }

            const user = await findUserWithRoles(userId);
            if (!user) {
                res.status(404).json({ message: "Invalid password or email" });
                return
            }

            const userRole = user.role; 

            if (!allowedRoles.includes(userRole )) {
                res.status(403).json({ message: "Forbidden: You do not have permission to access this resource." });
                return;
            }

            next(); 
        } catch (error) {
            console.error("Error in checkUserRole middleware:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
};

