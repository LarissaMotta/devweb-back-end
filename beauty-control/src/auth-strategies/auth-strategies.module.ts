import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy.service';
import { LocalStrategyGuard } from './local-strategy.guard';

@Module({
    imports: [ServicesModule, PassportModule],
    providers: [LocalStrategy, LocalStrategyGuard],
    exports: [LocalStrategyGuard]
})
export class AuthStrategiesModule {}
