import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { BaseAuditedService } from 'src/base-audited.service';
import { StatusProduct } from 'src/enums/status-product.enum';
import { StatusStock } from 'src/enums/status-stcok.enum';
import { ProductStockLog } from 'src/entities/product-stock-log';
import { ProductWorkflowViewModel } from 'src/views-model/product-workflow.viewmodel';
import { Supplier } from 'src/entities/supplier.entity';
import { ProductPurchasedViewModel } from 'src/views-model/product-purchased.viewmodel';

@Injectable()
export class ProductService extends BaseAuditedService<Product> {
    constructor(
        @InjectRepository(Product)
        public pRepository: Repository<Product>,
        @InjectRepository(Supplier)
        private sRepository: Repository<Supplier>,
    ) {
        super(pRepository);
    }

    async getMoreUsedProducts(): Promise<{ name: string, id: number, orders: number }[]> {
        const response = await this.pRepository
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

    async atualizaStatus(product, productStockLog: ProductStockLog, criando: boolean) {
        product = await this.pRepository.findOne(product);
        product.quantity += (productStockLog.status == StatusStock.INPUT && criando) || (productStockLog.status == StatusStock.OUTPUT && !criando) ? productStockLog.quantity : - productStockLog.quantity;

        if (product.quantity > product.runnigOutOfStock) product.status = StatusProduct.IN_STOCK;
        else if (product.quantity < product.runnigOutOfStock && product.quantity > 0) product.status = StatusProduct.RUNNIG_OUT_OF_STOCK;
        else product.status = StatusProduct.OUT_OF_STOCK;

        await this.pRepository.save(product);
    }

    private getInputsOrOutputs(products: Product[], status: StatusStock): ProductWorkflowViewModel[] {
        return products.map(x => ({
            id: x.id, name: x.name, category: x.category, quantity: x.productStockLogs
                .filter(y => y.status === status)
                .map(y => y.quantity)
                .reduce((a, b) => a + b, 0)
        }));
    }

    async getProductWorkflowReport(startDate?: Date, endDate?: Date): Promise<{ inputs: ProductWorkflowViewModel[], outputs: ProductWorkflowViewModel[] }> {
        let query = this.pRepository.createQueryBuilder('p')
            .innerJoinAndSelect('p.productStockLogs', 'productStockLogs')

        if (!isNaN(startDate.getTime())) query = query.where("productStockLogs.date >= :startDate", { startDate })
        if (!isNaN(endDate.getTime())) query = query.andWhere("productStockLogs.date <= :endDate", { endDate })

        const products = await query.getMany();

        const inputs = this.getInputsOrOutputs(products, StatusStock.INPUT);
        const outputs = this.getInputsOrOutputs(products, StatusStock.OUTPUT);
        return { inputs, outputs };
    }

    async getProductPuchasedBySupplierReport(startDate?: Date, endDate?: Date): Promise<ProductPurchasedViewModel[]> {
        let query = this.sRepository.createQueryBuilder('s')
            .innerJoinAndSelect('s.productSuppliers', 'ps')
            .innerJoinAndSelect('ps.product', 'p')
            .innerJoinAndSelect('p.productStockLogs', 'productStockLogs')
            .where('productStockLogs.status = :status', { status: StatusStock.INPUT })

        if (!isNaN(startDate.getTime())) query = query.andWhere("productStockLogs.date >= :startDate", { startDate })
        if (!isNaN(endDate.getTime())) query = query.andWhere("productStockLogs.date <= :endDate", { endDate })

        const suppliers = await query.getMany();

        const retorno = suppliers.map(s => ({
            id: s.id, name: s.name, products: s.productSuppliers.map(
                ps => ({
                    id: ps.product.id, name: ps.product.name, category: ps.product.category, quantity: ps.product.productStockLogs
                        .map(y => y.quantity)
                        .reduce((a, b) => a + b, 0)
                })
            )
        }));

        return retorno
    }
}
