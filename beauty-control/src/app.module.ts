import { AuthStrategiesModule } from './auth-strategies/auth-strategies.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { Product } from './entities/product.entity';
import { ProductSupplier } from './entities/product-supplier.entity';
import { Supplier } from './entities/supplier.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ControllersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'tuffi.db.elephantsql.com',
      port: 5432,
      username: 'rcvzjvep',
      password: 'asMGCyWGa93NEXDHfr6p6dmkmMUndEhN',
      database: 'rcvzjvep',
      entities: [
        Product,
        ProductSupplier,
        Supplier,
        User
      ],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
