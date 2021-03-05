import { Controller, Post, UseInterceptors, UseGuards, Body, Get, Param, Res, UploadedFile, Put, Delete, Req, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
import * as admin from 'firebase-admin';

const fs = require('fs')

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImgs')
  },
  filename: function (req, file, cb) {
    if (!fs.existsSync('./productImgs')){
      fs.mkdirSync('./productImgs')
    }
    const fileExtName = extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtName)
  }
})

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(JPG|JPEG|PNG|GIF|jpg|jpeg|png|gif)$/)) {
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

    private async hasImg(product: Product): Promise<boolean> {
      if (!product.img) return false;
      const exist = await admin.storage().bucket().file(product.img).exists();
      return exist[0];      
    }
    
    @Get(":id/img")
    @UseGuards(JwtAuthGuard)
    async getImg(@Param('id') id: number, @Res() res) {
        const product = await this.pService.findOne(id);
        if (!(await this.hasImg(product))) throw new NotFoundException();

        admin.storage().bucket().file(product.img).createReadStream()
        .on("error", (err) => res.status(500).send("Internal Server Error"))
        .on("response", (storageResponse) => {
            res.setHeader(
                "content-type",
                storageResponse.headers["content-type"]
            );
            res.setHeader(
                "content-length",
                storageResponse.headers["content-length"]
            );
            res.status(storageResponse.statusCode);
        })
        .on("end", () => res.end())
        .pipe(res);
    }

    @Delete(":id/img") 
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteImg(@Param('id') id: number, @Res() res) {
        const product = await this.pService.findOne(id);
        if (!(await this.hasImg(product))) throw new NotFoundException();

        await admin.storage().bucket().file(product.img).delete();
        product.img = null;
        return await this.pService.save(product);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    async createWithImg(@UploadedFile() img: Express.Multer.File,@Body() product: Product, @Req() req): Promise<Product> {
        let productBd = await super.createBaseAudited({...product, img: null } as Product, req);
        const resp = await admin.storage().bucket().upload(img.path, { destination: 'products/' + productBd.id + '.jpg' });
        productBd.img = 'products/' + productBd.id + '.jpg';
        productBd = await super.updateBaseAudited(productBd.id, productBd, req);
        return productBd;
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    @ApiResponse({ type: Product })
    async updateWithImg(@UploadedFile() img: Express.Multer.File, @Param('id') id: number, @Body() product: Product, @Req() req): Promise<Product> {
        product.id = +product.id; // converte para inteiro
        product = {...product} as Product

        if (img) { product.img = 'products/' + product.id + '.jpg' }
        product = await super.updateBaseAudited(id, product, req);
        await admin.storage().bucket().upload(img.path, { destination: product.img} );
        return product;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async deleteAndImg(@Param('id') id: number, @Req() req): Promise<void> {
      const product = await this.pService.findOne(id);
      if ((await this.hasImg(product))) {
        await admin.storage().bucket().file(product.img).delete();
      }

      await super.delete(id);      
    }
    
}