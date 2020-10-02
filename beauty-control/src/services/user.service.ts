import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(
        @InjectRepository(User)
        private uRepository: Repository<User>
    ) {
        super(uRepository)
    }

    async create(user: User): Promise<User> {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        return await super.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.uRepository.findOne({ email })
    }
    
}
