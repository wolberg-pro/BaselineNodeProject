import { EntityRepository, Repository } from 'typeorm';

import { Role } from '../models/Role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role>  {

    // constructor(private manager: EntityManager) {}
    /**
     * by passing slug name as array will query to any matching user under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByUsersByRole(roles: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`role.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('roles.users', 'user')
            .getMany();
    }
    /**
     * by passing slug name as array will query to any matching user under that roles
     * @param user_id
     * @param roles array of strings
     * @return Role[]
     */
    public findByUsersByUserID(user_id: number, roles: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`role.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .andWhere(`users.id = :id`, {id: user_id})
            .leftJoinAndSelect('roles.users', 'user')
            .getMany();
    }
    /**
     * by passing slug name as array will query to any matching user under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByPermissionByRole(roles: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`role.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('roles.permissions', 'permission')
            .getMany();
    }

    /**
     * by passing slug name as array will query to any matching permissions under that roles
     * @param permissions array of strings
     * @return User[]
     */
    public findByUsersByPermission(user_id: number, permissions: string[]): Promise<any> {
        return this.createQueryBuilder()
            .where(`roles.permissions.slug IN (${permissions.map(slug => `'${slug}'`).join(', ')})`)
            .andWhere(`users.id = :id`, {id: user_id})
            .leftJoinAndSelect('roles.permissions', 'permission')
            .getMany();
    }
}
