
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../dto/types";




export const errorHandler = (err:CustomError, req:Request, res:Response, next:NextFunction) => {
    const status = err.status ?? 500;
    const message = err.message ?? "Internal server error";
    res.status(status).json({status, message });
}