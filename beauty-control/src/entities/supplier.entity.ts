import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { ProductSupplier } from './product-supplier.entity';
import { UserSupplierRating } from './user-supplier-rating.entity';

@Entity()
export class Supplier extends BaseAudited {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => ProductSupplier, ps => ps.supplier)
    productSuppliers: ProductSupplier[];

    @OneToMany(type => UserSupplierRating, usr => usr.supplier)
    userSupplierRating: Promise<UserSupplierRating[]>;

    rating: number

    @AfterLoad()
    async getRating(){
        const us = (await this.userSupplierRating);
        const soma = us.map(us => us.rating).reduce((p, c) => p + c, 0);

        if (us.length === 0) { this.rating = 0 }
        else { this.rating = soma / us.length; };
    }

}