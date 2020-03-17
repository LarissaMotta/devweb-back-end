import { Controller, Get, UseGuards, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { Supplier } from 'src/entities/supplier.entity';
import { SupplierService } from 'src/services/supplier.service';
import { BaseAuditedController } from 'src/base-audited.controller';

@Controller('suppliers')
export class SupplierController extends BaseAuditedController<Supplier> {
    
    constructor(
        private sService: SupplierService
    ) {
        super(sService);
    }

}