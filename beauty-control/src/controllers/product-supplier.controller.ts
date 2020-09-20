import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { ProductSupplierService } from 'src/services/product-supplier.service';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { UserRole } from 'src/enums/user-role.enum';

@ApiTags('product-suppliers')
@ApiBearerAuth()
@Controller('product-suppliers')
export class ProductSupplierController extends GenericController<ProductSupplier> {
    
    constructor(
        private psService: ProductSupplierService
    ) {
        super(psService);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() productSupplier: ProductSupplier): Promise<ProductSupplier> {
        return await super.create(productSupplier);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('id') id: number, @Body() productSupplier: ProductSupplier): Promise<ProductSupplier> {
        return await super.update(id, productSupplier)
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('id') id: number): Promise<void> {
        await super.delete(id);
    }
}