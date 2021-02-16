import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { ProductSupplier } from './product-supplier.entity';
import { UserSupplierRating } from './user-supplier-rating.entity';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Supplier extends BaseAudited {
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column('varchar', { length: 70 })
    @Length(4, 70)
    @ApiProperty()
    name: string;

    @Column('varchar', { length: 11 })
    @Length(10, 11)
    @ApiProperty()
    telephone: string;

    @Column('text')
    @Length(0)
    @ApiProperty()
    observation: string;

    @OneToMany(type => ProductSupplier, ps => ps.supplier)
    productSuppliers: ProductSupplier[];

    @OneToMany(type => UserSupplierRating, usr => usr.supplier)
    userSupplierRating: UserSupplierRating[];

    @ApiProperty()
    avgRating: number

    userRating: number;
}