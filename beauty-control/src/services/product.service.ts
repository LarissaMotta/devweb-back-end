import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { BaseAuditedService } from 'src/base-audited.service';

@Injectable()
export class ProductService extends BaseAuditedService<Product> {
    constructor(
        @InjectRepository(Product)
        public pRepository: Repository<Product>,
    ) {
        super(pRepository);
    }

}
