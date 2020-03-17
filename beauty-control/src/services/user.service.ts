import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(
        @InjectRepository(User)
        private uRepository: Repository<User>
    ) {
        super(uRepository)
    }

    //TODO Criptografar a senha antes de salvar
    
    async create(user: User): Promise<void> {
        user.role = Role.EMPLOYEE
        await super.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.uRepository.findOne({ email })
    }
}
