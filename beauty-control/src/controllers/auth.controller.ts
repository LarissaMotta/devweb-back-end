import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalStrategyGuard } from 'src/auth-strategies/local-strategy.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalStrategyGuard)
    @Post('login')
    login(@Request() req): { access_token: string } {
        return this.authService.login(req.user);
    }
}
