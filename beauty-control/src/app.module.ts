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
      // host: process.env.HOST || 'localhost',
      // port: parseInt(process.env.DATABASE_PORT) || 5432,
      // username: process.env.USERNAME || 'postgres',
      // password: process.env.PASS || 'devweb',
      // database: process.env.DATABASE || 'beauty_control',
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
      url: process.env.DATABASE_URL
    }),
  ]
})
export class AppModule {}
