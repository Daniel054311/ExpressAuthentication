import jwt, { JwtPayload } from "jsonwebtoken";



const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "ca02d8e2f7d6003b6f2d17f746391d42c43737fc5cd6ea58bbe632b7df5e565696bcbb09527f8e1526a03361ac58f3cbe82f615ee22a9d5cd53bd7ae88c7120b";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET ?? "f3b6e91e6c7a29e345f5d9b76a186a1cf93ef31f1195ad393cd7a6158bd2d5cd399f7887af990f0d4f08477208a50dbd1689bf4558bfaf0b5e257cd78b70c711";
export const generateToken = (payload:object,expiresIn:string = "1d") => {
    return jwt.sign(payload,JWT_SECRET_KEY,{expiresIn});
}

export const generateRefreshToken = (payload: object, expiresIn: string = "3d"): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn });
};

export const verifyToken = (token: string, secretKey: string = JWT_SECRET_KEY ): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return typeof decoded === 'object' ? decoded  : null;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null; 
    }
};

