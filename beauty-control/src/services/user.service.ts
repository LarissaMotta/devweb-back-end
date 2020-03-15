import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(
        @InjectRepository(User)
        private uRepository: Repository<User>
    ) {
        super(uRepository)
    }

    //TODO Criptografar a senha antes de salvar

    async findByEmail(email: string): Promise<User | null> {
        return this.uRepository.findOne({ email })
    }
}
