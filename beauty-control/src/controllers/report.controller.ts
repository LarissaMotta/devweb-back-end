import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth-strategies/jwt-strategy.guard";
import { UserRole } from "src/enums/user-role.enum";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/role.guard";
import { ProductService } from "src/services/product.service";
import { SupplierService } from "src/services/supplier.service";
import { UserService } from "src/services/user.service";
import { BestSupplier } from "src/views-model/best-suppliers.viewmodel";
import { ProductPurchasedViewModel } from "src/views-model/product-purchased.viewmodel";
import { ProductWorkflowViewModel } from "src/views-model/product-workflow.viewmodel";
import { UserSimplifiedViewModel } from "src/views-model/user-simplified.viewmodel";

@ApiTags('report')
@ApiBearerAuth()
@Controller('report')
export class ReportController {
    
    constructor(private productService: ProductService, private supplierService: SupplierService, private userService: UserService) {}

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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('product-workflow')
    @Roles(UserRole.ADMIN)
    @ApiQuery({
        name: 'startDate',
        required: false,
        type: Date
    })
    @ApiQuery({
        name: 'endDate',
        required: false,
        type: Date
    })
    async getProductWorkflowReport(@Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date): Promise<{ inputs: ProductWorkflowViewModel[], outputs: ProductWorkflowViewModel[] }> {
        return await this.productService.getProductWorkflowReport(startDate, endDate);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('product-purchased-by-supplier')
    @Roles(UserRole.ADMIN)
    @ApiQuery({
        name: 'startDate',
        required: false,
        type: Date
    })
    @ApiQuery({
        name: 'endDate',
        required: false,
        type: Date
    })
    async getProductPuchasedBySupplierReport(@Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date): Promise<ProductPurchasedViewModel[]> {
        return await this.productService.getProductPuchasedBySupplierReport(startDate, endDate);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('supplier-rating')
    @Roles(UserRole.ADMIN)
    @ApiQuery({
        name: 'averageRating',
        required: false,
        type: Number
    })
    async getBestSuppliers(@Query('averageRating') averageRating?: number): Promise<BestSupplier[]> {
        return await this.supplierService.getBestSuppliers(averageRating || 0);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('users-role')
    @Roles(UserRole.ADMIN)
    @ApiQuery({
        name: 'startDate',
        required: false,
        type: Date
    })
    @ApiQuery({
        name: 'endDate',
        required: false,
        type: Date
    })
    async getUsersByRole(@Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date): Promise<{ admin: UserSimplifiedViewModel[], employee: UserSimplifiedViewModel[] }> {
        return await this.userService.getUsersByRole(startDate, endDate);
    }
}