import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Users } from '../models/Users';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import {EntityFoundError} from '../errors/EntityFoundError';
import {UserRegisterRequest} from '../controllers/requests/UserRegisterRequest';
import {EntityNotFoundError} from '@api/errors/EntityNotFoundError';
import {RoleRepository} from '@api/repositories/RoleRepository';
import {PermissionRepository} from '@api/repositories/PermissionRepository';
import {PermissionService} from '@api/services/PermissionService';
import {RoleService} from '@api/services/RoleService';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private roleRepository: RoleRepository,
        @OrmRepository() private permissionRepository: PermissionRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface,
        @Service() private permissionService: PermissionService,
        @Service() private roleService: RoleService
    ) { }

    public find(): Promise<Users[]> {
        this.log.info('User: Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: number): Promise<Users | undefined> {
        this.log.info('User: Find one user');
        return this.userRepository.findOne({ id });
    }
    public findOneByEmail(email: string): Promise<Users | undefined> {
        this.log.info('User: Find one user');
        return this.userRepository.findOne({ email });
    }

    public async create(userResponse: UserRegisterRequest): Promise<Users> {
        let user = await this.findOneByEmail(userResponse.email);
        if (!user) {
            user = new Users();
            user.firstName = userResponse.lastName;
            user.lastName = userResponse.lastName;
            user.email = userResponse.email;
            user.username = userResponse.username;
            user.phone = userResponse.phone;
            user.password = userResponse.password;
            this.log.info('User: Create a new user => ', user.toString());

            const newUser = await this.userRepository.save(user);
            this.eventDispatcher.dispatch(events.user.created, newUser);
            return newUser;
        } else {
            throw new EntityFoundError(userResponse.email);
        }
    }

    public async update(id: number, userResponse: UserRegisterRequest): Promise<Users| null> {
        this.log.info('Update a user');
        const user = await this.findOne(id);
        if (user) {
            user.username = userResponse.username;
            user.firstName = userResponse.firstName;
            user.lastName = userResponse.lastName;
            if (userResponse.hasOwnProperty('password') && userResponse.password) {
                user.password = await Users.hashPassword(userResponse.password);
            }
        } else {
            throw new EntityNotFoundError(id);
        }
        this.eventDispatcher.dispatch(events.user.updated, user);
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('User: Delete a user');
        this.eventDispatcher.dispatch(events.user.deleted, id);
        await this.userRepository.delete(id);
        return;
    }

    public async userHasPermissionOrRoleBound(user_id: number, entities_slug: string[]): Promise<boolean> {
        this.log.info('User: user role/permission ');
        const entity = await this.findOne(user_id);
        if (entity) {
            const roles = await this.roleRepository.findByUsersByUserID(user_id , entities_slug);
            const permissions = await this.permissionRepository.findByUsersByPermission(user_id, entities_slug);
            return ((roles && roles.length === 0) || permissions && permissions.length === 0);
        } else {
            throw new EntityNotFoundError(user_id);
        }
    }

    public async bindRoleToUser(role_id: string|number, user_id: number): Promise<void> {
        const entityRole = (typeof (role_id) === 'string') ?  await this.roleService.findOneBySlug(role_id) :   await this.roleService.findOne(role_id);
        const entityUser = await this.findOne(user_id) ;
        if (entityRole && entityUser) {
            if (!entityUser.roles.find(item => item.slug === role_id)) {
                entityUser.roles.push(entityRole);
                await this.userRepository.save(entityUser);
            }
        } else {
            throw new EntityNotFoundError(role_id + ' | ' + user_id);
        }
    }

    public async unbindRoleToUser(role_id: string|number, user_id: number): Promise<void> {
        const entityRole = (typeof (role_id) === 'string') ?  await this.roleService.findOneBySlug(role_id) :   await this.roleService.findOne(role_id);
        const entityUser = await this.findOne(user_id) ;
        if (entityRole && entityUser) {
            if (typeof (role_id) === 'string') {
                if (entityUser.roles.find(item => item.slug === role_id)) {
                    entityUser.roles = entityUser.roles.filter(item => item.slug !== role_id);
                    await this.userRepository.save(entityUser);
                }
            } else {
                if (entityUser.roles.find(item => item.id === role_id)) {
                    entityUser.roles = entityUser.roles.filter(item => item.id !== role_id);
                    await this.userRepository.save(entityUser);
                }
            }
        } else {
            throw new EntityNotFoundError(role_id + ' | ' + user_id);
        }
    }

    public async bindPermissionToUser(permission_id: string|number, user_id: number): Promise<void> {
        const entity = (typeof (permission_id) === 'string') ?
            await this.permissionService.findOneBySlug(permission_id) :
            await this.permissionService.findOne(permission_id);
        const entityUser = await this.findOne(user_id) ;
        if (entity && entityUser) {
            if (typeof (permission_id) === 'string') {
                if (!entityUser.permissions.find(item => item.slug === permission_id)) {
                    entityUser.permissions.push(entity);
                    await this.userRepository.save(entityUser);
                }
            } else {
                if (!entityUser.permissions.find(item => item.id === permission_id)) {
                    entityUser.permissions.push(entity);
                    await this.userRepository.save(entityUser);
                }
            }
        } else {
            throw new EntityNotFoundError(user_id + ' | ' + permission_id);
        }
    }

    public async unbindPermissionToUser(permission_id: string|number, user_id: number): Promise<void> {
        const entity = (typeof (permission_id) === 'string') ?
            await this.permissionService.findOneBySlug(permission_id) :
            await this.permissionService.findOne(permission_id);
        const entityUser = await this.findOne(user_id) ;
        if (entity && entityUser) {
            if (typeof (permission_id) === 'string') {
                if (entityUser.permissions.find(item => item.slug === permission_id)) {
                    entityUser.permissions = entityUser.permissions.filter(item => item.slug !== permission_id);
                    await this.userRepository.save(entityUser);
                }
            } else {
                if (entityUser.permissions.find(item => item.id === permission_id)) {
                    entityUser.permissions = entityUser.permissions.filter(item => item.id !== permission_id);
                    await this.userRepository.save(entityUser);
                }

            }
        } else {
            throw new EntityNotFoundError(user_id + ' | ' + permission_id);
        }
    }

}
