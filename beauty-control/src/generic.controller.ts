import { Get, Param, Post, Put, Body, HttpException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { GenericService } from './generic.service';
import { JwtAuthGuard } from './auth-strategies/jwt-strategy.guard';
import { UserRole } from './enums/user-role.enum';
import { Roles } from './role/role.decorator';
import { RolesGuard } from './role/role.guard';

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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() entity: T): Promise<T> {
        return await this.service.save(entity);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: number, @Body() entity: T): Promise<T> {
        if (id != (entity as any).id) throw new HttpException('id param !== entity.id', HttpStatus.BAD_REQUEST);
        return await this.service.save(entity);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: number): Promise<void> {
        await this.service.delete(id);
    }
}
