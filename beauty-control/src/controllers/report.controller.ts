import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth-strategies/jwt-strategy.guard";
import { UserRole } from "src/enums/user-role.enum";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/role.guard";
import { ProductService } from "src/services/product.service";
import { SupplierService } from "src/services/supplier.service";

@ApiTags('report')
@ApiBearerAuth()
@Controller('report')
export class ReportController {
    
    constructor(private productService: ProductService, private supplierService: SupplierService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('products')
    @Roles(UserRole.ADMIN)
    async getProductsReport() {
        const moreUseProducts = await this.productService.getMoreUsedProducts();
        const stockFlow = await this.productService.getStockFlow();

        return { moreUseProducts, stockFlow };
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('suppliers')
    @Roles(UserRole.ADMIN)
    async getSuppliersReport() {
        const bestsSupplier = await this.supplierService.getBestsSuppliers();
        return { bestsSupplier };
    }
}