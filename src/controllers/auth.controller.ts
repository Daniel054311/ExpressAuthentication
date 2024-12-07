import { Request, Response } from "express";
import { findUserByEmail, saveUser } from "../repository/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { generateToken } from "../utils/jwt.util";
import { loginSchema, registerSchema } from "../utils/validation.util";


export const register = async(req: Request, res: Response): Promise<void> => { 
    try {

        // Validate request body
        const { error } = registerSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const { email, password, firstName, lastName, isAdmin } = req.body;

        // Check if user already exists
        if (await findUserByEmail(email)) {  
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await saveUser({ email, password: hashedPassword, firstName, lastName, isAdmin });
        res.status(201).json({ message: "User registered successfully", user: newUser });
        return;

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
}
}


export const login = async(req: Request, res: Response):Promise<void> => {
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

        const token = generateToken({ id: user.id, email: user.email }, "1d");

        
         res.status(200).json({
            message: "Login successful",
            token,
            user: user,
        });
        return; 

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
