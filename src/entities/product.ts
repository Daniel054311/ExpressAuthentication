import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity()
export class Product { 

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column()
    price: number;

    @Column("text")
    description: string

    @ManyToOne(() => User, (user) => user.products)
    @JoinColumn()
    user: User

}