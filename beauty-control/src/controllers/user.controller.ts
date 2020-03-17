import { Controller, Get, UseGuards, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';

@Controller('users')
export class UserController extends GenericController<User> {
    
    constructor(
        private uService: UserService
    ) {
        super(uService);
    }

    @Get()
    async findAll(): Promise<User[]> {
        throw new HttpException('METHOD NOT ALLOWED', HttpStatus.METHOD_NOT_ALLOWED)
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        throw new HttpException('METHOD NOT ALLOWED', HttpStatus.METHOD_NOT_ALLOWED)
    }

    @Post()
    async create(@Body() user: User): Promise<void> {
        this.uService.create(user);
    }
}