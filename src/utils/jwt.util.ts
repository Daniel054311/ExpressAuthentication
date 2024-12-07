import jwt, { JwtPayload } from "jsonwebtoken";



const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "ca02d8e2f7d6003b6f2d17f746391d42c43737fc5cd6ea58bbe632b7df5e565696bcbb09527f8e1526a03361ac58f3cbe82f615ee22a9d5cd53bd7ae88c7120b";

export const generateToken = (payload:object,expiresIn:string) => {
    return jwt.sign(payload,JWT_SECRET_KEY,{expiresIn});
}

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return typeof decoded === 'object' ? decoded  : null;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null; 
    }
};