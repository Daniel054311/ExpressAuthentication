import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../dto/dto.userRoles";
import { Product } from "./product";

@Entity()
export class User {
 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 50 , default: '' })
    firstName: string;

    @Column({ type: 'varchar',  length: 50 , default: '' })
    lastName: string;

    @Column({ unique: true })
    email: string;
    
    
    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
    role: UserRole;
    

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];
    
}