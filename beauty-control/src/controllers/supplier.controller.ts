import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Supplier } from 'src/entities/supplier.entity';
import { SupplierService } from 'src/services/supplier.service';
import { BaseAuditedController } from 'src/base-audited.controller';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('suppliers')
@ApiBearerAuth()
@Controller('suppliers')
export class SupplierController extends BaseAuditedController<Supplier> {
    
    constructor(
        private sService: SupplierService
    ) {
        super(sService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createSupplier(@Body() supplier: Supplier, @Req() req): Promise<Supplier> {
        return await super.createBaseAudited(supplier, req);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateSupplier(@Param('id') id: number, @Body() supplier: Supplier, @Req() req): Promise<Supplier> {
        return await super.updateBaseAudited(id, supplier, req);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteSupplier(@Param('id') id: number, @Req() req): Promise<void> {
        await super.softDelete(id, req);
    }

}