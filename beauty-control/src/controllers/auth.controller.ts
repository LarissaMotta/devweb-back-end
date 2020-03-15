import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalStrategyGuard } from 'src/auth-strategies/local-strategy.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalStrategyGuard)
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }
}
