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
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "ca02d8e2f7d6003b6f2d17f746391d42c43737fc5cd6ea58bbe632b7df5e565696bcbb09527f8e1526a03361ac58f3cbe82f615ee22a9d5cd53bd7ae88c7120b";
  const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET ?? "f3b6e91e6c7a29e345f5d9b76a186a1cf93ef31f1195ad393cd7a6158bd2d5cd399f7887af990f0d4f08477208a50dbd1689bf4558bfaf0b5e257cd78b70c711";


  if (!token) {
    res.status(401).json({ message: "Authentication token is missing" });
    return;
  }

  const decodedToken = verifyToken(token,REFRESH_TOKEN_SECRET) ?? verifyToken(token,JWT_SECRET_KEY) ;

  if (!decodedToken) {
    res
      .status(401)
      .json({ message: "Invalid or expired authentication token" });
    return;
  }

  (req as AuthenticatedRequest).user = decodedToken as User;
  next();
};
