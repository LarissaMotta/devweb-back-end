import { ProductModule } from './product/product.module';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';

@Module({
  imports: [
    ProductModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'devweb',
      database: 'beauty_control',
      entities: [
        Product
      ],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
