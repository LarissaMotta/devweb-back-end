import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth-strategies/jwt-strategy.guard';
import { LocalStrategyGuard } from 'src/auth-strategies/local-strategy.guard';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../services/auth.service';

@ApiTags('user-supplier-ratings')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalStrategyGuard)
    @Post('login')
    login(@Request() req): { access_token: string } {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentUser(@Request() req): User {
        const user = req.user;
        user.password = undefined;
        return user;
    }
}
