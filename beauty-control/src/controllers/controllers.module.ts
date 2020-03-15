import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ServicesModule } from 'src/services/services.module';
import { AuthStrategiesModule } from 'src/auth-strategies/auth-strategies.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ServicesModule,
        AuthStrategiesModule
    ],
    controllers: [
        ProductController,
        UserController,
        AuthController
    ],
})
export class ControllersModule {}
