import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { ProductStockLog } from 'src/entities/product-stock-log';
import { ProductStockLogService } from 'src/services/product-stock-log.service';

@ApiTags('product-stock-logs')
@ApiBearerAuth()
@Controller('product-stock-logs')
export class ProductStockLogController extends GenericController<ProductStockLog> {
    
    constructor(
        private pslService: ProductStockLogService
    ) {
        super(pslService);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() productStockLog: ProductStockLog): Promise<ProductStockLog> {
        return await super.create(productStockLog);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') id: number, @Body() productStockLog: ProductStockLog): Promise<ProductStockLog> {
        return await super.update(id, productStockLog)
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') id: number): Promise<void> {
        await super.delete(id);
    }
}