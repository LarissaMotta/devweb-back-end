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

    async create(entity: T, user: User): Promise<T> {
        entity.createdBy = user.id;
        return await super.save(entity);
    }

    async update(entity: T, user: User): Promise<T> {
        const entityBD = await this.findOne((entity as any).id);
        entity.updatedBy = user.id;
        entity.version = entityBD.version;
        return await super.save(entity);
    }

    async softDelete(id: number, user: User): Promise<void> {
        const entity = await this.findOne(id);
        entity.deletedBy = user.id;
        
        await this.save(entity);
        await this.repository.softDelete(id);
    }
}
