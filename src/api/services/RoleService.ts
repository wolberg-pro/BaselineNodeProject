import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import {Role} from '../models/Role';
import {RoleRepository} from '../repositories/RoleRepository';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private roleRepository: RoleRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(show_deleted: boolean): Promise<Role[]> {
        this.log.info('Find all Roles');
        return (show_deleted) ? this.roleRepository.createQueryBuilder().withDeleted().getMany() : this.roleRepository.createQueryBuilder().getMany();
    }

    public findOne(id: number): Promise<Role | undefined> {
        this.log.info('Find one role');
        return this.roleRepository.findOne({ id });
    }

    public async create(role: Role): Promise<Role> {
        this.log.info('Create a new role => ', role.toString());
        const newRole = await this.roleRepository.save(role);
        this.eventDispatcher.dispatch(events.role.created, newRole);
        return newRole;
    }

    public update(id: number, role: UserResponse): Promise<Role> {
        this.log.info('Update a role');
        role.id = id;
        return this.roleRepository.save(role);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a role');
        this.eventDispatcher.dispatch(events.role.deleted, id);
        await this.roleRepository.delete(id);
        return;
    }

}
