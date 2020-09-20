import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSupplierRating } from 'src/entities/user-supplier-rating.entity';
import { GenericService } from 'src/generic.service';

@Injectable()
export class UserSupplierRatingService extends GenericService<UserSupplierRating> {
    constructor(
        @InjectRepository(UserSupplierRating)
        private usrRepository: Repository<UserSupplierRating>
    ) {
        super(usrRepository)
    }

    async save(userSupplierRating: UserSupplierRating): Promise<UserSupplierRating> {

        const dbUserSupplierRating = await this.usrRepository.findOne({ user: (userSupplierRating as any).user, supplier: (userSupplierRating as any).supplier });
        if (!dbUserSupplierRating) return await super.save(userSupplierRating);

        throw new HttpException('Existe uma avaliação desse usuário para este fornecedor', HttpStatus.BAD_REQUEST);
    }
}