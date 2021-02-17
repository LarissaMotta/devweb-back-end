import { Controller, Get, Param, Post, Body, UseGuards, Delete, Req, Put } from '@nestjs/common';
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
    async findAllButNotCurrentUser(@Req() req): Promise<User[]> {
        let users = await super.findAll();
        users.forEach(x => x.password = undefined);
        users = users.filter(x => x.id != req.user.id);
        return users;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await super.findOne(id);
        user.password = undefined;
        return user;
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() user: User): Promise<User> {
        const newUser = await this.uService.create(user);
        newUser.password = undefined;
        return newUser;
    }

    @Put(':id/active')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async activateDeactivate(@Param('id') id: number, @Body() data: { active: boolean }): Promise<User> {
        let user = new User();
        user.id = id;
        user.active = data.active;
        user = await super.update(id, user);
        user.password = undefined;
        return user;
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        user.password = undefined;
        user = await super.update(id, user);
        user.password = undefined;
        return user;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: number): Promise<void> {
        await super.delete(id);
    }
}