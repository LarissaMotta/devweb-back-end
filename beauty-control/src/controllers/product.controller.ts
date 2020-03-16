import { Controller, Post, UseInterceptors, UseGuards, Body, Get, Param, Res, UploadedFile, Put } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { extname } from  'path';
import { isUndefined, isNullOrUndefined } from 'util';

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImgs')
  },
  filename: function (req, file, cb) {
    const fileExtName = extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtName)
  }
})

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('products')
export class ProductController extends GenericController<Product> {

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

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    async createWithImg(@UploadedFile() img, @Body() product: Product) {
        await this.pService.save({...product, img: img ? img.filename : null });
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('img', { storage, fileFilter: imageFileFilter }))
    async updateWithImg(@UploadedFile() img, @Param('id') id: number, @Body() product: Product) {
        product.id = +product.id;
        await super.update(id, {...product, img: img ? img.filename : null });
    }

}