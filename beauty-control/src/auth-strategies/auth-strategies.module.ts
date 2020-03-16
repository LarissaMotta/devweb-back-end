import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy.service';
import { LocalStrategyGuard } from './local-strategy.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-strategy.guard';
import { JwtStrategy } from './jwt-strategy.service';

@Module({
    imports: [
        ServicesModule,
        PassportModule,
    ],
    providers: [
        LocalStrategy,
        LocalStrategyGuard,
        JwtStrategy,
        JwtAuthGuard
    ],
    exports: [
        LocalStrategyGuard,
        JwtAuthGuard,
    ]
})
export class AuthStrategiesModule {}
