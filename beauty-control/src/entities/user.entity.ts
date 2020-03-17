import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "src/enums/role.enum";
import { ProductSupplier } from "./product-supplier.entity";
import { UserSupplierRating } from "./user-supplier-rating.entity";

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

    @OneToMany(type => UserSupplierRating, usr => usr.user)
    userSupplierRating: UserSupplierRating[];

}