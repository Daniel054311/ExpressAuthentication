import bcrypt from "bcrypt";
import exp from "constants";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password:string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}