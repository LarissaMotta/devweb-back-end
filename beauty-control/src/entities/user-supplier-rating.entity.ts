import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Supplier } from "./supplier.entity";
import { User } from "./user.entity";
import { IsNumber } from "class-validator";

@Entity()
export class UserSupplierRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    rating: number;

    @ManyToOne(type => User, u => u.userSupplierRating)
    user: User;

    @ManyToOne(type => Supplier, s => s.userSupplierRating)
    supplier: Supplier;
    
}