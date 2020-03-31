import { IsNotEmpty } from 'class-validator';
import {Column, Entity, IsNull, JoinTable, ManyToMany, Not, PrimaryColumn} from 'typeorm';

import {BaseModelCreationUpdateTimes} from './BaseModelCreationUpdateTimes';
import {date_transformer} from '../Utils/TypeormModelHelper';
import {Permission} from './Permission';
import {User} from './User';

@Entity()
export class Role extends  BaseModelCreationUpdateTimes {
    public static scope = {
        default: {
            deletedAt: IsNull(),
        },
        all: {
            deletedAt: Not(IsNull()),
        },
    };
    @PrimaryColumn('id')
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'slug' })
    public slug: string;

    @Column()
    public description: string;

    @Column({ name: 'deleted_at', type: 'timestamp', transformer: date_transformer})
    public deletedAt: Date;

    @JoinTable({name: 'roles_has_permissions'})
    @ManyToMany(type => Permission, permissions => permissions.roles)
    public permissions: Permission[];

    @JoinTable({name: 'users_has_roles'})
    @ManyToMany(type => User , users => users.roles )
    public users: User[];

    public toString(): string {
        return `${this.name} - ${this.slug}`;
    }

}
