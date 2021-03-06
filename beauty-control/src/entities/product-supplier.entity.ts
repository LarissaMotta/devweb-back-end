import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';
import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { User } from './user.entity';

@Entity()
export class ProductSupplier {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @Column('timestamp')
    @IsDate()
    @Type(() => Date)
    @ApiProperty()
    date: Date

    @ManyToOne(type => Product, p => p.productSuppliers, { onDelete: 'CASCADE' })
    product: Product;

    @ManyToOne(type => Supplier, s => s.productSuppliers, { onDelete: 'CASCADE' })
    supplier: Supplier;

    @ManyToOne(type => User, s => s.productSuppliers, { onDelete: 'CASCADE' })
    user: User;
}