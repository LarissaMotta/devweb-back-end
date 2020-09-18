import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

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

    @Column('int', { default: 0 })
    version: number

    @BeforeUpdate()
    incrementVersion() {
        this.version++;
    }
    
}