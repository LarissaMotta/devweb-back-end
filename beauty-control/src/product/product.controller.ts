import { Controller } from '@nestjs/common';
import { Product } from './product.entity';
import { GenericController } from 'src/generic.controller';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends GenericController<Product> {
    
    constructor(
        private pService: ProductService, 
      ) {
        super(pService);
      }
}