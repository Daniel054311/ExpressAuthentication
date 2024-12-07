import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
 
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', default: '' })
    firstName: string;

    @Column({ type: 'varchar', default: '' })
    lastName: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;

    @Column({default: false})
    isAdmin: boolean;
    
}