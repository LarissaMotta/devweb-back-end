import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { Supplier } from 'src/entities/supplier.entity copy';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSupplier,
            Supplier
        ])
    ],
    providers: [
        ProductService
    ],
    exports: [
        ProductService
    ]
})
export class ServicesModule {}
