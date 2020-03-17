import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { BaseAuditedService } from 'src/base-audited.service';

@Injectable()
export class SupplierService extends BaseAuditedService<Supplier> {
    constructor(
        @InjectRepository(Supplier)
        private sRepository: Repository<Supplier>
    ) {
        super(sRepository)
    }
}
