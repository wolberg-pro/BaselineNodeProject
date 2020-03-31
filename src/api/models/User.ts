import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm';
import {date_transformer} from '../Utils/TypeormModelHelper';
import {Permission} from './Permission';
import {Role} from './Role';

@Entity()
export class User {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    @PrimaryColumn('id')
    public id: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string;

    @IsNotEmpty()
    @Column()
    @Exclude()
    public password: string;

    @IsNotEmpty()
    @Column()
    public username: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @IsNotEmpty()
    @Column()
    public phone: string;

    @Column({ name: 'phone_validation_at', type: 'timestamp', transformer: date_transformer})
    public phoneValidationAt: Date;

    @JoinTable({name: 'users_has_permissions'} )
    @ManyToMany(type => Permission, permissions => permissions.users)
    public permissions: Permission[];

    @JoinTable({name: 'users_has_roles'})
    @ManyToMany(type => Role  , roles => roles.users)
    public roles: Role[];

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

}
