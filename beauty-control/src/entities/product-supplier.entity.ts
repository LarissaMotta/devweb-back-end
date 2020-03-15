import { Entity, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Supplier } from './supplier.entity';

@Entity()
export class ProductSupplier {
    
    @Column()
    quantity: number;

    @ManyToOne(type => Product, p => p.productSuppliers, { primary: true })
    product: Product;

    @ManyToOne(type => Supplier, s => s.productSuppliers, { primary: true })
    supplier: Supplier;
    
}