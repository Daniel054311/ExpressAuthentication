

// import { Request, Response, NextFunction } from 'express';
// import { AuthenticatedRequest } from '../dto/types';

// export const extractUserId = (req: Request, res: Response, next: NextFunction): void => {
//     const customReq = req as AuthenticatedRequest; 
//     if (!customReq.user) {
//         res.status(401).json({ message: "Authentication required" });
//         return; 
//     }
    
//     const userId = customReq.user.id;

//     customReq.user.id = userId;
//     next();
// };
