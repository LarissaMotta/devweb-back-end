import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService extends GenericService<Product> {
    constructor(
        @InjectRepository(Product)
        public repository: Repository<Product>,
      ) {
        super(repository);
      }
}
