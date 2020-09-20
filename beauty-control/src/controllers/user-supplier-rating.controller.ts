import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSupplierRating } from 'src/entities/user-supplier-rating.entity';
import { UserSupplierRatingService } from 'src/services/user-supplier-rating.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';

@ApiTags('user-supplier-ratings')
@ApiBearerAuth()
@Controller('user-supplier-ratings')
export class UserSupplierRantigController extends GenericController<UserSupplierRating> {
    
    constructor(
        private uprService: UserSupplierRatingService
    ) {
        super(uprService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() entity: UserSupplierRating): Promise<UserSupplierRating> {
        return await super.create(entity);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: number, @Body() userSupplierRating: UserSupplierRating): Promise<UserSupplierRating> {
        return await super.update(id, userSupplierRating);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number): Promise<void> {
        await super.delete(id);
    }
}