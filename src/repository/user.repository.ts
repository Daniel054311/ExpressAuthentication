import connectDB from "../data-source";
import { UserRole } from "../dto/dto.userRoles";
import { Role } from "../entities/role";
import { User } from "../entities/users";

const userRepository = connectDB.getRepository(User);
const roleRepository = connectDB.getRepository(Role);

export const findUserByEmail = async (email: string) => {
    return await userRepository.findOneBy({ email });
};




export const saveUser = async (userData: Partial<User>): Promise<User> => { 
const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);    
}


export const createUserRole = async (roleName: string): Promise<Role > => {
    let role = await roleRepository.findOne({ where: { name: roleName } });
    if (!role) {
        role = roleRepository.create({ name: roleName });
        await roleRepository.save(role);
    }
    return role;
};



export const findUserById = async (userId: string) => {
    console.log("Searching for user with ID:", userId);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        console.log("User not found in database.");
    }
    return user;
};