import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad, RelationId} from 'typeorm';
import { BaseAudited } from 'src/models/base-audited.model';
import { Category } from 'src/enums/category.enum';
import { ProductSupplier } from './product-supplier.entity';
import { IsEnum, IsNumber, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStockLog } from './product-stock-log';
import { StatusProduct } from 'src/enums/status-product.enum';
import { StatusStock } from 'src/enums/status-stcok.enum';

@Entity()
export class Product extends BaseAudited {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number;

    @Column('varchar', { length: 70 })
    @ApiProperty()
    @Length(4, 70)
    name: string;

    @Column('text')
    @Length(0)
    @ApiProperty()
    description: string;

    @Column({type: 'enum', enum: Category })
    @IsEnum(Category)
    @ApiProperty({ enum: Category })
    category: Category

    @OneToMany(type => ProductSupplier, ps => ps.product)
    productSuppliers: Promise<ProductSupplier[]>;

    @OneToMany(type => ProductStockLog, ps => ps.product)
    productStockLogs: Promise<ProductStockLog[]>;

    @RelationId('productSuppliers')
    productSuppliersIds: number[];

    @RelationId('productStockLogs')
    productStockLogsIds: number[];

    @Column('varchar', { nullable: true, length: 70 })
    img: string;

    @Column('int', { default: 0 })
    @ApiProperty()
    runnigOutOfStock: number;

    @Column({type: 'enum', enum: StatusProduct })
    @IsEnum(StatusProduct)
    @ApiProperty({ enum: StatusProduct })
    status: StatusProduct

    quantity: number;

    @AfterLoad()
    async getQuantity(){
        this.quantity =  (await this.productStockLogs).map(ps => ps.status === StatusStock.INPUT ? ps.quantity : - ps.quantity).reduce((p, c) => p + c, 0);
    }
    
}