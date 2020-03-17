import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Supplier } from "./supplier.entity";
import { User } from "./user.entity";

@Entity()
export class UserSupplierRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(type => User, u => u.userSupplierRating)
    user: User;

    @ManyToOne(type => Supplier, s => s.userSupplierRating)
    supplier: Supplier;
    
}