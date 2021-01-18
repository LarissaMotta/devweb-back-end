import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStockLog } from 'src/entities/product-stock-log';
import { StatusStock } from 'src/enums/status-stcok.enum';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProductStockLogService extends GenericService<ProductStockLog> {
    constructor(
        @InjectRepository(ProductStockLog)
        private pslRepository: Repository<ProductStockLog>,
        @InjectRepository(ProductSupplier)
        private psService: Repository<ProductSupplier>
    ) {
        super(pslRepository)
    }

    async create(productStockLog: ProductStockLog, user: User): Promise<ProductStockLog> {
        if (productStockLog.status === StatusStock.OUTPUT) {
            productStockLog.supplier = undefined;
        }

        let productSupplier = await this.psService.findOne({product: productStockLog.product, supplier: productStockLog.supplier });

        if (!productSupplier) {
            productSupplier = new ProductSupplier();
            productSupplier.product = productStockLog.product;
            productSupplier.supplier = productStockLog.supplier;
            productSupplier.user = user;

            this.psService.save(productSupplier);
        }
        
        productStockLog.user = user;
        return await this.psService.save(productStockLog);
    }
}
