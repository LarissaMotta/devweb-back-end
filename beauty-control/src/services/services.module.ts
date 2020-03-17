import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { Supplier } from 'src/entities/supplier.entity';
import { AuthService } from './auth.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserSupplierRating } from 'src/entities/user-supplier-rating.entity';
import { SupplierService } from './supplier.service';
import { ProductSupplierService } from './product-supplier.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductSupplier,
            Supplier,
            User,
            UserSupplierRating
        ]),
        JwtModule.register({
            secret: 'DevWeb'
        }),
    ],
    providers: [
        ProductService,
        UserService,
        AuthService,
        SupplierService,
        ProductSupplierService
    ],
    exports: [
        ProductService,
        UserService,
        AuthService,
        SupplierService,
        ProductSupplierService
    ]
})
export class ServicesModule {}
