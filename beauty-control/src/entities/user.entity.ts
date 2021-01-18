import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserRole } from "src/enums/user-role.enum";
import { UserSupplierRating } from "./user-supplier-rating.entity";
import { Length, IsEmail, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProductStockLog } from "./product-stock-log";
import { ProductSupplier } from "./product-supplier.entity";

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

    @Column('varchar', { length: 100 })
    @Length(6, 40)
    password: string;
    
    @Column({type: 'enum', enum: UserRole })
    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole

    @Column()
    @ApiProperty()
    active: boolean;

    @OneToMany(type => UserSupplierRating, usr => usr.user)
    userSupplierRating: UserSupplierRating[];

    @OneToMany(type => ProductStockLog, usr => usr.user)
    productStockLogs: ProductStockLog[];

    @OneToMany(type => ProductSupplier, usr => usr.user)
    productSuppliers: ProductSupplier[];
}