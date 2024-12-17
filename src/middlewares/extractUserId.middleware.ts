import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../dto/types";

export const extractUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = (req as AuthenticatedRequest).user.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized request" });
    return;
  }

  (req as AuthenticatedRequest).user.id = userId;

  next();
};
