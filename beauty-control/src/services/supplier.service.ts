import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity';
import { BaseAuditedService } from 'src/base-audited.service';
import { User } from 'src/entities/user.entity';
import { UserSupplierRating } from 'src/entities/user-supplier-rating.entity';
import { UserSupplierRatingService } from './user-supplier-rating.service';
import { AuthService } from './auth.service';

@Injectable()
export class SupplierService extends BaseAuditedService<Supplier> {
    constructor(
        @InjectRepository(Supplier)
        private sRepository: Repository<Supplier>,
        private usrService: UserSupplierRatingService,
        private authService: AuthService
    ) {
        super(sRepository)
    }

    async findAll(): Promise<Supplier[]> {
        const suppliers = await this.sRepository.find({ relations: ['userSupplierRating'], });
        suppliers.forEach(supplier => {
            const us = supplier.userSupplierRating;
            supplier.avgRating = this.usrService.calcAvg(us);

            const userRating = us.find(x => x.userId == this.authService.currentUser.id);
            supplier.userRating = userRating ? userRating.rating : 0;
        });

        return suppliers;
    }

    async create(supplier: Supplier, user: User): Promise<Supplier> {
        supplier = await super.save(supplier);

        const userSupplierRating = new UserSupplierRating();
        userSupplierRating.rating = supplier.userRating;
        userSupplierRating.user = user;
        userSupplierRating.supplier = supplier;
        await this.usrService.save(userSupplierRating);

        supplier.avgRating = userSupplierRating.rating;
        return supplier;
    }

    async update(supplier: Supplier, user: User): Promise<Supplier> {
        supplier = await super.update(supplier, user);

        await this.usrService.updateBasedOnSupplierAndUser(supplier.id, user.id, supplier.userRating);
        supplier.avgRating = await this.usrService.calcAvgBasedOnSupplier(supplier.id);
        return supplier;
    }

    async getBestsSuppliers() {
        return await this.sRepository.find({ relations: ['userSupplierRating'] })
    }
}
