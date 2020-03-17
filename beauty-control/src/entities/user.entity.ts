import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "src/enums/role.enum";
import { UserSupplierRating } from "./user-supplier-rating.entity";
import { Length, IsEmail, IsEnum } from "class-validator";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 40 })
    @Length(4, 40)
    name: string;

    @Column('varchar', { length: 70, unique: true })
    @IsEmail()
    @Length(4, 70)
    email: string;

    @Column('varchar', { length: 40 })
    @Length(6, 40)
    password: string;
    
    @Column({type: 'enum', enum: Role })
    @IsEnum(Role)
    role: Role

    @OneToMany(type => UserSupplierRating, usr => usr.user)
    userSupplierRating: UserSupplierRating[];

}