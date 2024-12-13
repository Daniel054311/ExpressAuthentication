import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product";
import { Role } from "./role";

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
    
    @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: false, onDelete: 'CASCADE' })
    userRole: Role;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.user,{nullable:false})
    products: Product[];
    
}