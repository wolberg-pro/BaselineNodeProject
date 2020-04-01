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
     * by passing slug name as array will query to any matching permissions under that roles
     * @param roles array of strings
     * @return User[]
     */
    public findByUsersByPermission(roles: string[]): Promise<any> {
        return this.createQueryBuilder()
            .select('permission')
            .where(`roles.slug IN (${roles.map(slug => `'${slug}'`).join(', ')})`)
            .leftJoinAndSelect('roles.permissions', 'permission')
            .getMany();
    }
}
