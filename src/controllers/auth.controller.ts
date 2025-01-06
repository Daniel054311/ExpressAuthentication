import { Request, Response } from "express";
import { AuthenticatedRequest } from "../dto/types";
import {
  findUserByEmail,
  saveUser,
} from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { generateRefreshToken, generateToken } from "../utils/jwt.util";
import { omitFields } from "../utils/omit.utils";
import { loginSchema, registerSchema } from "../utils/validation.util";

class AuthControllers {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { email, password } = req.body;

      if (await findUserByEmail(email)) {
        res.status(409).json({ message: "This account already exists" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      await saveUser({
        ...req.body,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
      }

      const { email, password } = req.body;

      const user = await findUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Invalid password or email"});
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      const token = generateToken({ id: user.id, email: user.email });
      

      const userWithoutPassword = omitFields(user, ["password"]);

      res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const email = (req as AuthenticatedRequest).user.email;
      
      const user = await findUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
        return;
      }
      const newAccessToken = generateRefreshToken(
        { id: user.id, email: user.email }    );
      res.status(200).json({
        message: "New access token issued",
        token: newAccessToken,
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired refresh token" });
    }
  }
}

export default AuthControllers;
