import { Injectable } from '@nestjs/common';
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
}