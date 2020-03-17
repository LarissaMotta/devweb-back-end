import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad, RelationId } from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { Category } from 'src/enums/category.enum';
import { ProductSupplier } from './product-supplier.entity';
import { IsEnum, Length } from 'class-validator';

@Entity()
export class Product extends BaseAudited {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 70 })
    @Length(4, 70)
    name: string;

    @Column('text')
    @Length(0)
    description: string;

    @Column({type: 'enum', enum: Category })
    @IsEnum(Category)
    category: Category

    @OneToMany(type => ProductSupplier, ps => ps.product)
    productSuppliers: Promise<ProductSupplier[]>;

    @RelationId('productSuppliers')
    productSuppliersIds: number[];

    @Column('varchar', { nullable: true, length: 70 })
    img: string;

    quantity: number

    @AfterLoad()
    async getQuantity(){
        this.quantity =  (await this.productSuppliers).map(ps => ps.quantity).reduce((p, c) => p + c, 0);
    }
}