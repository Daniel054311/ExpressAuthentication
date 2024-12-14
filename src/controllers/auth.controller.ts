import { Request, Response } from "express";
import { createUserRole, findUserByEmail, saveUser } from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { generateToken, verifyToken } from "../utils/jwt.util";
import { loginSchema, registerSchema } from "../utils/validation.util";



class AuthControllers {


     static async register (req: Request, res: Response): Promise<void>  {
        try {

            const { error } = registerSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { email, password, firstName, lastName, userRole } = req.body;


            if (await findUserByEmail(email)) {
                res.status(400).json({ message: "User already exists" });
                return;
            }
            
            const role = await createUserRole(userRole);
         
            const hashedPassword = await hashPassword(password);


            await saveUser({ email, password: hashedPassword, firstName, lastName,  userRole:role });
            res.status(201).json({ message: "User registered successfully" });
            return;

        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }


  static   async login (req: Request, res: Response): Promise<void> {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                res.status(400).json({ message: error.details[0].message });
                return;
            }

            const { email, password } = req.body;

            const user = await findUserByEmail(email);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
                return;
            }

            const token = generateToken({ id: user.id, email: user.email }, "1h");
       

            res.cookie("refreshToken", AuthControllers.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });

        
            res.status(200).json({
                message: "Login successful",
                token
            });
            return;

        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    static async refreshToken(req: Request, res: Response): Promise<void> {
        const refreshToken = req.cookies.refreshToken;  
        if (!refreshToken) {
            res.sendStatus(401)
            return 
        };   
        try {
            const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET ??"");
            const user = await findUserByEmail(decoded?.email);
            if (!user ) {
                res.status(401).json({ message: "Invalid or expired refresh token" });
                return;
            }
            const newAccessToken = generateToken({ id: user.id, email: user.email }, "1h");
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