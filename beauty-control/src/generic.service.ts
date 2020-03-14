import { Repository } from 'typeorm';


export class GenericService<T> {
    constructor(
        private genericRepository: Repository<T>,
    ) { }

    async findAll(): Promise<T[]> {
        return this.genericRepository.find();
    }

    async findOne(id: number): Promise<T> {
        return this.genericRepository.findOne(id);
    }

    async save(entity: T): Promise<void> {
        this.genericRepository.save(entity)
    }

    async delete(id: number): Promise<void> {
        this.genericRepository.delete(id);
    }
}
