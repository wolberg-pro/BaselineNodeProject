import { IsNotEmpty } from 'class-validator';
import { Column, Entity, IsNull, JoinTable, ManyToMany, Not, PrimaryColumn} from 'typeorm';
import {date_transformer} from '../Utils/TypeormModelHelper';
import {BaseModelCreationUpdateTimes} from './BaseModelCreationUpdateTimes';
import {User} from './User';
import {Role} from './Role';

@Entity({name: 'permissions'})
export class Permission extends  BaseModelCreationUpdateTimes {
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

    @JoinTable({name: 'users_has_permissions'} )
    @ManyToMany(type => User, users => users.permissions)
    public users: User[];

    @JoinTable({name: 'roles_has_permissions'})
    @ManyToMany(type => Role , roles => roles.permissions)
    public roles: Role[];
    public toString(): string {
        return `${this.name} - ${this.slug}`;
    }

}
