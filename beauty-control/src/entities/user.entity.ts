import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/enums/role.enum";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
    
    @Column({type: 'enum', enum: Role })
    role: Role
}