import { Controller } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { ProductSupplierService } from 'src/services/product-supplier.service';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('product-suppliers')
@ApiBearerAuth()
@Controller('product-suppliers')
export class ProductSupplierController extends GenericController<ProductSupplier> {
    
    constructor(
        private psService: ProductSupplierService
    ) {
        super(psService);
    }
}