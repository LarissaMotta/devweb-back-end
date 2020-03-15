import { Repository } from 'typeorm';
import { GenericService } from './generic.service';


export class BaseAuditedService<T> extends GenericService<T> {
    constructor(
        private repository: Repository<T>,
    ) { 
        super(repository)
    }

    //TODO criar metodos create e update que salvam o email de quem criou ou atualizou o objeto
    //E que chamam o metodo save do pai dessa classe 

    async delete(id: number): Promise<void> {
        this.repository.softDelete(id);
    }
}
