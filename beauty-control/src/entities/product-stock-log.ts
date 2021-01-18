import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';
import { IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { User } from './user.entity';
import { StatusStock } from 'src/enums/status-stcok.enum';

@Entity()
export class ProductStockLog {

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

    @Column({type: 'enum', enum: StatusStock })
    @IsEnum(StatusStock)
    @ApiProperty({ enum: StatusStock })
    status: StatusStock

    @ManyToOne(type => Product, p => p.productSuppliers, { onDelete: 'CASCADE' })
    product: Product;

    @ManyToOne(type => Supplier, s => s.productSuppliers, { onDelete: 'CASCADE', nullable: true })
    supplier: Supplier;

    @ManyToOne(type => User, s => s.productStockLogs, { onDelete: 'CASCADE' })
    user: User;
}