import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GenericService } from 'src/generic.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enums/user-role.enum';
import { UserSimplifiedViewModel } from 'src/views-model/user-simplified.viewmodel';

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

    async getUsersByRole(startDate?: Date, endDate?: Date): Promise<{ admin: UserSimplifiedViewModel[], employee: UserSimplifiedViewModel[] }>{
        let query = this.uRepository.createQueryBuilder('u');

        if (!isNaN(startDate.getTime())) query = query.andWhere("u.createdIn >= :startDate", { startDate })
        if (!isNaN(endDate.getTime())) query = query.andWhere("u.createdIn <= :endDate", { endDate })

        const users = await query.getMany();

        const admin = users
            .filter(x => x.role == UserRole.ADMIN)
            .map(x => ({ name: x.name, email: x.email, active: x.active }));

        const employee = users
            .filter(x => x.role == UserRole.EMPLOYEE)
            .map(x => ({ name: x.name, email: x.email, active: x.active }));

        return { admin, employee };
    }

}
