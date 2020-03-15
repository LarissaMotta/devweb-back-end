import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
    imports: [
        ServicesModule
    ],
    controllers: [ProductController],
})
export class ControllersModule {}
