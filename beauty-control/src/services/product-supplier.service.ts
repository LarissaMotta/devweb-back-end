import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSupplier } from 'src/entities/product-supplier.entity';

@Injectable()
export class ProductSupplierService extends GenericService<ProductSupplier> {
    constructor(
        @InjectRepository(ProductSupplier)
        private psRepository: Repository<ProductSupplier>
    ) {
        super(psRepository)
    }
}
