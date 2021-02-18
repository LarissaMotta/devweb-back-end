import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: "DevWeb",
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: any) {
    const user = await this.userService.findOne(payload.id);
    
    if (!user.active) {
      throw new UnauthorizedException();
    }

    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId, { strict: false });
    authService.currentUser = user;
    return user;
  }
}