import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { events } from '../subscribers/events';
import {Role} from '../models/Role';
import {RoleRepository} from '../repositories/RoleRepository';
import {RoleOrPermissionResponse} from '../controllers/responses/RoleOrPermissionResponse';
import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {EntityFoundError} from '../errors/EntityFoundError';

@Service()
export class RoleService {

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
    public findOneBySlug(slug: string): Promise<Role | undefined> {
        this.log.info('Find one role');
        return this.roleRepository.findOne({ slug });
    }

    /**
     *
     * @param roleResponse
     */
    public async create(roleResponse: RoleOrPermissionResponse): Promise<Role> {
        let role = await this.findOneBySlug(roleResponse.slug);
        if (role) {
            throw new EntityFoundError(roleResponse.slug);
        } else {
            role = new Role();
            role.slug = roleResponse.slug;
            role.name = roleResponse.name;
            role.description = roleResponse.description;
            const newRole = await this.roleRepository.save(role);
            this.log.info('Create a new role => ', newRole.toString());
            this.eventDispatcher.dispatch(events.role.created, newRole);
            return newRole;
        }
    }

    /**
     * will update existing role but only name and description slug in read onlu
     * @param id
     * @param roleResponse
     * @return Promise<Role>
     * @throws EntityNotFoundError
     */
    public async update(id: string|number, roleResponse: RoleOrPermissionResponse): Promise<Role> {
        this.log.info('Update a role');
        const role = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (role) {
            role.name = roleResponse.name;
            role.description = roleResponse.description;
        } else {
            throw new EntityNotFoundError(id);
        }
        return this.roleRepository.save(role);
    }

    /**
     * will delete existing role
     * @param id
     * @throws EntityNotFoundError
     */
    public async delete(id: string|number): Promise<void> {
        this.log.info('Delete a role');
        const role = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (role) {
            this.eventDispatcher.dispatch(events.role.deleted, id);
            await this.roleRepository.delete(id);
        } else {
            throw new EntityNotFoundError(id);
        }
        return;
    }

}
