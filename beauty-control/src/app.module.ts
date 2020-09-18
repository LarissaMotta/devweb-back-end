import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { Product } from './entities/product.entity';
import { ProductSupplier } from './entities/product-supplier.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';
import { UserSupplierRating } from './entities/user-supplier-rating.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role/role.guard';

@Module({
  imports: [
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'devweb',
      database: 'beauty_control',
      entities: [
        Product,
        ProductSupplier,
        Supplier,
        User,
        UserSupplierRating
      ],
      synchronize: true,
    }),
  ]
})
export class AppModule {}
