import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService extends GenericService<Product> {
    constructor(
        @InjectRepository(Product)
        public repository: Repository<Product>,
      ) {
        super(repository);
      }
}
