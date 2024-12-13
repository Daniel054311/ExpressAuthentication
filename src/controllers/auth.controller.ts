import { Request, Response } from "express";
import { createUserRole, findUserByEmail, saveUser } from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { generateRefreshToken, generateToken } from "../utils/jwt.util";
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

            const token = generateToken({ id: user.id, email: user.email }, "1m");
       

            const refreshToken = generateRefreshToken({ id: user.id, email: user.email }, "5d");
        
            res.status(200).json({
                message: "Login successful",
                token,
                refreshToken
            });
            return;

        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }


}

export default AuthControllers;