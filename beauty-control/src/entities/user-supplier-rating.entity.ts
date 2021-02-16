import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, RelationId } from "typeorm";
import { Supplier } from "./supplier.entity";
import { User } from "./user.entity";
import { IsNumber, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Index("unique", ["user", "supplier"], { unique: true }) 
export class UserSupplierRating {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiProperty()
    rating: number;

    @ApiProperty({ type: Number })
    @ManyToOne(type => User, u => u.userSupplierRating, { onDelete: 'CASCADE' })
    user: User;

    @RelationId('user')
    userId: number;
    

    @ManyToOne(type => Supplier, s => s.userSupplierRating, { onDelete: 'CASCADE' })
    supplier: Supplier;
    
}