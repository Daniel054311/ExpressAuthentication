import { Request, NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../dto/types";
import { User } from "../entities/users";
import { verifyToken } from "../utils/jwt.util";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication token is missing" });
    return;
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    res
      .status(401)
      .json({ message: "Invalid or expired authentication token" });
    return;
  }

  (req as AuthenticatedRequest).user = decodedToken as User;
  next();
};
