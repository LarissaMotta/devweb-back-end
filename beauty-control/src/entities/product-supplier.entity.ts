import { Entity, Column, ManyToOne, RelationId, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';
import { IsNumber, IsDate } from 'class-validator';

@Entity()
export class ProductSupplier {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsNumber()
    quantity: number;

    @CreateDateColumn()
    @IsDate()
    createdDate: Date

    @ManyToOne(type => Product, p => p.productSuppliers)
    product: Product;

    @ManyToOne(type => Supplier, s => s.productSuppliers)
    supplier: Supplier;

}