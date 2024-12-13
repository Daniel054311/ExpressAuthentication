import Joi from "joi";
import { UserRole } from "../dto/dto.userRoles";

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long.',
        'any.required': 'Password is required.',
    }),
    userRole: Joi.string().valid(UserRole.ADMIN, UserRole.SELLER, UserRole.BUYER).required().messages({
        'any.required': 'User role is required.',
        'any.only': `User role must be one of ${UserRole.ADMIN}, ${UserRole.SELLER}, or ${UserRole.BUYER}.`,
    }),
    firstName: Joi.string()  
    .min(1)  
    .max(30) 
    .required()  
    .messages({  
        'string.base': 'First name should be a string.',  
        'string.empty': 'First name cannot be empty.',  
        'string.min': 'First name must be at least 1 character long.',  
        'string.max': 'First name cannot exceed 30 characters.',  
        'any.required': 'First name is required.',  
    }),  
lastName: Joi.string()  
    .min(1)  
    .max(30) 
    .required()  
    .messages({  
        'string.base': 'Last name should be a string.',  
        'string.empty': 'Last name cannot be empty.',  
        'string.min': 'Last name must be at least 1 character long.',  
        'string.max': 'Last name cannot exceed 30 characters.',  
        'any.required': 'Last name is required.',  
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.',
    })
});


export const productSchema = Joi.object({
    name: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.empty': 'Name is required.',
            'string.max': 'Name cannot exceed 100 characters.',
            'any.required': 'Name is required.',
        }),

    imageUrl: Joi.string()
        .uri()
        .required()
        .messages({
            'string.uri': 'Image URL must be a valid URL.',
            'any.required': 'Image URL is required.',
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'Price must be a positive value.',
            'any.required': 'Price is required.',
        }),

    description: Joi.string()
        .required()
        .messages({
            'string.empty': 'Description is required.',
            'any.required': 'Description is required.',
        }),
});


