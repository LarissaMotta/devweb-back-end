import { Controller, Post, UseInterceptors, UseGuards, Body, Get, Param, Res, UploadedFile, Put, Delete, Req, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from  'path';
import { BaseAuditedController } from 'src/base-audited.controller';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/role.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

const fs = require('fs')

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImgs')
  },
  filename: function (req, file, cb) {
    const fileExtName = extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtName)
  }
})

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductController extends BaseAuditedController<Product> {

    constructor(
        private pService: ProductService,
    ) {
        super(pService);
    }
    
    @Get(":id/img")
    @UseGuards(JwtAuthGuard)
    async getImg(@Param('id') id: number, @Res() res) {
        const product = await this.pService.findOne(id);
        res.sendFile(product.img, { root: 'productImgs'})
    }

    @Delete(":id/img")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteImg(@Param('id') id: number, @Res() res) {
        const product = await this.pService.findOne(id);
        fs.unlinkSync("./productImgs/" + product.img);
        product.img = null;
        await this.pService.save(product);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    async createWithImg(@UploadedFile() img,@Body() product: Product, @Req() req): Promise<Product> {
        return await super.createBaseAudited({...product, img: img ? img.filename : null } as Product, req);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    @ApiResponse({ type: Product })
    async updateWithImg(@UploadedFile() img, @Param('id') id: number, @Body() product: Product, @Req() req): Promise<Product> {
        product.id = +product.id; // converte para inteiro
        product = {...product} as Product

        if (img) { product.img = img.filename }
        return await super.updateBaseAudited(id, product, req);
    }
    
}