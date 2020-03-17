import { Repository } from 'typeorm';
import { GenericService } from './generic.service';
import { User } from './entities/user.entity';
import { BaseAudited } from './models/base-audited.model';

export class BaseAuditedService<T extends BaseAudited> extends GenericService<T> {
    constructor(
        private repository: Repository<T>,
    ) { 
        super(repository)
    }

    async create(entity: T, user: User) {
        entity.createdBy = user.email;
        super.save(entity);
    }

    async update(entity: T, user: User) {
        entity.updatedBy = user.email;
        super.save(entity);
    }

    async softDelete(id: number, user: User): Promise<void> {
        const entity = await this.findOne(id);
        entity.deletedBy = user.email;
        
        this.save(entity);
        this.repository.softDelete(id);
    }
}
