
import { Request, Response, NextFunction } from "express";


interface CustomError extends Error {  
    status?: number; // Optional property for status  
} 

export const errorHandler = (err:CustomError, req:Request, res:Response, next:NextFunction) => {
    const status = err.status ?? 500;
    const message = err.message ?? "Internal server error";
    res.status(status).json({status, message });
}