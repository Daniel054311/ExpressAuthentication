
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserRole } from "../dto/dto.userRoles";
import { AuthenticatedRequest } from "../dto/types";
import { findUserById } from "../repository/user.repository";



export const checkUserRole = (allowedRoles: UserRole[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as AuthenticatedRequest).user?.id; 
            console.log(userId)
            if (!userId) {
                res.status(401).json({ message: "Unauthorized: User ID is required" });
                return
            }

            const user = await findUserById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return
            }

            const userRole = user.userRole.name; 

            if (!allowedRoles.includes(userRole as UserRole)) {
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

