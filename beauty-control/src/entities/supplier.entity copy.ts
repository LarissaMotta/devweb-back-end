import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { ProductSupplier } from './product-supplier.entity';

@Entity()
export class Supplier extends BaseAudited {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rating: number;

    @OneToMany(type => ProductSupplier, ps => ps.supplier)
    productSuppliers: ProductSupplier[];
    
}