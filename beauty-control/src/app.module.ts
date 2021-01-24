import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { Product } from './entities/product.entity';
import { ProductSupplier } from './entities/product-supplier.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';
import { UserSupplierRating } from './entities/user-supplier-rating.entity';
import { ProductStockLog } from './entities/product-stock-log';

@Module({
  imports: [
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
      },
      url: process.env.DATABASE_URL_ELEPHANT_SQL || 'postgres://rcvzjvep:asMGCyWGa93NEXDHfr6p6dmkmMUndEhN@tuffi.db.elephantsql.com:5432/rcvzjvep'
    }),
  ]
})
export class AppModule {}
