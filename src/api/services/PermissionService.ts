import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '@src/decorators/EventDispatcher';
import { Logger, LoggerInterface } from '@src/decorators/Logger';
import { events } from '../subscribers/events';
import {Permission} from '../models/Permission';
import {RoleOrPermissionResponse} from '../controllers/responses/RoleOrPermissionResponse';
import {EntityNotFoundError} from '../errors/EntityNotFoundError';
import {EntityFoundError} from '../errors/EntityFoundError';
import {PermissionRepository} from '@api/repositories/PermissionRepository';

@Service()
export class PermissionService {

    constructor(
        @OrmRepository() private permissionRepository: PermissionRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(show_deleted: boolean): Promise<Permission[]> {
        this.log.info('Permission: Find all permissions');
        return (show_deleted) ?
            this.permissionRepository.createQueryBuilder().withDeleted().getMany() :
            this.permissionRepository.createQueryBuilder().getMany();
    }

    public findOne(id: number): Promise<Permission | undefined> {
        this.log.info('Permission: Find one permission');
        return this.permissionRepository.findOne({ id });
    }
    public findOneBySlug(slug: string): Promise<Permission | undefined> {
        this.log.info('Permission: Find one permission');
        return this.permissionRepository.findOne({ slug });
    }

    /**
     * will create role
     * @param entityResponse
     * @return Promise<Permission>
     */
    public async create(entityResponse: RoleOrPermissionResponse): Promise<Permission> {
        let entity = await this.findOneBySlug(entityResponse.slug);
        if (entity) {
            throw new EntityFoundError(entityResponse.slug);
        } else {
            entity = new Permission();
            entity.slug = entityResponse.slug;
            entity.name = entityResponse.name;
            entity.description = entityResponse.description;
            const newEntity = await this.permissionRepository.save(entity);
            this.log.info('Permission: Create a new entity => ', newEntity.toString());
            this.eventDispatcher.dispatch(events.permission.created, newEntity);
            return newEntity;
        }
    }

    /**
     * will update existing role but only name and description slug in read onlu
     * @param id
     * @param entityResponse
     * @return Promise<Permission>
     * @throws EntityNotFoundError
     */
    public async update(id: string|number, entityResponse: RoleOrPermissionResponse): Promise<Permission> {
        this.log.info('Permission: Update a role');
        const entity = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (entity) {
            entity.name = entityResponse.name;
            entity.description = entityResponse.description;
        } else {
            throw new EntityNotFoundError(id);
        }
        this.eventDispatcher.dispatch(events.permission.updated, entity);
        return this.permissionRepository.save(entity);
    }

    /**
     * will delete existing role
     * @param id
     * @throws EntityNotFoundError
     */
    public async delete(id: string|number): Promise<void> {
        this.log.info('Permission: Delete a role');
        const entity = (typeof (id) === 'string') ?  await this.findOneBySlug(id) :   await this.findOne(id);
        if (entity) {
            this.eventDispatcher.dispatch(events.permission.deleted, id);
            await this.permissionRepository.delete(id);
        } else {
            throw new EntityNotFoundError(id);
        }
        return;
    }

}
