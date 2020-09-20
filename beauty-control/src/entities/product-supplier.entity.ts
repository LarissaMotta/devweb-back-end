import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';
import { IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';

@Entity()
export class ProductSupplier {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @Column()
    @IsNumber()
    @ApiProperty()
    quantity: number;

    @Column('timestamp')
    @IsDate()
    @Type(() => Date)
    @ApiProperty()
    date: Date

    @ManyToOne(type => Product, p => p.productSuppliers, { onDelete: 'CASCADE' })
    product: Product;

    @ManyToOne(type => Supplier, s => s.productSuppliers, { onDelete: 'CASCADE' })
    supplier: Supplier;
    

}