import { Repository } from 'typeorm';


export class GenericService<T> {
    constructor(
        private genericRepository: Repository<T>,
    ) { }

    async findAll(): Promise<T[]> {
        return await this.genericRepository.find();
    }

    async findOne(id: number): Promise<T> {
        return await this.genericRepository.findOne(id);
    }

    async save(entity: T): Promise<T> {
        return await this.genericRepository.save(entity)
    }

    async delete(id: number): Promise<void> {
        await this.genericRepository.delete(id);
    }
    
}
