import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { Category } from 'src/enums/category.enum';
import { ProductSupplier } from './product-supplier.entity';

@Entity()
export class Product extends BaseAudited {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: Category })
    category: Category

    @OneToMany(type => ProductSupplier, ps => ps.product)
    productSuppliers: ProductSupplier[];

    @Column( { nullable: true })
    img: string;
}