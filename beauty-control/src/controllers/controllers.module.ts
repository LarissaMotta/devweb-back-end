import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ServicesModule } from 'src/services/services.module';
import { AuthStrategiesModule } from 'src/auth-strategies/auth-strategies.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { SupplierController } from './supplier.controller';
import { ProductStockLogController } from './product-stock-log.controller';
import { ReportController } from './report.controller';
import {IndexController} from './index.controller';

@Module({
    imports: [
        ServicesModule,
        AuthStrategiesModule
    ],
    controllers: [
        IndexController,
        ProductController,
        UserController,
        AuthController,
        SupplierController,
        ProductStockLogController,
        ReportController
    ],
})
export class ControllersModule {}
