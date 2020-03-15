import { Controller } from '@nestjs/common';
import { GenericController } from 'src/generic.controller';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController extends GenericController<User> {
    
    constructor(
        private uService: UserService
      ) {
        super(uService);
      }
}