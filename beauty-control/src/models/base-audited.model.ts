import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class BaseAudited {
    
    @CreateDateColumn()
    createdIn: Date;

    @UpdateDateColumn()
    updatedIn: Date;

    @DeleteDateColumn()
    deletedIn: Date;

    @Column('int', { nullable: true })
    createdBy: number;

    @Column('int', { nullable: true })
    updatedBy: number;

    @Column('int', { nullable: true })
    deletedBy: number;

    @Column('int', { default: 0 })
    version: number

    @BeforeUpdate()
    incrementVersion() {
        this.version++;
    }
    
}