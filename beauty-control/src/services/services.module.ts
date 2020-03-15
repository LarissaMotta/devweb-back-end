import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Supplier } from 'src/entities/supplier.entity';
import { AuthService } from './auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSupplier,
            Supplier,
            User
        ])
    ],
    providers: [
        ProductService,
        UserService,
        AuthService
    ],
    exports: [
        ProductService,
        UserService,
        AuthService
    ]
})
export class ServicesModule {}
