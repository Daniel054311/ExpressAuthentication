import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/validation.util";
import connectDB from "../data-source";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { findUserByEmail, saveUser } from "../repository/user.repository";
import { User } from "../entities/users";

const userRepository = connectDB.getRepository(User);

export const register = async(req: Request, res: Response) => { 
    try {
      
        // Validate request body
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message:error.details[0].message})
        }

        const { email, password } = req.body;

        // Check if user already exists
        if (await findUserByEmail(email)) {  
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await saveUser({email, password: hashedPassword});
        return res.status(201).json({ message: "User registered successfully",user:newUser });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
}
}


export const login = async(req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({message:error.details[0].message})
        }

        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) { 
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.email);
        if (!isPasswordValid) { 
            return res.status(401).json({ message: "Invalid password" });
        }
       

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}
