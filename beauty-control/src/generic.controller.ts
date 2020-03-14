import { Get, Param, Post, Put, Body, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { GenericService } from './generic.service';

export class GenericController<T> {
    
    constructor(private service: GenericService<T>) {}

    @Get()
    async findAll(): Promise<T[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<T> {
        return this.service.findOne(id);
    }

    @Post()
    async create(@Body() entity: T): Promise<void> {
        this.service.save(entity)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() entity: T): Promise<void> {
        if (id != (entity as any).id) throw new HttpException('id param !== entity.id', HttpStatus.BAD_REQUEST);
        this.service.save(entity)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        this.service.delete(id);
    }
}
