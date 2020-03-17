import { Get, Param, Post, Put, Body, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { GenericService } from './generic.service';
import { JwtAuthGuard } from './auth-strategies/jwt-strategy.guard';

export class GenericController<T> {
    
    constructor(private service: GenericService<T>) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<T[]> {
        return await this.service.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: number): Promise<T> {
        return await this.service.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() entity: T): Promise<void> {
        await this.service.save(entity);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: number, @Body() entity: T): Promise<void> {
        if (id != (entity as any).id) throw new HttpException('id param !== entity.id', HttpStatus.BAD_REQUEST);
        await this.service.save(entity);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number): Promise<void> {
        await this.service.delete(id);
    }
}
