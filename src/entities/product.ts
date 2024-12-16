import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./users";

@Entity()
export class Product { 

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column( {type: "decimal"})
    price: number;

    @Column("text")
    description: string

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    user: User

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
    
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

}