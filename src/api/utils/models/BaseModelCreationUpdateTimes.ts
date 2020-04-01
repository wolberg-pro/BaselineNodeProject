import {BeforeInsert, BeforeUpdate, Column} from 'typeorm';
import {date_transformer} from '../TypeormModelHelper';

export abstract class BaseModelCreationUpdateTimes {

    @Column({ name: 'created_at', type: 'timestamp', transformer: date_transformer})
    public createdAt: Date;
    @Column({name: 'updated_at', type: 'timestamp', transformer: date_transformer})
    public updatedAt: Date;

    @BeforeInsert()
    public async onCreate(): Promise<void> {
        this.updatedAt = new Date();
        this.createdAt = new Date();
    }
    @BeforeUpdate()
    public async onUpdate(): Promise<void> {
        this.updatedAt = new Date();
    }
}
