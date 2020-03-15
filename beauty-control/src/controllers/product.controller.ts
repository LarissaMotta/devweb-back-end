import { Controller } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController extends GenericController<Product> {
    
    constructor(
        private pService: ProductService, 
      ) {
        super(pService);
      }
}