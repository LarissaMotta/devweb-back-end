import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { Product } from './entities/product.entity';
import { ProductSupplier } from './entities/product-supplier.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';
import { UserSupplierRating } from './entities/user-supplier-rating.entity';
import { ProductStockLog } from './entities/product-stock-log';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      logging: true,
      entities: [
        Product,
        ProductSupplier,
        Supplier,
        User,
        UserSupplierRating,
        ProductStockLog
      ],
      synchronize: true,
      extra: {
        ssl: true,
        connectionLimit: 5
      },
      url: process.env.DATABASE_URL_ELEPHANT_SQL
    }),
  ]
})
export class AppModule {}
