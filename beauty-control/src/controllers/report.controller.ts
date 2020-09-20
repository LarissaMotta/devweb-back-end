import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth-strategies/jwt-strategy.guard";
import { ProductService } from "src/services/product.service";
import { SupplierService } from "src/services/supplier.service";

@ApiTags('report')
@ApiBearerAuth()
@Controller('report')
export class ReportController {
    
    constructor(private productService: ProductService, private supplierService: SupplierService) {}

    @UseGuards(JwtAuthGuard)
    @Get('products')
    async getProductsReport() {
        const moreUseProducts = await this.productService.getMoreUsedProducts();
        const stockFlow = await this.productService.getStockFlow();

        return { moreUseProducts, stockFlow };
    }

    @UseGuards(JwtAuthGuard)
    @Get('suppliers')
    async getSuppliersReport() {
        const bestsSupplier = await this.supplierService.getBestsSuppliers();
        return { bestsSupplier };
    }
}