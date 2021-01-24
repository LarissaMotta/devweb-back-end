import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { BaseAuditedService } from 'src/base-audited.service';
import { StatusProduct } from 'src/enums/status-product.enum';
import { StatusStock } from 'src/enums/status-stcok.enum';

@Injectable()
export class ProductService extends BaseAuditedService<Product> {
    constructor(
        @InjectRepository(Product)
        public pRepository: Repository<Product>,
    ) {
        super(pRepository);
    }

    async getMoreUsedProducts(): Promise<{ name: string, id: number, orders: number }[]>{
        const response =  await this.pRepository
            .createQueryBuilder('p')
            .innerJoin('p.productStockLogs', 'productStockLogs')
            .addSelect('SUM(productStockLogs.quantity)', 'orders')
            .where('productStockLogs.status = :status', { status: StatusStock.OUTPUT })
            .groupBy('p.id, p.name, p.description, p.category, p.createdIn, p.updatedIn, p.deletedIn, p.createdBy, p.updatedBy, p.deletedBy, p.version')
            .orderBy('orders')
            .getRawAndEntities();

        const moreUserProducts = response.entities.map(x => {
            const raw = response.raw.find(y => y.p_id = x.id);
            return { name: x.name, id: x.id, orders: Number(raw.orders) }
        })

        return moreUserProducts;
    }

    async getStockFlow(): Promise<Product[]> {
        return await this.pRepository.find({ relations: ['productStockLogs'] });
    }

    async atualizaStatus(product){
        product = await this.pRepository.findOne(product);

        if (product.quantity > product.runnigOutOfStock) product.status = StatusProduct.IN_STOCK;
        else if (product.quantity < product.runnigOutOfStock && product.quantity > 0) product.status = StatusProduct.RUNNIG_OUT_OF_STOCK;
        else product.status = StatusProduct.OUT_OF_STOCK;

        await this.pRepository.save(product);
    }
}
