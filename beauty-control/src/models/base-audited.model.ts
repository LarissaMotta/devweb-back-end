import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseAudited {
    
    @CreateDateColumn()
    createdIn: Date;

    @UpdateDateColumn()
    updatedIn: Date;

    @DeleteDateColumn()
    deletedIn: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ nullable: true })
    deletedBy: string;

    @Column({ nullable: true })
    version: number
    
}