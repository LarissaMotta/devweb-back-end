import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "src/enums/role.enum";
import { ProductSupplier } from "./product-supplier.entity";
import { UserSupplierRating } from "./user-supplier-rating.entity";
import {Length, IsEmail, IsEnum  } from "class-validator";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4,40)
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(6,40)
    password: string;
    
    @Column({type: 'enum', enum: Role })
    @IsEnum(Role)
    role: Role

    @OneToMany(type => UserSupplierRating, usr => usr.user)
    userSupplierRating: UserSupplierRating[];

}