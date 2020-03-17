import { Controller, Get, UseGuards, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { ProductSupplierService } from 'src/services/product-supplier.service';
import { ProductSupplier } from 'src/entities/product-supplier.entity';

@Controller('product-suppliers')
export class ProductSupplierController extends GenericController<ProductSupplier> {
    
    constructor(
        private psService: ProductSupplierService
    ) {
        super(psService);
    }

}