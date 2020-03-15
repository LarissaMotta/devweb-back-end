import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './controllers/controllers.module';
import { Product } from './entities/product.entity';

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
        Product
      ],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
