import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/EventDispatcher';
import { Logger, LoggerInterface } from '@src/decorators/Logger';
import { events } from '../subscribers/events';
import {Role} from '../models/Role';
import {RoleRepository} from '../repositories/RoleRepository';
import {RoleOrPermissionResponse} from '../controllers/responses/RoleOrPermissionResponse';
import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {EntityFoundError} from '../errors/EntityFoundError';
import {PermissionService} from '@api/services/PermissionService';

@Service()
export class RoleService {

    constructor(
        @OrmRepository() private roleRepository: RoleRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface,
        @Service() private permissionService: PermissionService
    ) { }

    public find(show_deleted: boolean): Promise<Role[]> {
        this.log.info('Roles: Find all Roles');
        return (show_deleted) ? this.roleRepository.createQueryBuilder().withDeleted().getMany() : this.roleRepository.createQueryBuilder().getMany();
    }

    public findOne(id: number): Promise<Role | undefined> {
        this.log.info('Roles: Find one role');
        return this.roleRepository.findOne({ id });
    }
    public findOneBySlug(slug: string): Promise<Role | undefined> {
        this.log.info('Roles: Find one role');
        return this.roleRepository.findOne({ slug });
    }

    /**
     * will create role
     * @param entityResponse
     */
    public async create(entityResponse: RoleOrPermissionResponse): Promise<Role> {
        let entity = await this.findOneBySlug(entityResponse.slug);
        if (entity) {
            throw new EntityFoundError(entityResponse.slug);
        } else {
            entity = new Role();
            entity.slug = entityResponse.slug;
            entity.name = entityResponse.name;
            entity.description = entityResponse.description;
            const newEntity = await this.roleRepository.save(entity);
            this.log.info('Roles: Create a new entity => ', newEntity.toString());
            this.eventDispatcher.dispatch(events.role.created, newEntity);
            return newEntity;
        }
    }

    /**
     * will verifiyed if user has role
     * @param user_id
     * @param role_id
     */
    public async userHasRole(user_id: number , role_id: string|number): Promise<boolean> {
        this.log.info('Roles: user has role');
        const query =  this.roleRepository.createQueryBuilder();
        if (typeof (role_id) === 'string') {
            query
                .leftJoinAndSelect('roles.users', 'user')
                .where('roles.slug = :role_id' , {role_id})
                .andWhere('user.id = :user_id', { user_id});
        } else {
            query
                .leftJoinAndSelect('roles.users', 'user')
                .where('roles.id = :role_id' , {role_id})
                .andWhere('user.id = :user_id', { user_id});
        }
        const result = query.getOne();
        return !!result;
    }

    /**
     * will update existing role but only name and description slug in read onlu
     * @param id
     * @param roleResponse
     * @return Promise<Role>
     * @throws EntityNotFoundError
     */
    public async update(id: string|number, roleResponse: RoleOrPermissionResponse): Promise<Role> {
        this.log.info('Roles: Update a role');
        const entity = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (entity) {
            entity.name = roleResponse.name;
            entity.description = roleResponse.description;
        } else {
            throw new EntityNotFoundError(id);
        }
        this.eventDispatcher.dispatch(events.role.updated, entity);
        return this.roleRepository.save(entity);
    }

    /**
     * will delete existing role
     * @param id
     * @throws EntityNotFoundError
     */
    public async delete(id: string|number): Promise<void> {
        this.log.info('Roles: Delete a role');
        const entity = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (entity) {
            this.eventDispatcher.dispatch(events.role.deleted, id);
            await this.roleRepository.delete(id);
        } else {
            throw new EntityNotFoundError(id);
        }
        return;
    }

    public async roleHasPermissionOrUsersBound(id: string): Promise<boolean> {
        this.log.info('Roles: user or permission has role');
        const entity = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (entity) {
            const users = await this.roleRepository.findByUsersByRole([id]);
            const permissions = await this.roleRepository.findByPermissionByRole([id]);
            return (users.length === 0 && permissions.length === 0);
        } else {
            throw new EntityNotFoundError(id);
        }
    }

    public async bindRoleToPermission(role_id: string|number, permission_id: string|number): Promise<void> {
        const entityRole = (typeof (role_id) === 'string') ?  await this.findOneBySlug(role_id) :   await this.findOne(role_id);
        const entityPermission = (typeof (permission_id) === 'string') ?
            await this.permissionService.findOneBySlug(permission_id) :
            await this.permissionService.findOne(permission_id);
        if (entityRole && entityPermission) {
            if (!entityRole.permissions.find(perm => perm.slug === permission_id)) {
                entityRole.permissions.push(entityPermission);
                await this.roleRepository.save(entityRole);
            }
        } else {
            throw new EntityNotFoundError(role_id + ' | ' + permission_id);
        }
    }
    public async unbindRoleToPermission(role_id: string|number, permission_id: string|number): Promise<void> {
        const entityRole = (typeof (role_id) === 'string') ?  await this.findOneBySlug(role_id) :   await this.findOne(role_id);
        const entityPermission = (typeof (permission_id) === 'string') ?
            await this.permissionService.findOneBySlug(permission_id) :
            await this.permissionService.findOne(permission_id);
        if (entityRole && entityPermission) {
            if (entityRole.permissions.find(perm => perm.slug === permission_id)) {
                entityRole.permissions = entityRole.permissions.filter(perm => perm.slug !== permission_id);
                await this.roleRepository.save(entityRole);
            }
        } else {
            throw new EntityNotFoundError(role_id + ' | ' + permission_id);
        }
    }
}
