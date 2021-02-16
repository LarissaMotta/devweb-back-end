import { Inject, Injectable, Scope } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from "src/entities/user.entity";
import { REQUEST } from "@nestjs/core";
@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    private _currentUser: User;
    get currentUser(): User {
      return this._currentUser;
    }

    set currentUser(user: User) {
      this._currentUser = user;
    }

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    login(user: any): { access_token: string } {
        return { access_token: this.jwtService.sign({ id: user.id }) };
    }
}