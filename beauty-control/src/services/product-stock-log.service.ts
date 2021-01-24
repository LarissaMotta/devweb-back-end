import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStockLog } from 'src/entities/product-stock-log';
import { StatusStock } from 'src/enums/status-stcok.enum';
import { ProductSupplier } from 'src/entities/product-supplier.entity';
import { User } from 'src/entities/user.entity';
import { ProductService } from './product.service';

@Injectable()
export class ProductStockLogService extends GenericService<ProductStockLog> {
    constructor(
        @InjectRepository(ProductStockLog)
        private pslRepository: Repository<ProductStockLog>,
        @InjectRepository(ProductSupplier)
        private psRepository: Repository<ProductSupplier>,
        private pService: ProductService
    ) {
        super(pslRepository)
    }

    async create(productStockLog: ProductStockLog, user: User): Promise<ProductStockLog> {
        if (productStockLog.status === StatusStock.OUTPUT) {
            productStockLog.supplier = undefined;
        } else{
            let productSupplier = await this.psRepository.findOne({product: productStockLog.product, supplier: productStockLog.supplier });

            // Se não tiver relacionamento, cria um
            if (!productSupplier) {
                productSupplier = new ProductSupplier();
                productSupplier.product = productStockLog.product;
                productSupplier.supplier = productStockLog.supplier;
                productSupplier.user = user;
                productSupplier.date = productStockLog.date;

                await this.psRepository.save(productSupplier);
            }
        }
        
        // Salva o log
        productStockLog.user = user;
        productStockLog = await this.pslRepository.save(productStockLog);
        
        await this.pService.atualizaStatus(productStockLog.product, productStockLog, true);

        productStockLog.user = undefined;
        return productStockLog; 
    }

    async delete(id: number) {
        const productStockLog = await this.pslRepository.findOne(id, { relations: ['product'] });
        await super.delete(id);

        await this.pService.atualizaStatus(productStockLog.product.id, productStockLog, false);
    }

    private
}
