import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, UseGuards } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from 'src/role/role.decorator';
import { RolesGuard } from 'src/role/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController extends GenericController<User> {
    
    constructor(
        private uService: UserService
    ) {
        super(uService);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async findAll(): Promise<User[]> {
        throw new HttpException('METHOD NOT ALLOWED', HttpStatus.METHOD_NOT_ALLOWED)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async findOne(@Param('id') id: number): Promise<User> {
        throw new HttpException('METHOD NOT ALLOWED', HttpStatus.METHOD_NOT_ALLOWED)
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() user: User): Promise<User> {
        const newUser = await this.uService.create(user);
        newUser.password = null;
        return newUser;
    }
}